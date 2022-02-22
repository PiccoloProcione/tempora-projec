/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
export class LoadedObjects {
    constructor(successful, total) {
        this.successful = successful;
        this.total = total;
    }
}
LoadedObjects.empty = () => {
    return new LoadedObjects(0, 0);
};
export function importAuditLogDashboard(kibanaVersion, importUri, filePath, fileName) {
    return fetch(filePath, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
        .then((response) => response.text())
        .then((data) => importFile(data, kibanaVersion, importUri, fileName))
        .catch((error) => handleError(error));
}
function importFile(data, kibanaVersion, importPath, fileName) {
    return fetch(importPath + '?overwrite=true', {
        method: 'POST',
        headers: { 'kbn-version': kibanaVersion },
        body: prepareFileForUpload(data, fileName)
    })
        .then((response) => response.json())
        .then((json) => onSuccessfulImport(json))
        .catch((error) => handleError(error));
}
function prepareFileForUpload(data, fileName) {
    const file = createDashboardFileObject(data, fileName);
    const formData = new FormData();
    formData.append("file", file);
    return formData;
}
function createDashboardFileObject(data, filename) {
    return new File([data], filename);
}
function onSuccessfulImport(json) {
    const successCount = json.successCount;
    const errorCount = (json.errors || []).length;
    return new LoadedObjects(successCount, errorCount + successCount);
}
function handleError(error) {
    console.error(error);
    return LoadedObjects.empty();
}

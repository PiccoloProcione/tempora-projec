"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.generateRandomToken=generateRandomToken;exports.generateRandomCookiePassword=generateRandomCookiePassword;exports.COOKIE_PASSWORD_LENGTH=exports.TOKEN_LENGTH=void 0;var TOKEN_LENGTH=30;exports.TOKEN_LENGTH=TOKEN_LENGTH;var COOKIE_PASSWORD_LENGTH=32;exports.COOKIE_PASSWORD_LENGTH=COOKIE_PASSWORD_LENGTH;var generateRandomString=function e(){return Math.random().toString(36).substr(2)};function generateRandomToken(){return(generateRandomString()+generateRandomString()+generateRandomString()+generateRandomString()).substr(0,TOKEN_LENGTH)}function generateRandomCookiePassword(){return(generateRandomString()+generateRandomString()+generateRandomString()+generateRandomString()).substr(0,COOKIE_PASSWORD_LENGTH)}
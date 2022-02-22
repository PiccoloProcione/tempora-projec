'use strict'

const escapeStringRegexp = require('escape-string-regexp')

module.exports = (str, prefix, newPrefix) => {
  const escapedPrefix = escapeStringRegexp(prefix)
  const re = new RegExp(`^${escapedPrefix}`)
  return str.replace(re, newPrefix)
}

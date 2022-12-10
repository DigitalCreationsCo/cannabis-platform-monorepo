const chmod = require('chmod');
const glob = require('fast-glob')

const scripts = [...glob.sync("./**/*.sh")]
scripts.forEach(s => chmod(s, {read: true, execute: true}))
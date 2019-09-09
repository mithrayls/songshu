const promptPassword = require('./promptPassword.js')

async function checkAuthenticated() {
    let encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    if (encryption_key) {
        process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
        return true
    } else {
        return false
    }
}

module.exports = checkAuthenticated
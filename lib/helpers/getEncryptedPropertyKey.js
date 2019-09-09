const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')
const checkAuthenticated = require('./checkAuthenticated.js')

async function getEncryptedPropertyKey(plaintext_property_key) {
    if (!(await checkAuthenticated())) {
        return
    }
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    for (let prop in all) {
        decrypted_property_key = await decrypt(prop, encryption_key)
        if (decrypted_property_key === plaintext_property_key) {
            encrypted_property_key = prop
            break
        }
    }
    if (encrypted_property_key) {
        return encrypted_property_key
    } else {
        return false
    }
    // return encrypted_property_key || false
}

module.exports = getEncryptedPropertyKey
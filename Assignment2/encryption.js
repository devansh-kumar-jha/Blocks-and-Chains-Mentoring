const readline = require('readline');
const crypto = require('crypto');
const constants = require('constants');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a text to be encrypted: ', str => {
    let encrypted = encrypt(str);
    console.log(encrypted);
    rl.close();
});

function encrypt(str) {
    var privKey = fs.readFileSync("private.pem");
    /*var encmsg = crypto.privateEncrypt({key : privKey, padding: constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(str, 'utf-8'));
    return encmsg.toString('hex');*/
    const data = new Uint8Array(Buffer.from(str, 'hex'));
    console.log(Buffer.from(data, 'hex'));
    const sign = crypto.createSign('SHA256');
    sign.update(Buffer.from(data, 'hex'));
    signature = sign.sign({key:privKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength:32}).toString('hex');
    return signature
}
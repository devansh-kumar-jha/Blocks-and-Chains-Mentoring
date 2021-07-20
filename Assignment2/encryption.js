// Readline is just another way to get input in place of prompt-sync and is better in general than prompt-sync
const readline = require('readline');
const crypto = require('crypto');

// This constants is not required here, maybe used by mistake
const constants = require('constants');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// The way encryption is done is very similar to the mining.js in the Assignment 1
rl.question('Enter a text to be encrypted: ', str => {
    let encrypted = encrypt(str);
    console.log(encrypted);

    // If you don't close the question the code would not stop to execute.
    // Exact logic is a bit more involved but think like this is a break statement to infinite loop.
    rl.close();
});

function encrypt(str) {
    // Got the private key from .pem file
    var privKey = fs.readFileSync("private.pem");

    /*var encmsg = crypto.privateEncrypt({key : privKey, padding: constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(str, 'utf-8'));
    return encmsg.toString('hex');*/

    // Here we are doing the main functioning that is we create a array of 8 bits unsigned integer from the given string.
    const data = new Uint8Array(Buffer.from(str, 'hex'));
    // We just check it by printing it.
    console.log(Buffer.from(data, 'hex'));

    // Then we use the SHA256 function to create the signature of the data from the buffer.
    // We create first a 'SHA256' signature on a default string and the update the string with the buffer of our data.
    // Then sign API of crypto library is used and a digital signature for the buffer is created using private key
    // and PSS padding. Also the sign API takes the salt-length for the signature but it could use constants as well.
    // The special value **crypto.constants.RSA_PSS_SALTLEN_DIGEST** sets the salt length to the digest size, **crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN** (default) sets it to the maximum permissible value.
    const sign = crypto.createSign('SHA256');
    
    // console.log(sign.toString('hex'));
    
    sign.update(Buffer.from(data, 'hex'));
    signature = sign.sign({key:privKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength:32}).toString('hex');
    return signature
}
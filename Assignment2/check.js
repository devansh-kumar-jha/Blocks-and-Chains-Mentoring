// Readline is just another way to get input in place of prompt-sync and is better in general than prompt-sync
const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

// Mentor is using this readline method regularly.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var pubKey = '';
var encrypted = '';
var unencrypted = '';

// Input method used by mentor almost every where. Try to learn it.
rl.question('Enter the path of the file: ', str => {
    // Read the file provided by the user. As no encoding provided **utf8** by default.
    pubKey = fs.readFileSync(str);
    rl.question('Enter the encrypted text: ', str => {
        // Input for the encrypted text. However I have taken that using the .txt files which is a
        // bit better implementation for the user's ease however this adhere's exactly to the
        // instructions given for the assignment.
        encrypted = str;
        rl.question('Enter the unencrypted text: ', str => {
            // Again un-encrypted text input.
            unencrypted = str;

            // The verify class object available in the crypto library is used here which is something better than the
            // rude implementation of the verification I did exploiting the fact that code panics for a wrong key pair.
            // That **try-catch** block was just a self-made implementation.

            // Here a verification object is made for SHA256 algorithm with the default string and loaded with the
            // un-encrypted string. Than the verify API is used which checks the decryption for encrypted text.
            // The verify API functions on a object of verify class where the object is loaded with the un-encrypted text
            // and then the API decrypts a gien text using public key with PSS padding and gives **boolean** output.
            const verify = crypto.createVerify('SHA256')
            verify.update(Buffer.from(unencrypted, 'hex'));
            verifyRes = verify.verify({key:pubKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength:32}, Buffer.from(encrypted, 'hex'))
            if (verifyRes === true) console.log("Signature Verified!");
            else console.log("Verification Failed");
            rl.close();
        });
    });
});


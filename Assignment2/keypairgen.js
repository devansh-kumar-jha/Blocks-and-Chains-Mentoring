// generateKeyPair made from crypto library.
// Take a note on this .... we could have used crypto.generateKeyPair as well but we knew that we require 
// generateKeyPair API so we imported directly that from our syntax.
const { generateKeyPair } = require('crypto');

// File systems and crypto library used as usual for making private.pem and public.pem files 
const crypto = require('crypto');
const fs = require('fs');

// This is a complete object created out of generateKeyPair from crypto library.
// generateKeyPair(type, options, callback) this is the functioning of generateKeyPair of crypto library
generateKeyPair('rsa', { 
  modulusLength : 2048, 
  publicKeyEncoding: { 
    type: 'spki', 
    format: 'pem'
  }, 
  privateKeyEncoding: { 
    type: 'pkcs8', 
    format: 'pem',
  } 
}, 
// The callBack function starts from here.
// It tells about the functioning to be done and also as this is a asynchronous function we are handling errors here.
 (err, publicKey, privateKey) => { 
       if(!err) 
       { 
         // Prints new asymmetric key 
         // pair after encodings 
         console.log("Public Key is: ", 
                  publicKey.toString('hex')); 
         console.log(); 
         console.log("Private Key is: ", 
                 privateKey.toString('hex')); 

        fs.writeFileSync("public.pem", publicKey);
        fs.writeFileSync("private.pem", privateKey);
       } 
       else
       { 
         // Prints error 
         console.log("Errr is: ", err); 
       } 
         
  }); 
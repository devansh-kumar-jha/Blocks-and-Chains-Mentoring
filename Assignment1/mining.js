// Required Libraries for our Code
const crypto = require ('crypto');
const readline = require('readline');  // This is a way of input used, rather than prompt-sync !!!

// prompt-sync library is not so supported and it requires the making of a node-modules folder using "npm install"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This creates the target value for our code, clever idea rather than writing 0000fffffffff...
let comparedStr = '0000';
for (let i = 0; i < 60; i++) {
    comparedStr += 'f';
}

// console.log(comparedStr);

// see the question API of the readline library, it takes a input (here str) and then processes it.
rl.question('Enter a string: ', str => {
    const magicNumber = mine(str);
    console.log(magicNumber);
    rl.close();
});

// This is the format to declare a function, might be useful later.
// Return type is not specified with the function rather it is just implicit. Parameters are given.
function mine(str) {
    let i = 0;
    let str_new;

    do {
        i++;
        str_new = str + i;  // In NODE JS we can add any substring directly to a string. Not possible in C.
        // if(i%1000==0) console.log(str_new);
        // createHash just creates a HASH object with the given algorithm.
        // createHash returns a wierd object for the hash created, to visualise it digest('hex') is used.
        // by default createHash takes a string whose hash value is e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
        // You can give your string in update() block accordingly.

        // console.log(crypto.createHash('sha256').digest('hex'));
        
        hashed = crypto.createHash('sha256').update(str_new).digest('hex');
    } while (hashed >= comparedStr);

    console.log(hashed)

    return i;
}

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const now = require('nano-time');
const Transaction = require("../classes/Transaction");
const Output = require("../classes/Output");
const Input = require("../classes/Input");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function main()
{
    let input = new Input;
    let output = new Output;
    let txn = new Transaction;

    let ins = 0, outs = 0;
    let i = 0, j = 0;
    console.log("Enter the number of Inputs")
    rl.prompt();
    rl.on('line', (line) => {
        if(ins === 0)
        {
            ins = parseInt(line);
            txn.numInputs = ins;
            console.log(txn.numInputs);
            if(ins > 0)
            {
                console.log(`Enter details for input 1`);
                console.log(`Enter TransactionID (32bytes hex)`);
            }
            else
            {
                rl.close();
                return;
            }
        }

        else if(i < 3*ins)
        {
            if(i%3 === 0)
            {
                if(line.length != 64)
                {
                    console.log("ID not of 32 bytes (64hex characters), appending 0 to end")
                    line = line.concat('0'.repeat(64-line.length));
                }
                input.txnID = line;
                console.log(`Enter Index`);
            }

            else if(i%3 === 1)
            {
                if(parseInt(line) < 0)
                    console.log("Taking abs value of negative int");
                input.index = Math.abs(parseInt(line));
                console.log(`Enter Signature`);
                console.log(`As the sign is hex, please enter an even number of characters, otherwise there might be unwanted errors in the hash calculation`);
            }

            else
            {
                if(line.length % 2 !== 0)
                {
                    line.concat('0');
                }
                input.sigLength = line.length/2;
                input.sig = line;
                txn.pushInputs(input);
                input = new Input;
                if(i === 3*ins - 1)
                    console.log("Enter number of outputs: ");
                else
                {
                    console.log(`Enter details for input ${(i+1)/3 + 1}`);
                    console.log(`Enter TransactionID (32bytes hex)`);
                }
            }
            i++;
        }

        else if(outs === 0)
        {
            outs = parseInt(line);
            txn.numOutputs = outs;
            if(outs > 0)
            {
                console.log(`Enter details for output 1`);
                console.log(`Enter number of coins`);
            }
            else
            {
                rl.close();
                return;
            }
        }

        else
        {
            if(j%2 === 0)
            {
                let val = BigInt(line)
                if(val < 0n)
                    console.log("Value < 0, setting value to 0")
                output.coins = val > 0n ? val : 0n;
                console.log("Enter path to public Key");
            }

            else
            {
                let str;
                try {
                    str = fs.readFileSync(line, 'utf-8');
                } catch (err) {
                   console.log("File not found, reading default public key");
                   str = fs.readFileSync("pubKeySample.pem", 'utf-8');
                } 
                output.pubKeyLen = str.length;
                output.pubKey = str;
                txn.pushOutputs(output);
                output = new Output;
                if(j === 2*outs - 1)
                {
                    console.log("Writing Txn details to file");
                    rl.close();
                    writeToFile(txn);
                    return;
                }

                else
                {
                    console.log(`Enter details for output ${(j+1)/2 + 1}`);
                    console.log(`Enter number of coins`);
                }

            
            }
            j++;
        }
        rl.prompt();
    })
    
}


main();

function writeToFile(txn)
{
    let inputs = txn.getInputs();
    let outputs = txn.getOutputs();
    console.log(inputs);
    console.log(outputs);

    let time = now();
    time = BigInt(time);
    pushTimeStamp(time);
    console.log(time);
    pushInt(txn.numInputs);
    
    for(let input of inputs)
    {
        pushHash(input.txnID);
        pushInt(input.index);
        pushInt(input.sigLength)
        pushHash(input.sig);
    }

    pushInt(txn.numOutputs);

    for(let output of outputs)
    {
        pushInt(output.coins, 8);
        pushInt(output.pubKeyLen);
        pushText(output.pubKey);
    }

    calcHash();
    return;
}

function pushTimeStamp(time) {
    let buf = Buffer.allocUnsafe(8);
    buf.writeBigInt64BE(time, 0);

    fs.appendFileSync("temp.dat", buf);
}

function pushInt(num, size = 4)
{
    let arr = new Uint8Array(size);
    if(size === 4)
        for(let i = 0; i < size; ++i)
        {
            arr[size-i-1] = num%256;
            num = num >> 8;
        }
    else
        for(let i = 0; i < size; ++i)
        {
            arr[size-i-1] = parseInt(num%256n);
            num = num/256n;
        }
    fs.appendFileSync("temp.dat", arr);
    return;
}

function pushHash(str)
{
    let arr = new Uint8Array(Buffer.from(str, 'hex'));
    fs.appendFileSync("temp.dat", arr);
    return;
}

function pushText(txt)
{
    let arr = new Uint8Array(Buffer.from(txt, 'utf-8'));
    fs.appendFileSync("temp.dat", arr);
    return;
}

function calcHash()
{
    let buf = fs.readFileSync("temp.dat");
    let hash = crypto.createHash('sha256').update(buf).digest('hex');
    hash = hash.toString();
    let name = hash.concat(".dat");
    fs.renameSync("temp.dat", name);
    console.log("Contents written to");
    console.log(name);
    return;
}


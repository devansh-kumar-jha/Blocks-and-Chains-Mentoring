Run the program using  

```bash
node readTxn.js
>>> Enter the relative path to the binary file to be read:
../Assignment3/sample.dat
```

The outputs are displayed in the console in the following format:  

```bash
Timestamp: <an integer>
Transaction ID: <in hex format>  
Number of inputs: <an integer>  
    Input 1:  
        Transaction ID: <in hex format>  
        Index: <an integer>  
        Length of the signature: <an integer>  
        Signature: <in hex format>  
    Input 2:  
        Transaction ID: <in hex format>  
        Index: <an integer>  
        Length of the signature: <an integer>  
        Signature: <in hex format>  
    ...  
Number of outputs: <an integer>  
    Output 1:  
        Number of coins: <an integer>  
        Length of public key: <an integer>  
        Public key: <in PEM format>  
    Output 2:  
        Number of coins: <an integer>  
        Length of public key: <an integer>  
        Public key: <in PEM format>  
    ...  
```

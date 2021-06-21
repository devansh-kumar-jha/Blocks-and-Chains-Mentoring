To run the script

```bash
node createTxn.js
```

The script uses 3 classes (Transaction, Input, Output) which have been exported from the classes folder in the previous directory. The classes are ES6 classes.

This script takes in the details (Inputs and Outputs) of a blockchain transaction from a user (without much verification) and creates a transaction object out of it. The created object is then stored in a binary format in a *hash*.dat file where *hash* is the SHA-256 hash calculated using the contents of the object.


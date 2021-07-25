// This is a extremely useful programming style of creating reusable code in the repository.
// The mentor has made a seperate file and is exporting the code.
// **module.export** new command to learn -> used to export the things in this file.
// Refer to **sidebar.js** in RustDuino Library.

// The **Class Input** contains the required fields as given in assignment problem statement.
// The ```underscore``` before the names of field are signifying that the fields may remain un-used throughout the code.

class Input{
    _txnID;
    _index;
    _sigLength;
    _sig;

    set txnID(txnID)
    {
        this._txnID = txnID;
    }

    get txnID ()
    {
        return this._txnID;
    }

    set index(index)
    {
        this._index = index;
    }

    get index ()
    {
        return this._index;
    }

    set sigLength(sigLength)
    {
        this._sigLength = sigLength
    }

    get sigLength()
    {
        return this._sigLength;
    }

    set sig(sig)
    {
        this._sig = sig;
    }

    get sig()
    {
        return this._sig;
    }
}

module.exports = Input;
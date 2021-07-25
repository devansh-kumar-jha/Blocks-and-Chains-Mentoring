// The **Class Output** contains the required fields as given in assignment problem statement.
// The ```underscore``` before the names of field are signifying that the fields may remain un-used throughout the code.

class Output{
    _coins;
    _pubKeyLen;
    _pubKey;

    set coins(coins)
    {
        this._coins = coins;
    }

    get coins ()
    {
        return this._coins;
    }


    set pubKeyLen(pubKeyLen)
    {
        this._pubKeyLen = pubKeyLen;
    }
    
    get pubKeyLen()
    {
        return this._pubKeyLen;
    }

    set pubKey(pubKey)
    {
        this._pubKey = pubKey;
    }

    get pubKey()
    {
        return this._pubKey;
    }

}

module.exports = Output;
// The **Class Transaction** contains the required fields as given in assignment problem statement.
// The ```underscore``` before the names of field are signifying that the fields may remain un-used throughout the code.

class Transaction {
    _timestamp;
    _numInputs;
    _inputs = [];
    _numOutputs;
    _outputs = [];

    set timestamp(timestamp) {
        this._timestamp = timestamp;
    }

    set numInputs(numInputs) {
        this._numInputs = numInputs;
    }

    get numInputs() {
        return this._numInputs;
    }

    get timestamp() {
        return this._timestamp;
    }

    pushInputs(input) {
        this._inputs.push(input);
    }

    getInputs() {
        return this._inputs;
    }

    set numOutputs(numOutputs) {
        this._numOutputs = numOutputs;
    }

    get numOutputs() {
        return this._numOutputs;
    }

    pushOutputs(output) {
        this._outputs.push(output);
    }

    getOutputs() {
        return this._outputs;
    }

}

module.exports = Transaction;
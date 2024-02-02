include "./node_modules/circomlib/circuits/poseidon.circom";

template HashString(n) {
    signal input str[n];
    signal output hash;

    component hasher = Poseidon(n);
    for (var i = 0; i < n; i++) {
        hasher.inputs[i] <== str[i];
    }

    hash <== hasher.out;
}

component main = HashString(1);

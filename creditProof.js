const circomlibjs = require("circomlibjs");
const snarkjs = require("snarkjs");
const fs = require("fs");

async function poseidonHash(inputs) {
  const poseidon = await circomlibjs.buildPoseidon();
  const poseidonHash = poseidon.F.toString(poseidon(inputs));
  return poseidonHash;
}

// Create credit proof
async function createCreditProof(
  address,
  creditScore,
  minCreditScore,
  maxCreditScore
) {
  const hash = await poseidonHash([address, creditScore]);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      creditScore: creditScore,
      minCreditScore: minCreditScore,
      maxCreditScore: maxCreditScore,
      address: address,
      hash: hash,
    },
    "./circuit_js/circuit.wasm",
    "circuit_final.zkey"
  );
  return { proof, publicSignals };
}

// async function verifyAgeProof(proof, publicSignals) {
//   const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
//   return await snarkjs.groth16.verify(vKey, publicSignals, proof);
// }

async function main() {
  try {
    const { proof, publicSignals } = await createCreditProof(
      "0x210706cbd9D26c26c727f4d3007D819390934375",
      700,
      600,
      20000
    );
    console.log({ proof, publicSignals });
    fs.writeFileSync("proof.json", JSON.stringify(proof));
    fs.writeFileSync("public.json", JSON.stringify(publicSignals));
    // const verification = await verifyAgeProof(proof, publicSignals);
    // console.log({ verification });
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

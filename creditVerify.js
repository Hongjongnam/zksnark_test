const circomlibjs = require("circomlibjs");
const snarkjs = require("snarkjs");
const fs = require("fs");

async function verifyAgeProof(proof, publicSignals) {
  const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
  return await snarkjs.groth16.verify(vKey, publicSignals, proof);
}

async function main() {
  try {
    const { proof, publicSignals } = await createCreditProof(
      "0x210706cbd9D26c26c727f4d3007D819390934375",
      700,
      600,
      20000
    );
    console.log({ proof, publicSignals });

    const verification = await verifyAgeProof(proof, publicSignals);
    console.log({ verification });
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

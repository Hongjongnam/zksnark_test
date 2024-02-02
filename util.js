const fs = require("fs");

function stringToAsciiArray(str, length) {
  const arr = Array.from({ length }, () => 0);
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
}

const str = "가"; // Your string here
const asciiArray = stringToAsciiArray(str, 1); // '10' should match the length in the circuit

const input = {
  str: asciiArray,
};

fs.writeFileSync("input.json", JSON.stringify(input));

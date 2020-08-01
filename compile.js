const path = require("path");
const fs = require("fs");
const solc = require("solc");

// This uses solidity version ^0.6.9
// There are many breaking changes b/w solidity 0.4.x and 0.6.9
// One of them being the compile() method; it now takes in a JSON string

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const sourceCode = fs.readFileSync(inboxPath, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: sourceCode
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

console.log("Compiler version:", solc.version());

const output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts["Inbox.sol"]["Inbox"];

const assert = require("assert");
const ganache = require("ganache-cli"); // ganache is the local eth test net
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

// Breaking change:
// in earlier versions of solc/solidity,
// output.contracts["Inbox.sol"]["Inbox"] would return { interface, bytecode }
// but now it returns "abi" for interface and "evm.bytecode" for bytecode
const compiled = require("../compile");
const interface = compiled.abi;
const bytecode = compiled.evm.bytecode.object;

let accounts;
let inbox;
const INITIAL_MSG = "Hey there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MSG]
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
    console.log("Contract address: ", inbox.options.address);
  });

  it("has a default message", async () => {
    const msg = await inbox.methods.message().call();
    assert.equal(INITIAL_MSG, msg);
  });

  it("can update the message", async () => {
    await inbox.methods.setMessage("Bye!").send({ from: accounts[0] });
    const msg = await inbox.methods.message().call();
    assert.equal(msg, "Bye!");
  });
});

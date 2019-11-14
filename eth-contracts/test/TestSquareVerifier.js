// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
let verifier = artifacts.require('verifier');
let correctproof = require('../../zokrates/code/square/proof');

contract('TestSquareVerifier', accounts => {

    const account_one = accounts[0];
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

describe('Test verification with correct proof', function(){
    beforeEach(async function() {
        this.contract = await verifier.new({from: account_one});
    })

it('Verification with correct proof', async function(){
    let verified = await this.contract.verifyTx.call(correctproof.proof.a, correctproof.proof.b,correctproof.proof.c,correctproof.input, {from:account_one});
    assert.equal(verified, true, "Verification is valid");
})

// Test verification with incorrect proof
it('Verifivation with incorrect proof',async function(){
    correctproof.input = [10, 1];
    let verified = await this.contract.verifyTx.call(correctproof.proof.a, correctproof.proof.b,correctproof.proof.c,correctproof.input, {from:account_one});
    assert.equal(verified, false, "Verification is valid");
})

})
});
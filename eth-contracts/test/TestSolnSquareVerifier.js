// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier


let SquareVerifier = artifacts.require('Verifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let valid_proof = require('./proof.json');
let proof = valid_proof.proof;
let inputs = valid_proof.inputs;


contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('Check approvals', function() {
        beforeEach(async function() {
            const square_verifier = await SquareVerifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(square_verifier.address, {from: account_one});         
        });
    
    
        it('ERC721 token can be minted for contract', async function(){
            await this.contract.mintToken(account_two, 0, proof.a, proof.b, proof.c, inputs, {from:account_one});

        });
    
    
        it('should fail to mint a token with the same solution', async function () {
            let exception_catched = false;
            let exception_message = "";
      
            await this.contract.mintToken(account_two, 0, proof.a,proof.b, proof.c, inputs, {from: account_one});
      
            try {
              await this.contract.mintToken(account_three, 1, proof.a,proof.b, proof.c, inputs, {from: account_one});
            } catch (e) {
              exception_catched = true;
              exception_message = e.message;
            }
            assert.equal(exception_catched, true, "Exception should be thrown");
            assert.equal(exception_message, "Solution already used");
          });
      
    
      
        });
    
    
    
    
    
    });



















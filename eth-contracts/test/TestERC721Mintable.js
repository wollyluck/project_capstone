var ERC721MintableComplete = artifacts.require('MyMyERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const symbol = "MyMy";
    const name = "MyMyERC721";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two,1,{from: account_one});
            await this.contract.mint(account_three,2,{from: account_one});
            await this.contract.mint(account_four,3,{from: account_one});
            await this.contract.mint(account_five,4,{from: account_one});

        })

        it('should return total supply', async function () { 
            let amount = await this.contract.totalSupply();
            assert.equal(parseInt(amount), 4,"Incorrect token amount for total supply");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(parseInt(balance), 1, "Incorrect balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.baseTokenURI();
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Incorrect uri");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 1;
            await this.contract.approve(account_three, tokenId, {from: account_two});
            await this.contract.transferFrom(account_two, account_three, tokenId, {from:account_two});
            currentOwner = await this.contract.ownerOf.call(tokenId);
            assert.equal(currentOwner, account_three, "Owner should be account_three")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let failed = false;
            try{
                await this.contract.mint(account_six, 5, {from: account_two});
            } catch (e) {
                failed = true;

            }

            assert.equal(failed, true, "Should fail when address is not account owner");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call({from: account_one});
            assert.equal(owner, account_one, "Owner should be account_one")
        })

    });
})
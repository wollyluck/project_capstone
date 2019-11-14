pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/utils/Address.sol';
import './ERC721Mintable.sol';
import './Verifier.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is MyMyERC721Token {
    
    
    
// TODO define a solutions struct that can hold an index & an address

    struct Solution {
        uint tokenId;
        address to;
    }






// TODO define an array of the above struct
Solution[] Solutions; 

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) private UniqueSolutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 tokenId, address to);


// TODO Create a function to add the solutions to the array and emit the event
function _addSolution(address _to, uint256 _tokenId, bytes32 key) internal {
    Solution storage solution = UniqueSolutions[key];    

    solution.to = msg.sender;
    solution.tokenId = _tokenId;
    emit SolutionAdded(_tokenId, _to);

}





// TODO Create a function to mint new NFT only after the solution has been verified
SquareVerifier public verifierContract;

constructor(address _verifierAddress) public{
    verifierContract = SquareVerifier(_verifierAddress);
}

function mintToken
    (
    address to, 
    uint256 tokenId, 
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
    ) 
    public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(UniqueSolutions[key].to == address(0), "Used solution. Not unique");
        require(verifierContract.verifyTx(a, b, c, input), "Solution not valid");

        _addSolution(to, tokenId, key);
        
        super.mint(to, tokenId);
    
    }

}

//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  



























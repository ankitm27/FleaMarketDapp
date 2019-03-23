pragma solidity ^0.5.2;

// Importing OpenZeppelin's SafeMath Implementation
/*

Declare that you wish to attach the library functions to the uint256 type:

using SafeMath for uint256;

Replace each of the standard arithmetic operators in your code with the equivalent call to a SafeMath function:

a + b becomes a.add(b)
a - b becomes a.sub(b)
a * b becomes a.mul(b)
a / b becomes a.div(b)
*/

//based on https://remix.readthedocs.io/en/latest/tutorial_import.html
//but for !!!truffle it has to be different way to use the import
//import 'https://github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

// based on https://medium.com/coinmonks/creating-smart-contracts-with-smart-contract-d54e21d26e00
contract FleaMarket {
	
	SafeRemotePurchase[] public  contracts;

	uint public nextId = 1;  

    event newPurchaseContract(
        address contractAddress
    );

	constructor() public
	{}

	function getAllContracts() public view returns(SafeRemotePurchase[] memory)
	{
		return contracts;
	}
	
	function getContractById(uint id) public view returns(SafeRemotePurchase)
	{
		uint _id = find(id);
		return contracts[_id];
	}

	// deploy a new purchase contract
	function newPurchase(string memory title, string memory contractHash) public payable returns(address)
	{
		SafeRemotePurchase c = new SafeRemotePurchase(msg.sender, msg.value, nextId, title, contractHash);
		contracts.push(c);
		nextId++;
		address lastContractAddress = address(c);
		emit newPurchaseContract(lastContractAddress);
	    
		return lastContractAddress;
	}

	
	
	function find(uint id) internal view returns(uint){
        
        for(uint i = 0; i < contracts.length; i++){
            
            //based on https://ethereum.stackexchange.com/questions/38317/access-to-public-variable-from-other-contract/38319
            //notice that to get the value of id we call its getter function id() 
            //!!!! which is automatically generated due to the public keyword.
            //uint temp = contracts[i].id();
            
            if(contracts[i].id() == id){
                return i;  //return the position of the element in the array
            }
        }

        revert('Contract does not exists!');
    
	}

}


//based on https://solidity.readthedocs.io/en/v0.5.6/solidity-by-example.html#safe-remote-purchase
contract SafeRemotePurchase {
    
    using SafeMath for uint256;
    
    address payable private seller;
    uint public id;
    string public title;
    uint public price;
    string public ipfsHash;
    
    address payable public buyer;

    enum State { Created, Locked, Inactive }
    State public state;

    // Contract created by the seller
    // Ensure that `msg.value` is an even number.
    // Division will truncate if it is an odd number.
    // Check via multiplication that it wasn't an odd number.
    constructor(
        address payable _contractSeller, 
        uint _price,
        uint _id,
        string memory _title,
        string memory _contractHash) public payable {
        
        seller = _contractSeller;
        id = _id;
        ipfsHash = _contractHash;
        title = _title;
        price = _price.div(2);
        require(price.mul(2) == msg.value, "Value has to be even.");
    }

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this.");
        _;
    }

    modifier onlySeller() {
        require( msg.sender == seller, "Only seller can call this.");
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "Invalid state.");
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();

    /// Confirm the purchase as buyer.
    /// Transaction has to include `2 * value` ether.
    /// The ether will be locked until confirmReceived
    /// is called.
    function buyerConfirmPurchase() public inState(State.Created)
        condition(msg.value == (price.mul(2)))
        payable
    {
        emit PurchaseConfirmed();
        buyer = msg.sender;
        state = State.Locked;
    }

    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    function buyerConfirmReceived() public onlyBuyer
        inState(State.Locked)
    {
        emit ItemReceived();
        
        // .. reserch this notice...
        // It is important to change the state first because
        // otherwise, the contracts called using `send` below
        // can call in again here.
        state = State.Inactive;

        // NOTE: This actually allows both the buyer and the seller to
        // block the refund - the withdraw pattern should be used.

        buyer.transfer(price);
        seller.transfer(address(this).balance);
    }
    
    // The seller changed his mind
    // and does 't want to seller
    // Abort the purchase and reclaim the ether.
    // Can only be called by the seller if the contract is Inactive
    function abortBySeller() public onlySeller
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }

    //'view' means does not modify the storadge of the smart contract
    function balanceOf() view public returns(uint){
        return address(this).balance;
    }
    
}
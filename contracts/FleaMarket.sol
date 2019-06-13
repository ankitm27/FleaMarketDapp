pragma solidity ^0.5.9;

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


/*
 based on 
    https://medium.com/@i6mi6/solidty-smart-contracts-design-patterns-ecfa3b1e9784
    https://ethereum.stackexchange.com/questions/13415/deploy-contract-from-contract-in-solidity
*/
contract FleaMarket {
	
	//mapping key to address
	mapping(string => address) elements;
    string[] keys;
    
	address public lastContractAddress;

    event newPurchaseContract(
        address contractAddress
    );

	constructor() public
	{}


	// deploy a new purchase contract
	function createPurchaseContract(string memory key, string memory title, string memory contractHash) 
	        public payable returns(bool createResult)
	{
		/*
		  When a new contract is created with the 'new' keyword, for example 
		     Token token = new Token;
		     
          This line fires a transaction which deploys the child Token contract 
          and returns the address for that contract.
          In Solidity contracts are directly convertible to addresses. 
          The newer compiler wants to see that explicitly, like return address(token);
		*/
		
		SafeRemotePurchase c = (new SafeRemotePurchase).value(msg.value)(msg.sender, key, title, contractHash);
		
		/*
		checking that the key is not taken already 
		address(0) is the same as "0x0", an uninitialized! address.
		*/
		bool taken = elements[key] != address(0);
		
		require( !taken, "The key has been already taken");
    	
		keys.push(key);
		
		lastContractAddress = address(c);
		
		elements[key] = lastContractAddress;

		emit newPurchaseContract(lastContractAddress);
	    
		return true;
	}
	
	
	function getKeyCount() public view returns (uint elementsCount) {
       return keys.length;
    }
    
    function getElementByIndex(uint index) public view
		returns(address contractAddress) {
        
       require( index < keys.length, "Invalid index");
       return elements[keys[index]];
    }
    
    function getElementByKey(string memory key)  public view
		returns(address contractAddress) {
      
       bool exists = elements[key] != address(0);
		
	   require(exists, "No asset data exists for this key");
       
       return elements[key];
    }
	
}


//based on https://solidity.readthedocs.io/en/v0.5.6/solidity-by-example.html#safe-remote-purchase
contract SafeRemotePurchase {
    
    using SafeMath for uint256;
    
    address payable private seller;
    address payable public buyer;
    uint public price;
    string public key;  //unique string identifier
    string public title;
    string public ipfsHash;
    
    enum State { Created, Locked, Inactive }
    State public state;

    // Contract created by the seller
    // Ensure that `msg.value` is an even number.
    // Division will truncate if it is an odd number.
    // Check via multiplication that it wasn't an odd number.
    constructor(
        address payable _contractSeller, 
        string memory _key,
        string memory _title,
        string memory _contractHash) public payable {
        seller = _contractSeller;
        key = _key;
        ipfsHash = _contractHash;
        title = _title;
        price = msg.value.div(2);
        require(price.mul(2) == msg.value, "Value has to be even.");
    }

    modifier condition(bool _condition) {
        require(_condition, "Condition is false");
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

    // Confirm the purchase as buyer.
    // Transaction has to include `2 * value` ether.
    // The ether will be locked until confirmReceived
    // is called.
    function buyerConfirmPurchase() public inState(State.Created)
        condition(msg.value == (price.mul(2)))
        payable
    {
        emit PurchaseConfirmed();
        buyer = msg.sender;
        state = State.Locked;
    }

    // Confirm that you (the buyer) received the item.
    // This will release the locked ether.
    function buyerConfirmReceived() public onlyBuyer
        inState(State.Locked)
    {
        emit ItemReceived();
        state = State.Inactive;
        
        buyer.transfer(price);
        seller.transfer(balanceOf());
    }
    
    // The seller has changed his mind and does not want to sell the item
    // Abort the purchase and reclaim the ether.
    // Can only be called by the seller if the contract is Inactive
    function abortBySeller() public onlySeller
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        
        seller.transfer(balanceOf());
    }

    //get balance of the contract
    function balanceOf() view public returns(uint){
        return address(this).balance;
    }
    
}
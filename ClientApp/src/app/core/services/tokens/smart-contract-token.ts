
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Contract } from 'ethers';
import { Provider } from './web3-token';

const FLEA_MARKET_CONTRACT_ADDRESS = '0x2a081bb468e1502260796271FFC7dD0CC92e255C'
const abi = [
  'event newPurchaseContract(address contractAddress)',
  'constructor()',
  'function createPurchaseContract(string memory key, string memory title, string memory ipfxHash) payable returns(bool createResult)',
  'function getKeyCount() view returns (uint elementsCount)',
  'function getElementByIndex(uint index) view returns(address contractAddress)',
  'function getElementByKey(string memory key) view returns(address contractAddress)'

];

@Injectable({ providedIn: 'root' })
export class FleaMarketContract extends Contract {
  constructor(provider: Provider) {
    super(FLEA_MARKET_CONTRACT_ADDRESS, abi, provider.getSigner());
  }
}









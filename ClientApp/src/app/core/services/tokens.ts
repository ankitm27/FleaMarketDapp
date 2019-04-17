import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';

import ContractAbi from '../../../../../build/contracts/FleaMarket.json';

export const MetaMaskWeb3Provider = new InjectionToken('MetaMask Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

@Injectable({ providedIn: 'root' })
export class EtherProvider extends providers.Web3Provider {
  constructor(@Inject(MetaMaskWeb3Provider) web3Provider) {
    super(web3Provider);
  }
}

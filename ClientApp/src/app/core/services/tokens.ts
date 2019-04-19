import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';

// import ContractAbi from '../../../../../build/contracts/FleaMarket.json';

export const MetamaskWeb3Provider = new InjectionToken('Metamask Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

@Injectable({ providedIn: 'root' })
export class EthersProvider extends providers.Web3Provider {
  constructor(@Inject(MetamaskWeb3Provider) web3Provider) {
    super(web3Provider);
  }
}

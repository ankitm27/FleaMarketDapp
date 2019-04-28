import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
// import { IpfsHttpClient } from 'ipfs-http-client';

// import ContractAbi from '../../../../../build/contracts/FleaMarket.json';

export const MetamaskWeb3Provider = new InjectionToken('Metamask Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

@Injectable({ providedIn: 'root' })
export class Provider extends providers.Web3Provider {
  constructor(@Inject(MetamaskWeb3Provider) web3Provider) {
    super(web3Provider);
  }
}

/*
export const IPFS = new InjectionToken(
  'The IPFS instance',
  {
    providedIn: 'root',
    factory: () => new IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' })
  },
);
*/

/*
export const WEB3 = new InjectionToken<Web3>('web3Token', {
  providedIn: 'root',
  factory: () => {
    // based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    try {
      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;

      return new Web3(provider);
    } catch (err) {
      throw new Error('Unable to retrieve the injected Ethereum provider from  MetaMask');
    }
  }
});
*/


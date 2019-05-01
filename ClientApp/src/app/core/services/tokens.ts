
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';

// import ContractAbi from '../../../../../build/contracts/FleaMarket.json';

export const MetamaskWeb3Provider = new InjectionToken(
  'Metamask Web3 provider',
  {
    providedIn: 'root',
    factory: () => (window as any).ethereum
  }
);

@Injectable({ providedIn: 'root' })
export class Provider extends providers.Web3Provider {
  constructor(@Inject(MetamaskWeb3Provider) web3Provider) {
    super(web3Provider);
  }
}

export const ipfsToken = new InjectionToken('The IPFS instance', {
  providedIn: 'root',
  factory: () => {
    try {
      return new (window as any).IpfsHttpClient('ipfs.infura.io', '5001', {
        protocol: 'https'
      });
    } catch (err) {
      console.log('Error', err);
      throw new Error('Unable to access IPFS node daemon on Infura network');
    }
  }
});

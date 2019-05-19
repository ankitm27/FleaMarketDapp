import { Injectable } from '@angular/core';

import { Provider } from './tokens';
import { ethers, Signer } from 'ethers';

import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Web3ProviderService {

   private signer: Signer;
   
   constructor(private provider: Provider) {
      this.signer = provider.getSigner();
     }

    public getAccount(): Observable<string> {
       
        return from(this.signer.getAddress()).pipe(
          tap(address => console.log('address', address))
        );
    }

    public getBalance(): Observable<string> {

      // getBalance(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<BigNumber>; 
      return from(this.provider.getBalance(this.signer.getAddress())).pipe(
         tap(wei_balance => console.log('wei balance', wei_balance)),
        
         map(wei_balance => ethers.utils.formatEther(wei_balance)),
         tap(balance => console.log('eth balance', balance)),

       );
   }

}

import { Injectable, Inject } from '@angular/core';

import { ipfsToken } from './tokens';

import { Observable, of, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpfsDaemonService {
   
   constructor(@Inject(ipfsToken) private ipfs) {
     }

    public getId(): Observable<string> {
       
        return from(this.ipfs.id()).pipe(
          tap((res: any) => console.log(`IPFS node id object: ${JSON.stringify(res)}`)),
          map(res => res.id),
        );
    }

    public getVersion(): Observable<string> {
       
      return from(this.ipfs.version()).pipe(
        tap((res: any) => console.log(`IPFS node version object: ${JSON.stringify(res)}`)),
        map(res => res.version),
      );
  }


    

}

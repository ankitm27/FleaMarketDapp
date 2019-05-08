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
          tap((res: any) => console.log(`Connected to IPFS node: id: ${res.id}, agentVersion: ${res.agentVersion}, protocolVersion: ${res.protocolVersion}`)),
           
          map(res => res.id),
        );
    }


    

}

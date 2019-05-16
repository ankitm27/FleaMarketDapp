import { Injectable, Inject } from "@angular/core";

import { ipfsToken } from "./tokens";

import { Observable, of, from } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class IpfsDaemonService {
  constructor(@Inject(ipfsToken) private ipfs) {}

  public getId(): Observable<string> {
    return from(this.ipfs.id()).pipe(
      tap((res: any) =>
        console.log(`IPFS node id object: ${JSON.stringify(res)}`)
      ),
      map(res => res.id)
    );
  }

  public getVersion(): Observable<string> {
    return from(this.ipfs.version()).pipe(
      tap((res: any) =>
        console.log(`IPFS node version object: ${JSON.stringify(res)}`)
      ),
      map(res => res.version)
    );
  }

  public addFileToIPFS (fileStream: ArrayBuffer, fileName?: string): Observable<string> {

    const options = {
      progress: (prog) => console.log(`progress report: ${prog}`) 
    };
    
    if (fileName){

      const fileDetails = {
        path: fileName,
        content: fileStream
      };
      
      return from(this.ipfs.add(fileDetails, options)).pipe(
        tap((res: any) =>
          console.log(`IPFS node response json: ${JSON.stringify(res)}`)
        ),
        map((res: any) => res[res.length - 1].hash )
      );
    }else {

      return from(this.ipfs.add(fileStream, options)).pipe(
        tap((res: any) =>
          console.log(`IPFS node response json: ${JSON.stringify(res)}`)
        ),
        map((res: any) => res[0].hash )
      );
    }
    
  }

  

}

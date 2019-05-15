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

  public addFileToIPFS (fileName: string, fileStream: ArrayBuffer): Observable<string> {

    const fileDetails = {
      path: fileName,
      content: fileStream
    };
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`progress report: ${prog}`) 
    };

    return from(this.ipfs.add(fileDetails, options)).pipe(
      tap((res: any) =>
        console.log(`IPFS node response: ${JSON.stringify(res)}`)
      ),
      map((res: any) => res[res.length - 1].hash )
    );
  }

}

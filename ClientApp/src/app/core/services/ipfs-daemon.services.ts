import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ipfsToken } from './tokens';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
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

  public addFile(file: File): Observable<string> {
    
    const data = {
      path: file.name, 
      content: file 
    }
    
    const options = {
      progress: (prog) => console.log(`progress report: ${prog}`) 
    }; 
   
    return from(this.ipfs.add(data, options)).pipe(
        tap((res: any) =>
          console.log(`IPFS node response json: ${JSON.stringify(res)}`)
        ),
        map((res: any) => res[res.length - 1].hash )
      );
  }
    
  public getFile = (hash: string): Observable<Buffer> => from(this.ipfs.cat(hash)).pipe(
    map(stream => stream as Buffer)
  );
 

}

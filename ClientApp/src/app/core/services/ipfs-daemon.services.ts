import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ipfsToken } from './tokens';
import { FileModel } from '../../seller-booth/models/file-model-interface'

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
    
  public getFile(hash: string): Observable<FileModel> {
    return from(this.ipfs.files.get(hash)).pipe(
      map((files: any) => files[0]),
      map((file: any) =>  {
           return {
             path: file.path,   // string 
             content: file.content // Buffer
           }
      } )
    )
      
  }
  


}

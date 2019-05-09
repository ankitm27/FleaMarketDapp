import {Component, ViewChild, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers';
import { FileUploadStatus } from '../../../core/store/reducers/ipfs-upload.reducer';
import { IpfsUploadActions } from '../../../core/store/actions';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit, OnDestroy {

  @ViewChild('file') fileControl: ElementRef;
  fileModel: File;
  ipfsHash$: Observable<string>;
  uploadStatus$: Observable<FileUploadStatus>;
  imgPreviewURL: any;

  constructor(
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();

  frmGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    fileArg: [
      '',
      [Validators.required, Validators.pattern(/^.+\.(jpg|gif|png|jpeg)$/)]
    ]
  });

  ngOnInit() {
    this.uploadStatus$ = this.store.pipe(select(fromRoot.getIpfsUploadStatus));
    this.ipfsHash$ = this.store.pipe(select(fromRoot.getIpfsHash));
  }

  formControl = (name: string) => this.frmGroup.get(`${name}`);

  /*
     A controls is said to be touched if the the user focused on the control 
     and then focused on something else. 
     For example by clicking into the control and then pressing tab or clicking on another control in the form.

      The difference between touched and dirty is that with touched the user doesn’t need to actually change 
      the value of the input control.
    */
  required = (name: string) =>
    this.formControl(name).hasError('required') && this.formControl(name).touched;

  invalidPattern = (name: string) =>
    // 'dirty' means that the user is actually interacted with the control
    // making attempt of typing vs just focusing or blaring
    this.formControl(name).hasError('pattern') && this.formControl(name).dirty;

  requiredFile = (name: string) => this.formControl(name).hasError('required');
  invalidPatternFile = (name: string) => this.formControl(name).hasError('pattern');
  
    // here is the way to emulate the click on the file input control
  selectFile() {
    this.fileControl.nativeElement.click();
  }

  uploadFileToIPFS() {
    this.store.dispatch(IpfsUploadActions.start({file: this.fileModel}));
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.fileModel = event.target.files[0];

      this.frmGroup.get('fileArg').patchValue(this.fileModel.name);
      
      const reader = new FileReader();
      reader.readAsDataURL(this.fileModel); 
      reader.onload = (_event) => { 
          this.imgPreviewURL = reader.result; 
       }
      
      this.store.dispatch(IpfsUploadActions.reset);

    }
  }

  isPending = (status: FileUploadStatus) => status === 'Pending';
  isSuccess = (status: FileUploadStatus) => status === 'Success';
  isError = (status: FileUploadStatus) => status === 'Error';
  inProgress = (status: FileUploadStatus) => status === 'Progress';


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

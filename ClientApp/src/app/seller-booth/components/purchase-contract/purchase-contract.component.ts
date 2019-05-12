import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/ipfs-upload.reducer';
import * as IpfsUploadActions from '../../store/ipfs-upload.actions';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit, OnDestroy {

  @ViewChild('file') fileControl: ElementRef;
  file$: Observable<File>;
  ipfsHash$: Observable<string>;
  uploadStatus$: Observable<fromStore.FileUploadStatus>;
  imgPreviewURL: any;

  constructor(
    private rootStore$: Store<fromStore.AppState>,
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
    this.file$ = this.rootStore$.pipe(select(fromStore.getIpfsFile));
    this.uploadStatus$ = this.rootStore$.pipe(select(fromStore.getIpfsUploadStatus));
    this.ipfsHash$ = this.rootStore$.pipe(select(fromStore.getIpfsHash));
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
    this.rootStore$.dispatch(IpfsUploadActions.start);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      this.frmGroup.get('fileArg').patchValue(file.name);
      
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
          this.imgPreviewURL = reader.result; 
       }
      
      this.rootStore$.dispatch(IpfsUploadActions.add({file}));

    }
  }

  isPending = (status: fromStore.FileUploadStatus) => status === 'Pending';
  isSuccess = (status: fromStore.FileUploadStatus) => status === 'Success';
  isError = (status: fromStore.FileUploadStatus) => status === 'Error';
  inProgress = (status: fromStore.FileUploadStatus) => status === 'Progress';


  ngOnDestroy(): void {

    this.rootStore$.dispatch(IpfsUploadActions.add({file: null}));
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
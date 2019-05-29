import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/ipfs-upload.reducer';
import * as IpfsActions from '../../store/ipfs-upload.actions';

import { ShowIpfsImageComponent } from '../../components/show-ipfs-image/show-ipfs-image.component';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit, OnDestroy {

  @ViewChild('file', {static: false}) fileControl: ElementRef;
  fileBlob: File;
  fileContent: ArrayBuffer;

  ipfsHash$: Observable<string>;
  uploadStatus$: Observable<fromStore.FileUploadStatus>;
  private readonly IMAGE_PATTERN: RegExp = /^.+\.(png|jpg|jpeg|gif|png)$/;

  
  constructor(
    private store$: Store<fromStore.AppState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  frmGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    fileArg: [
      '', [Validators.required, Validators.pattern(this.IMAGE_PATTERN)]
    ]
  });


  ngOnInit() {
    
    this.uploadStatus$ = this.store$.pipe(select(fromStore.getIpfsUploadStatus));
    this.ipfsHash$ = this.store$.pipe(select(fromStore.getIpfsHash));         
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

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.fileBlob = event.target.files[0];

      this.frmGroup.get('fileArg').patchValue(this.fileBlob.name);
      
      const reader = new FileReader();
      reader.readAsDataURL(this.fileBlob); 
      reader.onload = (_event) => { 
          this.fileContent = reader.result as ArrayBuffer; 
          this.store$.dispatch(IpfsActions.reset);
       };
    }
  }

  uploadFile() {
    this.store$.dispatch(IpfsActions.upload_image({file: this.fileBlob}));
  }


  isPending = (status: fromStore.FileUploadStatus) => status === 'Pending';
  isSuccess = (status: fromStore.FileUploadStatus) => status === 'Success';
  isError = (status: fromStore.FileUploadStatus) => status === 'Error';
  inProgress = (status: fromStore.FileUploadStatus) => status === 'Progress';


  loadImage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 
    this.dialog.open(ShowIpfsImageComponent, dialogConfig);
    
  }

  ngOnDestroy(): void {

    // reset state
    this.store$.dispatch(IpfsActions.reset);
  }

}

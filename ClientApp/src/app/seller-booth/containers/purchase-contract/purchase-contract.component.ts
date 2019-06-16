import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromPurchaseContract from '../../store/reducers';
import { IpfsUploadActions }  from '../../store/actions';
import { FileUploadStatus} from '../../store/reducers/ipfs-upload.reducer';

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
  uploadStatus$: Observable<FileUploadStatus>;
  private readonly IMAGE_PATTERN: RegExp = /^.+\.(png|jpg|jpeg|gif|png)$/;

  
  constructor(
    private store$: Store<fromPurchaseContract.AppState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  frmGroup: FormGroup = this.formBuilder.group({
    key: ['', Validators.required],
    title: ['', Validators.required],
    etherValue: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    fileArg: [
      '', [Validators.required, Validators.pattern(this.IMAGE_PATTERN)]
    ]
  });


  ngOnInit() {
    
    this.uploadStatus$ = this.store$.pipe(select(fromPurchaseContract.getIpfsUploadStatus));
    this.ipfsHash$ = this.store$.pipe(select(fromPurchaseContract.getIpfsHash));         
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
          this.store$.dispatch(IpfsUploadActions.reset);
       };
    }
  }

  uploadFile() {
    this.store$.dispatch(IpfsUploadActions.upload_image({file: this.fileBlob}));
  }


  isPending = (status: FileUploadStatus) => status === FileUploadStatus.Pending;
  isSuccess = (status: FileUploadStatus) => status === FileUploadStatus.Success;
  isError = (status: FileUploadStatus) => status === FileUploadStatus.Error;
  inProgress = (status: FileUploadStatus) => status === FileUploadStatus.Progress;


  loadImage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '460px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 
    this.dialog.open(ShowIpfsImageComponent, dialogConfig);
    
  }

  onCreate(): void {

    //const model = this.frmGroup.value;
    // console.log('model', model);
    //this.store.dispatch(new fromAttackChange.SetAttack(model.attack));
  }


  ngOnDestroy(): void {

    // reset state
    this.store$.dispatch(IpfsUploadActions.reset);
  }

}

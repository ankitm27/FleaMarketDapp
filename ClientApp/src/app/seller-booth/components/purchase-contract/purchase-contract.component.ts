import {Component, ViewChild, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers';

type FileUploadStatus = 'Pending' | 'Success' | 'Error' | 'Progress';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit, OnDestroy {

  @ViewChild('file') fileControl: ElementRef;
  fileModel: File;
  ipfsHash: string;
  status: FileUploadStatus;
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
    this.status = 'Pending';
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

  uploadToIPFS() {
    
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
      
     // set ipfsHash to null
     this.ipfsHash = null

    }
  }

  isPending = () => this.status === 'Pending';
  isSuccess = () => this.status === 'Success';
  isError = () => this.status === 'Error';
  inProgress = () => this.status === 'Progress';


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as fromRoot from '../../../core/store/reducers';
import { Web3ProviderActions } from '../../../core/store/actions';

import { ethers } from 'ethers';
import { Provider} from '../../../core/services/tokens';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit, OnDestroy {
  public attack$: Observable<string>;

  constructor(
    private provider: Provider,
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();
 

  frmGroup: FormGroup = this.formBuilder.group({
    // attack: ''
  });

  async ngOnInit() {
    // There is only ever up to one account in MetaMask exposed
    const signer = this.provider.getSigner();
    console.log('signer', signer);
    
    const address = await signer.getAddress();
    console.log('address', address);

    const balance = await signer.getBalance();
    console.log('balance', ethers.utils.formatEther(balance).toString());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

 

}

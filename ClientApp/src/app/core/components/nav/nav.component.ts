import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers';

export interface INavInterface {
  link: string;
  name: string;
  img_src: string;
  exact: boolean;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  nav: INavInterface[] = [
    {
      link: '/dashboard',
      name: 'Home',
      img_src: './assets/img/home-24.png',
      exact: true
    },
    {
      link: '/seller-booth',
      name: 'I am Seller',
      img_src: './assets/img/seller-24.png',
      exact: true
    },
    {
      link: '/buyer',
      name: 'I am Buyer',
      img_src: './assets/img/buyer-24.png',
      exact: true
    }
  ];

  account$: Observable<string>;
  balance$: Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.account$ = this.store.pipe(select(fromRoot.getAccount));
    this.balance$ = this.store.pipe(select(fromRoot.getBalance));
  }
}

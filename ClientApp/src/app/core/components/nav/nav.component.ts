import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class NavComponent {
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  nav:  INavInterface[]  = [
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


}

import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { transition, style, animate, trigger } from '@angular/animations';

export const DROP_BUDDY_ANIMATION = trigger('dropPoke', [
  transition(':enter', [   // alias for void => *
      style({ transform: 'translateY(-200px)', opacity: 0 }),
      animate(
          '750ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
          style({ transform: 'translateY(0)', opacity: 1 })
      ),
  ]),
  /* no need
  transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
            '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
            style({ transform: 'translateY(-200px)', opacity: 0 })
        ),
    ]),
  */
  
]);

export const SHAKE_HANDS_ANIMATION = trigger('shakeHands', [
  transition(':enter', [   // alias for void => *
      style({ opacity: 0 }),
      animate(
          '1s 300ms ease-in',  // Duration is 1 sec, delay is 300 milliseconds, easing in 
          style({ opacity: 1 })
      ),
  ]),
  
]);

@Component({
  selector: 'app-dashboard',
  animations: [DROP_BUDDY_ANIMATION, SHAKE_HANDS_ANIMATION],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Welcome to FleaMarket DApp on Ethereum Blockchain', cols: 1, rows: 1 },
          
        ];
      }
      
      return [
        { title: 'Welcome to FleaMarket DApp on Ethereum Blockchain', cols: 1, rows: 1 },
       
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}

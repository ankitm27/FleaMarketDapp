import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { transition, style, animate, trigger } from '@angular/animations';

export const DROP_BUDDY_ANIMATION = trigger('dropPoke', [
  transition(':enter', [
      style({ transform: 'translateY(-200px)', opacity: 0 }),
      animate(
          '750ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
          style({ transform: 'translateY(0)', opacity: 1 })
      ),
  ]),
  transition(':leave', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate(
          '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
          style({ transform: 'translateY(-200px)', opacity: 0 })
      ),
  ]),
]);



@Component({
  selector: 'app-dashboard',
  animations: [DROP_BUDDY_ANIMATION],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Welcome to Flea Market on Ethereum Blockchain', cols: 1, rows: 1 },
          
        ];
      }
      
      return [
        { title: 'Welcome to Flea Market on Ethereum Blockchain', cols: 1, rows: 1 },
       
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}

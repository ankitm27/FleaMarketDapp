import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        🐺 {{greeting}}!
      </h1>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  greeting = 'Hello Poppy';
}

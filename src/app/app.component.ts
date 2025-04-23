import { Component } from '@angular/core';

import { PoMenuFilter, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];
samplePoMenuHumanResourcesService!: string|PoMenuFilter;
menuItemSelected!: string;

  private onClick() {
    alert('Clicked in menu item')
  }

}



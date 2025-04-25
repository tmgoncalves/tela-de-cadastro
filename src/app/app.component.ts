import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  constructor(router: Router){}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home',
      shortLabel: 'Home',
      icon: 'po-icon po-icon-home',
      link: '/home'
    },
    { label: 'Produtos', 
      shortLabel: 'Produtos',
      icon: 'po-icon po-icon-pushcart',
      link: '/produtos'
    },
    { label: 'Cadastro', 
      shortLabel: 'Cadastro',
      icon: 'po-icon po-icon-user',
      link: '/cadastro'
    },
    { label: 'Financeiro', 
      shortLabel: 'Financeiro',
      icon: 'po-icon po-icon-money',
      subItems: [
        {
          label: 'Pagamentos'
        },
        {
          label: 'Recebimentos'
        }
      ]
    }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}

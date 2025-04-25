import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PoGaugeRanges } from '@po-ui/ng-components';

@Component({
  selector: 'app-produtos',
  standalone: false,
  
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  constructor(private http: HttpClient){}

  turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Baixo', color: '#00b28e' },
    { from: 50, to: 75, label: 'Médio', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Alto', color: '#c64840' }
  ];

  poGaugeAll: number = 0;
  poGaugeDay:number = 0;

  API = environment.API;

  updatePoGauge() {
    this.http.get(this.API).subscribe((items: any) => {
      this.poGaugeAll = 25 * items.length;

      const today = new Date().toLocaleDateString();
      let count = 0;

      items.map((response: any) => {
        const dateToCompare = new Date(response.date).toLocaleDateString();

        if (today === dateToCompare) {
          count++;
        }
      })
      this.poGaugeDay = count;
    })
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoGaugeRanges, PoListViewAction, PoMenuItem, PoStepperComponent } from '@po-ui/ng-components';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;
  transactionConfirm: any = [];

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  isHideLoading: boolean = true;

  poGaugeAll: number = 0;
  poGaugeDay:number = 0;

  constructor(private http: HttpClient){}


  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    },
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {property: 'sender', label: 'Remetente', placeholder: 'Remetente', required: true, gridColumns: 4},
    {property: 'recipient', label: 'Destinatário', placeholder: 'Destinatário', required: true, gridColumns: 4},
    {property: 'money', label: 'Valor', type: 'currency', placeholder: 'Valor', required: true, gridColumns: 4},
    {property: 'description', label: 'Descrição', required: true, gridColumns: 12, rows: 5, placeholder: 'Descrição'}
  ]

  save() {

    if(this.poGaugeDay >= 100) {
      alert('Limite diário atingido')
      return
    } else if (this.poGaugeAll >= 100) {
      alert('Limite total atingido')
      return
    }
    this.transactionConfirm = [];
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }

    this.isHideLoading = false;

    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true;
      this.transactionConfirm.push(response);
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
      this.isHideLoading = true;
    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  poData() {
    return this.propertyData;
  }

  poAccept() {
    return this.propertyAccept;
  }

  poConcluded() {
    return this.propertyConcluded;
  }

  confirm() {
    this.isHideLoading = false;

    setTimeout(() => {
      this.propertyAccept = true;
      this.stepper.next();
      this.propertyAccept = false;
      this.dynamicForm.reset();
      this.isHideLoading = true;
    }, 2000);

    setTimeout(() => {
      this.stepper.first();
    }, 4000)
  }

  cancel() {
    this.stepper.first();
  }
}

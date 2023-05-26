import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { createPasswordStrengthValidator, createDateRangeValidator, createCPFValidator, createCNPJValidator } from 'src/app/validators';

@Component({
  selector: 'app-pessoa-add-page',
  templateUrl: './pessoa-add-page.component.html',
  styleUrls: ['./pessoa-add-page.component.css']
})
export class PessoaAddPageComponent implements OnInit {
  pessoa: any = {}
  hobies = [
    'Dançar',
    'Jogar futebol',
    'Passear'
  ]

  formGroup = this.formBuilder.group({
    id: this.formBuilder.control<number|null>(null),
    nome: [''],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    hobie: [''],
    password: ['', createPasswordStrengthValidator()],
    startAt: [],
    endAt: [],
    cpf: ['', Validators.compose([Validators.required, createCPFValidator()])],
    cnpj: ['', Validators.compose([Validators.required, createCNPJValidator()])]
  }, {
    validators: [createDateRangeValidator()]
  })

  constructor(private formBuilder: FormBuilder, private service: PessoaService, private activeRouter: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id')
    if(id) {
      this.formGroup.patchValue(this.service.buscar(id))
    }
  }

  salvar() {
    if(this.formGroup.valid) {
      if(this.formGroup.value.id) {
        this.service.editar(this.formToValue(this.formGroup))
      }else {
        this.service.salvar(this.formToValue(this.formGroup))
        .subscribe(p => {
          alert('pessoa salva com sucesso')
        })
      }
      
      
    }else {
      alert('formulario invalido')
    }
  }


  isError(control: 'email' | 'nome' | 'hobie' | 'cpf' | 'cnpj', validor: string) {
    return this.formGroup.controls[control].getError(validor) ? true : false
  }

  formToValue(form: typeof this.formGroup): Pessoa {
    return {
      id: form.value.id!,
      name: form.value.nome!,
      gender: 'MALE',
      status: 'ACTIVE',
      email: form.value.email!,
      hobie: form.value.hobie!
    }
  }
  
}

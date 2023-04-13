import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';

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
    hobie: ['']
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


  isError(control: 'email' | 'nome' | 'hobie', validor: string) {
    return this.formGroup.controls[control].getError(validor) ? true : false
  }

  formToValue(form: typeof this.formGroup): Pessoa {
    return {
      id: form.value.id!,
      nome: form.value.nome!,
      email: form.value.email!,
      hobie: form.value.hobie!
    }
  }
  
}

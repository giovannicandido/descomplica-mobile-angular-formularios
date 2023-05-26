import { Injectable } from '@angular/core';
import { Pessoa } from '../model/pessoa.model';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Token } from '@angular/compiler';

const API_URL = "https://gorest.co.in/public/v2/users"
const TOKEN = "7bc2eed12fb4e9e138836aefe7f2a96fc835d1da2f0e04e1f6fcdfac70018940"
const AUTH_HEADER = "Authorization"

@Injectable({providedIn: 'root'})
export class PessoaService {
    
    id = 1;
    constructor(private http: HttpClient) { }

    salvar(pessoa: Pessoa): Observable<Pessoa> {
        let headers = new HttpHeaders();
        headers = headers.append(AUTH_HEADER, `Bearer ${TOKEN}`)
        return this.http.post<Pessoa>(API_URL, pessoa, {headers: headers});
        
    }


    buscar(id: string): Pessoa {
        const pessoa = localStorage.getItem('pessoa_' + id);
        return JSON.parse(pessoa ? pessoa : "{}")
    }

    editar(pessoa: Pessoa) {
        const pessoaJson = JSON.stringify(pessoa)
        localStorage.setItem('pessoa_' + pessoa.id, pessoaJson)
    }
    
}
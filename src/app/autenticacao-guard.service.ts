import { CanActivate } from "@angular/router/src/interfaces";
import { Injectable } from "@angular/core";
import { Autenticacao } from "./autenticacao.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate {
    
    constructor(private autenticacao: Autenticacao){}

    canActivate(): boolean  {
        
        return this.autenticacao.autenticado()
    }

}
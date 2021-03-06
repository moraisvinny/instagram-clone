import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model'
import { Autenticacao } from '../../autenticacao.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]) 
  })
  constructor( private autenticacao: Autenticacao ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }
  public erro: Error = undefined

  public cadastrarUsuario(): void {
    //console.log(this.formulario)

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )

    this.autenticacao.cadastrarUsuario(usuario).then(
      (resposta: any) => {
        this.exibirPainelLogin()
      }
    ).catch((error: Error)=>{this.erro = error})
    
  }

}

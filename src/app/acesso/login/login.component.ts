import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Autenticacao } from '../../autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }

  public formulario: FormGroup = new FormGroup(
    {
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
    }
  )

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter();
  public erroAutenticacao = undefined
  ngOnInit() {
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    console.log(this.formulario)
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .catch((error: Error)=>{this.erroAutenticacao = error})
      
  }

}

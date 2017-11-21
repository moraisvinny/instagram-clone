import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase'
import { Progresso } from '../../progresso.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  constructor(private bd: Bd, private progresso: Progresso) { }
  public email: string
  public imagem: any

  public formulario: FormGroup = new FormGroup(
    { "titulo": new FormControl(null, Validators.required) }
  )

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {


    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    })

    let acompanhamentoUpload = Observable.interval(1500)
      .subscribe(() => {
        console.log(this.progresso.status)
        console.log(this.progresso.estado)
        if(this.progresso.status === 'concluido') {
          acompanhamentoUpload.unsubscribe()
        }
      })

  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (<HTMLInputElement>event.target).files[0]

  }

}

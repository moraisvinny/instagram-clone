import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter()
  public email: string
  public imagem: any

  public 
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number = 0

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
        //console.log(this.progresso.status)
        //console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento'
        
        let percentualReal = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

        if(percentualReal < 25) {
          this.porcentagemUpload = 0
        } else if(percentualReal > 25 && percentualReal< 50) {
          this.porcentagemUpload = 25
        } else if(percentualReal > 50 && percentualReal< 75) {
          this.porcentagemUpload = 50
        }else if(percentualReal > 75 && percentualReal< 100) {
          this.porcentagemUpload = 75
        } else {
          this.porcentagemUpload = 100
        }

        if(this.progresso.status === 'concluido') {

          this.progressoPublicacao = 'concluido'
          this.atualizarTimeLine.emit(null)
          acompanhamentoUpload.unsubscribe()
          
          
        }
      })

  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (<HTMLInputElement>event.target).files[0]

  }

  

}

import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Imagem } from './imagem.model'
import { setTimeout } from 'timers';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1

      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
      
    ])]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'

  public imagens: Imagem[] = [
    {estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    {estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    {estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    {estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    {estado: 'escondido', url: '/assets/banner-acesso/img_5.png' },
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(()=>this.logicaRotacao() ,3000)
  }

  public logicaRotacao():void {

    let idx: number
    this.imagens.forEach((imagem: Imagem )=> {
      if(imagem.estado === 'visivel') {
        imagem.estado = 'escondido'
        idx = this.imagens.indexOf(imagem) === 4 ? 0 : this.imagens.indexOf(imagem) + 1
        
      }
    })
    this.imagens[idx].estado = 'visivel'

    setTimeout(()=>this.logicaRotacao() ,3000)
  }


}

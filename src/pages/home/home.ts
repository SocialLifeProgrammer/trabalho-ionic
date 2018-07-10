import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Receita } from '../../model/receita';
import { DetalhesPage } from '../detalhes/detalhes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage';
import { Database } from '../../data/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  receita: Receita = new Receita();
    

  constructor(public navCtrl: NavController,
    public http: Http,
    public storage: Storage,
    public database: Database) {

  }

  cadastrarReceita(){
    this.database.adicionarReceita(this.receita)
    alert('Receita cadastrada!');
  }

  consultarReceita(){
    this.database.buscarReceita().subscribe(data =>{
     console.log(data.nome);
   });
  }

  chamarBuscareceita(){
    this.navCtrl.push(DetalhesPage);
  }



}

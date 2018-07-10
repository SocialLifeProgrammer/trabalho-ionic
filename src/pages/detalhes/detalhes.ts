import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Receita } from '../../model/receita';
import { Database } from '../../data/database';


@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {
  receita:Receita[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
            public database: Database) {

    this.buscarReceita();
  }

  buscarReceita(){
    this.database.buscarReceita().subscribe(data =>{
      this.receita = data;
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPage');
  }

  fecharDetalhes(){
    this.navCtrl.pop();
  }

}

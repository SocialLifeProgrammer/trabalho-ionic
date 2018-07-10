import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Receita } from '../model/receita';


import { Observable } from 'rxjs/Observable';

@Injectable()
export class Database {

  theConsole: string = "Console Messages";

  options: any = {
    name: 'aula.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connectDb();
  }

  private connectDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS receita (nome VARCHAR(255), ingrediente VARCHAR(255), modopreparo VARCHAR(255),)';
        this.db.executeSql(sql, {})
          .then(() => console.log("SQL " + sql))
          .catch(e => console.log("Erro " + e));
      }).catch(e => console.log("Erro " + e));

  }

  adicionarReceita(receita: Receita): void {

    var sql = "INSERT INTO receita (nome,ingrediente, modopreparo) VALUES ('" + receita.nome + "'," + receita.ingrediente + "," + receita.modopreparo + ")";

    this.db.executeSql(sql, {})
      .then(() => console.log("SQL " + sql))
      .catch(e => console.log("Erro " + e));
  }
  buscarReceita() {
    var sql = "SELECT * FROM receita";
    return Observable.create((observer) => {
      this.db.executeSql(sql, {})
        .then((result) => {
          let items: Receita[] = [];
          if (result.rows.length > 0) {
            for (var x = 0; x < result.rows.length; x++) {
              let receita: Receita = new Receita();
              receita.nome = result.rows.item(x).nome;
              receita.ingrediente = result.rows.item(x).ingrediente;
              receita.modopreparo = result.rows.item(x).modopreparo;
              items.push(receita);
            }
          }
          observer.next(items);
          observer.complete();
        })
        .catch(e => {
          console.log("Erro " + e);
          alert("Errorr " + e);
        });
    }, error => {
      alert("Errorr " + error);
    });

  }








}

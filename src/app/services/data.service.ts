import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

    
  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json());
  }





  loginUsers(data){
  return this._http.post('/api/addusers', data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
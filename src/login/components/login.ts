import { Component } from '@angular/core';
import { DataService } from '../../app/services/data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: '../templates/login.html',
  styleUrls: ['../../common/styles/font-awesome.css','../../common/styles/style.css']
})
export class LoginComponent {
  title = 'login';
  email: string = '';
  password: string = '';

  
  
  
  // Define a users property to hold our user data
  users: Array<any>;
  
  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService,private _http: Http,private router: Router) {
}
    getValue() { // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res); }


    loginUser(){
      return this._http.post('/api/loginuser', {
        password:this.password,
        email:this.email
      })
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/dashboard']);
            },
            err => {
              console.log("Error occured");
            }
          );
    }
  

}

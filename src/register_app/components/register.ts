import { Component } from '@angular/core';
import { DataService } from '../../app/services/data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: '../templates/register.html',
  styleUrls: ['../../common/styles/font-awesome.css','../../common/styles/style.css']
})
export class RegisterComponent {
  title = 'app';
  // Define a users property to hold our user data
  users: Array<any>;
  user: any;
  username: string = '';
  password: string = '';
  first: string = '';
  last: string = '';
  email: string = '';
  constructor(private _http: Http,private router: Router) { }

   postUsers(){
    return this._http.post('/api/createusers', {
      username : this.username,
      password:this.password,
      name: {
        first: this.first,
        last: this.last
    },
      email:this.email
    })
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/login']);
          },
          err => {
            console.log("Error occured");
          }
        );
    }


 
  
}

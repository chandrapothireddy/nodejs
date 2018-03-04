import { Component } from '@angular/core';
import { DataService } from '../../app/services/data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: '../templates/dashboard.html',
  styleUrls: ['../../common/styles/font-awesome.css','../../common/styles/style.css']
})
export class DashboardComponent {
  // Define a users property to hold our user data
  users: Array<any>;
  
    // Create an instance of the DataService through dependency injection
    constructor(private _dataService: DataService,private router: Router) {
  
      // Access the Data Service's getUsers() method we defined
      this._dataService.getUsers()
          .subscribe(res => {this.users = res;}
            
        );
          
    }
    EditUser(id){
      alert(id);
      this.router.navigate(['/register'], { queryParams: { uid: id } });
    }
  
}

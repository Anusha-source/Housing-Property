import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../service/alertify.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 loggedinUser: string;

  constructor(private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
  // tslint:disable-next-line: typedef
  loggedin(){
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }

  // tslint:disable-next-line: typedef
  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('You are logged out !');

  }
}

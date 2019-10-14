import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 showLogo: Observable<boolean>;
  constructor( private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      debugger;
      this.showLogo = this.method();
    }
  }
  logout() {
    localStorage.removeItem('token');
    // this.showLogo = false;
    this.router.navigate(['login']);
  }
  method(): Observable<boolean> {
    if (localStorage.getItem('token') === null) {
      return observableOf(false);
    } else {
      return observableOf(true);
    }
    }
}

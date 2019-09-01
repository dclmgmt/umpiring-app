import { Component, OnInit } from '@angular/core';
import { Schedule } from './schedule';
import { ScheduleService } from 'src/schedule.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  data: Schedule[] = [];
  displayedColumns: string[] = ['bookId', 'isbn', 'title'];
  isLoadingResults = true;

  constructor(private scheduleService: ScheduleService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule(): void {
    this.scheduleService.getSchedule()
      .subscribe(schedule => {
        this.data = schedule;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}

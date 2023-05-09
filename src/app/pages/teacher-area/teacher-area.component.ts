import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-teacher-area',
  templateUrl: './teacher-area.component.html',
  styleUrls: ['./teacher-area.component.scss']
})
export class TeacherAreaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private securityService : SecurityService) { }

  ngOnInit(): void {
  }

  goToMySpace() {
    this.router.navigate(['teacher-area']);
  }

  goToAttendance() {
    this.router.navigate(['teacher-absence']);
  }

  goToMyMarks() {
    this.router.navigate(['teacher-marks']);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

}

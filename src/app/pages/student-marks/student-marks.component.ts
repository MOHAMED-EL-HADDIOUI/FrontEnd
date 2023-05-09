import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbsencesService } from '../../services/absences.service';
import { Absence, Student } from '../../models/main.model';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.scss']
})
export class StudentMarksComponent implements OnInit {

  student: Student;

  constructor(private http: HttpClient, private router: Router, private securityService: SecurityService) { }

  ngOnInit(): void {

  }

  goToMySpace() {
    this.router.navigate(['student-area']);
  }

  goToAttendance() {
    this.router.navigate(['student-absence']);
  }

  goToMyMarks() {
    this.router.navigate(['student-marks']);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsencesService } from '../../services/absences.service';
import { Absence, Student } from '../../models/main.model';
import { SecurityService } from '../../services/security.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-student-absence',
  templateUrl: './student-absence.component.html',
  styleUrls: ['./student-absence.component.scss']
})
export class StudentAbsenceComponent implements OnInit {

  student: Student;
  absences: Absence[] = [];

  constructor(private http: HttpClient, private router: Router, private securityService: SecurityService, private absenceService :AbsencesService) { }

  ngOnInit(): void {
    let userId = JSON.parse(localStorage.getItem('user')).username;
    this.absenceService.getStudentAbsences(userId).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.absences = res;
    }
    )
  }

  onUpload(event, absence) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.absenceService.addJustification(absence.id ,event.target.files[0]).subscribe({
          next: () => {
           // this.messageService.add({severity:'success', summary: 'Success', detail:'Justification Uploaded Successfully'});
          }
       })
      }
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

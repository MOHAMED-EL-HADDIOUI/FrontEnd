import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SecurityService} from '../../services/security.service';
import {Etudiant, Element, Absence, Speciality} from '../../models/main.model';
import {AbsencesService} from '../../services/absences.service';
import {DeliberationsService} from '../../services/deliberations.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teacher-absence',
  templateUrl: './teacher-absence.component.html',
  styleUrls: ['./teacher-absence.component.scss']
})
export class TeacherAbsenceComponent implements OnInit {

  students: Etudiant[] = [];
  elementModules: Element[] = [];
  elementModuleNames: string[] = [];
  absences: Absence[] = [];
  specialities: Speciality[] = [];
  specialitiesNames: string[] = [];
  selectedSpeciality: string = '';
  selectedModule: string = '';
  date: Date = new Date();
  public flag = 0;

  constructor(private http: HttpClient, private router: Router, private securityService: SecurityService, private absenceService: AbsencesService, private deliberationService: DeliberationsService) {
  }

  ngOnInit(): void {
    this.specialities = [];
    this.deliberationService.getSpecialities().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {

      this.specialities = res;
      this.specialitiesNames = res.map(s => s.titre);
    });
  }

  getElementModules() {
    this.absenceService.getElementModules(JSON.parse(localStorage.getItem('user')).username).pipe(
      catchError(err => { // change : get element by teacher + speciality, not only by teacher
        return throwError('--' + err);
      })
    ).subscribe(res => {
      this.elementModules = res;
      this.elementModuleNames = res.map(e => e.titre);
    });
  }

  getStudents() {
    this.flag = 1;
    this.students = [];
    let selected = this.specialities.find(s => s.titre === this.selectedSpeciality).id;
    this.absenceService.getStudents(selected).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.students = res;
    });
  }

  addAbsences() {
    for (let student of this.students) {
      if (student.isAbscent) {
        let absence: any = {
          date: this.date,
          student: student,
          element: this.elementModules.find(e => e.titre === this.selectedModule),
          justified: false
        };
        this.absences.push(absence);
      }
    }

    this.absences.forEach(absence => {
      this.absenceService.saveAbsence(absence).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Les absences sont marquées avec succès !',
          showConfirmButton: false,
          timer: 2500
        });
      });
    });


    //this.messageService.add({severity:'success', summary:'Abscence marqué avec succés', detail:'Le : ' + this.date});
  }

  clear() {
    //this.messageService.clear();
  }


  marqueAbs(id: number) {
    let student = this.students.find(student => student.id === id);
    student!.isAbscent = true;
  }

  unMarqueAbs(id: number) {
    let student = this.students.find(student => student.id === id);
    student!.isAbscent = false;
  }


  goToMySpace() {
    this.router.navigate(['teacher-area']);
  }

  goToAttendance() {
    this.router.navigate(['teacher-absence']);
  }

  goToMyMarks() {
    //this.router.navigate(['student-marks']);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }


  markAsPresent(id: number) {

  }

  markAsAbsent(id: number) {

  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Speciality} from '../../models/main.model';
import Swal from 'sweetalert2';
import {SecurityService} from '../../services/security.service';
import {StudentsService} from '../../services/students.service';
import {AbsencesService} from '../../services/absences.service';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})
export class SingleStudentComponent implements OnInit {
  status = 'empty';
  code: any;
  photo: any;
  absences = [];
  firstName: any;
  lastName: any;
  birthDate: any;
  gender: any;

  constructor(private http: HttpClient, private studentsService: StudentsService,
              private itemService: DeliberationsService, private router: Router,
              private absencesService: AbsencesService,
              private securityService: SecurityService, route: ActivatedRoute) {
    this.code = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.showStudentPersonalInformation(this.code);
    this.showStudentAbsences(this.code);
  }

  goToManageSpecialties() {
    this.router.navigate(['manage-specialties']);
  }

  goToDeliberationsOfS1S1() {
    this.router.navigate(['deliberations-s1s1']);
  }

  goToDeliberationsOfS2S1() {
    this.router.navigate(['deliberations-s2s1']);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/']);
  }

  goToDeliberationsOfYear() {
    this.router.navigate(['deliberations-year']);
  }

  goToManageModules() {
    this.router.navigate(['manage-modules']);
  }

  goToManageStudents() {
    this.router.navigate(['manage-students']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  private showStudentPersonalInformation(code) {
    this.studentsService.getStudentByCode(code).pipe(
      catchError(err => {
          return throwError(err);
        }
      )).subscribe(res => {
        // @ts-ignore
        this.firstName = res.prenom;
        // @ts-ignore
        this.lastName = res.nom;
        // @ts-ignore
        this.birthDate = res.dateNaissance;
        // @ts-ignore
        this.gender = res.gender;
      }
    );
  }

  updateStudent(code: any) {
  }

  private showStudentAbsences(code: any) {
    this.absencesService.getStudentAbsencesByCode(code).pipe(
      catchError(err => {
          return throwError(err);
        }
      )).subscribe(res => {
        this.absences = res;
      }
    );
  }

  viewJustification(id) {
    this.absencesService.getAbsenceJustification(id).pipe(
      catchError(err => {
          return throwError(err);
        }
      )).subscribe(res => {
        Swal.fire({
          title: 'Justification',
          text: res.justification,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}

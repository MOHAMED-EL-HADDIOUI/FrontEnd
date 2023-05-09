import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module} from '../../models/main.model';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../services/security.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm !: FormGroup;
  submitting = false;
  CredentialsNeedsChange = false;
  departments: any;
  selectedDepartment: any;
  isTheUserTryingToLoginATeacher: any;

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required, Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required, Validators.minLength(4)
      ])
    });

  }

  ngOnInit() {
    if (this.securityService.isLoggedIn()) {
      this.redirectByAuth();
    }
    this.isTheUserTryingToLoginATeacher = false;
    this.departments = [];
    this.departments.push('Département : Mathématiques et Informatique');
    this.departments.push('Département : Génie Mécanique');
    this.departments.push('Département : Département : Génie Electrique');
    this.departments.push('Département : Génie Economie et Gestion');
    this.departments.push('Département : Sciences et Techniques Administratives et Ingénierie des Compétences');
  }

  login() {
    this.submitting = true;
    this.securityService.loginRequest(this.loginForm.value.email, this.loginForm.value.password)
      .then(canPass => {
        if (canPass) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Connecté avec succés !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {

            this.redirectByAuth();

          });
        }
      }).catch(any => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Email or password are incorrect !',
        showConfirmButton: false,
        timer: 2500
      });
    }).finally(() => {
      this.submitting = false;
    });
  }


  private redirectByAuth() {
    let userRoles = JSON.parse(localStorage.getItem('user')).roles;
    if (userRoles.some(e => e.roleName == 'ADMIN')) {
      this.router.navigate(['/menu']);
    } else if (userRoles.some(e => e.roleName == 'STUDENT')) {
      this.router.navigate(['/student-area']);
    } else if (userRoles.some(e => e.roleName == 'PROF')) {
      this.router.navigate(['/teacher-absence']);
    }
  }


  showDepartmentsSelect(event) {
    this.isTheUserTryingToLoginATeacher = event.target.value.toString().startsWith('BR456789@gmail.com') || event.target.value.toString().startsWith('BV253654@gmail.com');
  }
}

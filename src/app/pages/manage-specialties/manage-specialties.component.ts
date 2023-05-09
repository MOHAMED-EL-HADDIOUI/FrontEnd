import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Speciality} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-specialties',
  templateUrl: './manage-specialties.component.html',
  styleUrls: ['./manage-specialties.component.css']
})
export class ManageSpecialtiesComponent implements OnInit {
  status = 'empty';
  specialities: Speciality[] = [];
  title = '';
  code = '';

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {
  
  }

  ngOnInit() {
    this.refreshList();
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

  addItem() {
    if (this.title.toString().trim() !== '' && this.code.toString().trim() !== '') {
      const body = {
        titre: this.title,
        code: this.code
      };

      this.itemService.addSpeciality(body).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.hasOwnProperty('id') && res.id !== null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ajoutée avec succés !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.refreshList();
            this.title = '';
            this.code = '';
          });
        }
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Vous devez remplir tous les champs !',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
      });
    }
  }

  refreshList() {
    this.itemService.getSpecialities().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.specialities = res;
    });
  }

  deleteItem(id) {
    this.itemService.deleteSpeciality(id).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      if (res.status === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Supprimée avec succés !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.refreshList();
        });
      }
    });
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}

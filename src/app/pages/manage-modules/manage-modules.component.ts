import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Element, Module, Speciality} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-modules',
  templateUrl: './manage-modules.component.html',
  styleUrls: ['./manage-modules.component.css']
})
export class ManageModulesComponent implements OnInit {
  status = 'empty';
  email = '';
  password = '';
  modulesToAddElement: Module[] = [];
  modulesToListElements: Module[] = [];
  modulesToList: Module[] = [];
  elementsToList: Element[] = [];
  specialities: Speciality[] = [];
  codeToAddModule = '';
  titleToAddModule = '';
  semesterToListModules: any;
  specialityToListModules: any;
  semesterToAddModule: any;
  specialityToAddModule: any;
  bareme = '';
  ponderation = '';

  codeToAddElement = '';
  titleToAddElement = '';
  moduleToAddElement: any;
  semesterToAddElement: any;
  specialityToAddElement: any;
  semesterToListElements: any;
  specialityToListElements: any;
  moduleToListElements: any;

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.itemService.getSpecialities().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.specialities = res;
    });
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

  addModule() {
    if (this.titleToAddModule.toString().trim() !== '' && this.codeToAddModule.toString().trim() !== ''
      && this.specialityToAddModule !== undefined && this.semesterToAddModule !== undefined) {
      const body = {
        speciality: this.specialityToAddModule,
        semester: this.semesterToAddModule,
        titre: this.titleToAddModule,
        code: this.codeToAddModule
      };
      console.log(body);
      this.itemService.addModule(body).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.hasOwnProperty('id') && res.id !== null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ajouté avec succés !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.codeToAddModule = '';
            this.titleToAddModule = '';
            this.getModulesToList();
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

  getModulesToList() {
    if (this.specialityToListModules !== undefined && this.semesterToListModules !== undefined) {
      this.itemService.getModules(this.specialityToListModules, this.semesterToListModules).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.modulesToList = res;
      });
    }
  }


  getModulesToAddElement() {
    if (this.specialityToAddElement !== undefined && this.semesterToAddElement !== undefined) {
      this.itemService.getModules(this.specialityToAddElement, this.semesterToAddElement).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.modulesToAddElement = res;
      });
    }
  }

  deleteModule(id) {
    this.itemService.deleteModule(id).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      if (res.status === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Supprimé avec succés !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.getModulesToList();
        });
      }
    });
  }

  addElement() {
    if (this.titleToAddElement.toString().trim() !== '' && this.codeToAddElement.toString().trim() !== ''
      && this.bareme.toString().trim() !== '' && this.ponderation.toString().trim() !== ''
      && this.specialityToAddElement !== undefined && this.semesterToAddElement !== undefined
      && this.moduleToAddElement !== undefined
    ) {
      const body = {
        speciality: this.specialityToAddElement,
        semester: this.semesterToAddElement,
        module: this.moduleToAddElement,
        titre: this.titleToAddElement,
        code: this.codeToAddElement,
        bareme: this.bareme,
        ponderation: this.ponderation
      };
      console.log(body);
      this.itemService.addElement(body).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.hasOwnProperty('id') && res.id !== null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ajouté avec succés !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.codeToAddElement = '';
            this.titleToAddElement = '';
            this.bareme = '';
            this.ponderation = '';
            this.getElementsToList();
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

  getElementsToList() {
    if (this.specialityToListElements !== undefined && this.semesterToListElements !== undefined
      && this.modulesToListElements !== undefined) {
      this.itemService.getElements(this.moduleToListElements).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.elementsToList = res;
      });
    }
  }

  deleteElement(id: Number) {
    this.itemService.deleteElement(id).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      if (res.status === 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Supprimé avec succés !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.getElementsToList();
        });
      }
    });
  }

  getModulesToListElements() {
    if (this.specialityToListElements !== undefined && this.semesterToListElements !== undefined) {
      this.itemService.getModules(this.specialityToListElements, this.semesterToListElements).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.modulesToListElements = res;
      });
    }
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Speciality,Semestre,Prof} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {
  status = 'empty';
  areElementsShown: boolean;
  private token: string;
  private xlsFile: any;
  specialities: Speciality[] = [];
  teachers: Prof[] = [];
  semestres: Semestre[] = [];
  Cin = '';
  Prenom = '';
  Nom = '';
  specialityToListStudents: any;
  semestreToToListStudents: any;
  specialityToImportStudents: any;
  ImportTeachers: any;
  ListTeachers:any;
  semestreToImportStudents: any;
  specialityToAddStudent: any;
  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.areElementsShown = true;
    this.itemService.getSpecialities().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.specialities = res;
    });
    this.itemService.getSemestres().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.semestres = res;
    });
  }


  handle(fileUploadEvent) {
    Swal.fire({
    position: 'center',
    icon: 'info',
    title: 'Loading file...',
    showConfirmButton: false
    });
    
    const uploadedFile = fileUploadEvent.target.files[0];    
    try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile);

    fileReader.onload = () => {
    this.xlsFile = fileReader.result;
    const data = {
        "data": this.xlsFile
      };
      this.itemService.postToImportTeachers(data)
        .subscribe(importedTeachers => {
          this.xlsFile = importedTeachers;
          Swal.close();
        }, err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to import teachers',
            showConfirmButton: false,
            timer: 3500
          });
        });
    };
    } catch (err) {
    Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Failed to read file',
    showConfirmButton: false,
    timer: 3500
    });
    }
    }

  openFile() {
    document.getElementById('xlsFileToBeUploaded').click();
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

  goToS1() {
    this.router.navigate(['deliberations-s1s1']);
  }

  goToS2() {
    this.router.navigate(['deliberations-s1s2']);
  }

  addItem() {
    if (this.Cin.toString().trim() !== '' && this.Nom.toString().trim() !== ''&& this.Prenom.toString().trim() !== '') {
      const body = {
        cin: this.Cin,
        nom: this.Nom,
        prenom: this.Prenom
      };

      this.itemService.addTeacher(body).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.hasOwnProperty('cin') && res.cin !== null) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ajoutée avec succés !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.refreshList();
            this.Nom = '';
            this.Cin='';
            this.Prenom = '';
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
    this.itemService.getTeachers(this.ListTeachers).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.teachers = res;
    });
  }

  deleteItem(id: any) {
    console.log("supprimer teacher")
    this.itemService.deleteTeacher(id).pipe(
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
          this.getTeachers();
          console.log(id)
        });
      }
    });
  }

  UpdateItem(numero: number) {
  }

  getTeachers() {

    this.itemService.getTeachers(this.ListTeachers).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.teachers = res;
    });
  console.log(this.teachers)
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}

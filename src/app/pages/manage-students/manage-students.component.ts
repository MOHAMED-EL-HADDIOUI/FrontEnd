import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module,CollegeYear, Speciality,Semestre, Student} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  status = 'empty';
  body: Body;
  areElementsShown: boolean;
  private token: string;
  private xlsFile: any;
  uploadedFile;
  fileReader;
  specialities: Speciality[] = [];
  semestres: Semestre[] = [];
  collegeYears: CollegeYear[]=[];
  number = '';
  data;
  nom = '';
  prenom = '';
  editStudent:Student;
  birth = '';
  size='';
  gmail='';
  tel='';
  specialityToListStudents: any;
  semestreToToListStudents: any;
  collegeYearToToListStudents: any;

  specialityToImportStudents: any;
  semestreToImportStudents: any;
  collegeYearToImportStudents: any;

  specialityToAddStudent: any;
  semestreToAddStudent:any;
  collegeYearToAddStudent:any;

  specialityToUpdateStudent: any;
  semestreToUpdateStudent:any;
  collegeYearToUpdateStudent:any;

  specialitystudent:Speciality;
  semestrestudent:Semestre;
  collegeYearstudent:CollegeYear;
  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.areElementsShown = true;
    this.body = {students :[]};
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
    this.itemService.getCollegeYears().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.collegeYears = res;
    });
  }


  handle(fileUploadEvent) {
    Swal.fire({
    position: 'center',
    icon: 'info',
    title: 'Loading file...',
    showConfirmButton: false
    });
    this.uploadedFile = fileUploadEvent.target.files[0];    
    try {
     
    this.fileReader = new FileReader();
    this.fileReader.readAsDataURL(this.uploadedFile);

    this.fileReader.onload = () => {
    this.xlsFile = this.fileReader.result;
    this.data = {
        "data": this.xlsFile
      };
      this.itemService.postToImportStudents(this.specialityToImportStudents,this.semestreToImportStudents,this.collegeYearToImportStudents,this.data)
        .subscribe(importedStudents => {
          this.xlsFile = importedStudents;
          Swal.close();
        }, err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to import students',
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
    if (this.number.toString().trim() !== '' && this.nom.toString().trim() !== ''&& this.prenom.toString().trim() !== ''&& this.prenom.toString().trim() !== ''&& this.birth.toString().trim() !== ''&& this.size.toString().trim() !== ''&& this.gmail.toString().trim() !== ''&& this.tel.toString().trim() !== ''&& this.specialityToAddStudent.toString().trim() !== ''&& this.collegeYearToAddStudent.toString().trim() !== ''&& this.semestreToAddStudent.toString().trim() !== '') {
      console.log(this.specialityToAddStudent)
      console.log(this.semestreToAddStudent)
      console.log(this.collegeYearToAddStudent)
      this.itemService.getSpecialitie(this.specialityToAddStudent).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.specialitystudent = res;
      });
      this.itemService.getSemestre(this.semestreToAddStudent).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.semestrestudent = res;
      });
      this.itemService.getCollegeYear(this.collegeYearToAddStudent).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.collegeYearstudent = res;
      });
      const body = {
        numero:this.number,
        nom:this.nom,
        prenom: this.prenom,
        gender: this.size,
        dateNaissance: this.birth,
        tel:this.tel,
        gmail:this.gmail,
        speciality:this.specialitystudent,
        semester:this.semestrestudent,
        collegeYear:this.collegeYearstudent
      };
      console.log(body)
      this.itemService.addStudent(body).pipe(
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
            this.number = '';
            this.data;
            this.nom = '';
            this.prenom = '';
            this.birth = '';
            this.size='';
            this.gmail='';
            this.tel='';
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
    this.itemService.getStudents(this.specialityToAddStudent).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.body = {students :res};
    });
  }

  deleteItem(id: any) {
    this.itemService.deleteStudent(id).pipe(
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
          this.getStudents();
        });
      }
    });
  }

  

  getStudents() {
      this.itemService.getStudents(this.specialityToListStudents).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.body = {students :res};
      });
    
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  public onOpenModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editStudent=student
      console.log("onOpenModal : editStudent")
      console.log(this.editStudent)
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    container.appendChild(button);
    button.click();
    console.log(student.semestre)
    console.log(student.speciality)
    this.specialityToUpdateStudent=1
    this.semestreToUpdateStudent=1
    console.log("this.specialityToImportStudents")
    console.log(this.specialityToUpdateStudent)
    console.log("this.semestreToUpdateStudent")
    console.log(this.semestreToUpdateStudent)

  }

  
  public onUpdateStudent(){
    console.log("this.specialityToImportStudents")
    console.log(this.specialityToUpdateStudent)
    console.log("this.semestreToUpdateStudent")
    console.log(this.semestreToUpdateStudent)
    this.itemService.getSpecialitie(this.specialityToUpdateStudent).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.specialitystudent = res;
    });
    this.itemService.getSemestre(this.semestreToUpdateStudent).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.semestrestudent = res;
    });
    this.editStudent.semestre=this.semestrestudent
    this.editStudent.speciality=this.specialitystudent
    console.log("-------semestre----------")
    console.log(this.semestrestudent)
    console.log("-------speciality----------")
    console.log(this.specialitystudent)
    console.log("student =>  editStudent ")
    console.log(this.editStudent)
    const body = {
      id:this.editStudent.id,
      numero:this.editStudent.numero,
      nom:this.editStudent.nom,
      prenom: this.editStudent.prenom,
      gender: this.editStudent.gender,
      dateNaissance: this.editStudent.dateNaissance,
      tel:this.editStudent.tel,
      gmail:this.editStudent.gmail,
      speciality:this.specialitystudent,
      semester:this.semestrestudent
    };
    console.log("body")
    console.log(body)
    this.itemService.updateStudent(body).pipe
    (catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => 
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ajoutée avec succés !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.getStudents();
        });
  }
  )
}
  
  public refreshListTemp() {
    this.itemService.getStudents(this.specialityToListStudents).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.body = {students :res};
    });
  }

  
}

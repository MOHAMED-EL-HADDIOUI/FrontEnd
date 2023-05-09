import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Student} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-deliberations-s1s2',
  templateUrl: './deliberations-s1s2.component.html',
  styleUrls: ['./deliberations-s1s2.component.css']
})
export class DeliberationsS1s2Component implements OnInit {
  status = 'empty';
  body: Body;
  firstBody: Body;
  toBeSentBody: Body;
  areElementsShown: boolean;
  private token: string;
  private xlsFile: any;
  canShowTable: boolean;

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.areElementsShown = true;
    this.body = {students: []};
    this.firstBody = {students: []};
    this.toBeSentBody = {students: []};
    this.canShowTable = false;

    if (this.areAllStudentsValidated(JSON.parse(localStorage.getItem('S1S1')))) {
      localStorage.setItem('S1S2', JSON.stringify({students: []}));
    }

    if (localStorage.getItem('S1S2') !== null) {
      this.body = JSON.parse(localStorage.getItem('S1S2'));
      if (localStorage.getItem('S1S1') !== null) {
        const temporaryBody = JSON.parse(localStorage.getItem('S1S1'));
        for (const student of temporaryBody.students) {
          if (this.canShowStudent(student)) {
            this.firstBody.students.push(student);
          }
        }
        this.performCalculations();
      }
    }
  }

  parseFloat(noteModule: any) {
    return parseFloat(noteModule);
  }

  performCalculations() {
    console.log(this.firstBody.students.length + ',' + this.body.students.length);
    for (const item of this.body.students) {
      for (const module of item.modules) {
        for (const element of module.elements) {
          if (element.note > 20) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: '> 20 !!!',
              showConfirmButton: false,
              timer: 2500
            });
            element.note = 20;
          } else if (element.note < 0) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: '< 0 !!!',
              showConfirmButton: false,
              timer: 2500
            });
            element.note = 0;
          }
        }
      }
    }
    for (const item of this.body.students) {
      item.noteSemestre = 0;
      for (const module of item.modules) {
        module.note = 0;
        for (const element of module.elements) {
          element.note = Number(this.fixMark(element.note));
          module.note += element.ponderation * element.note;
        }
        module.note = Number(this.fixMark(module.note));
        const afterCatchUp = module.note;
        const firstStudent = this.firstBody.students[this.body.students.indexOf(item)];
        const firstModuleIndex = item.modules.indexOf(module);
        if (firstStudent.modules[firstModuleIndex].resultat === 'RAT') {
          module.note = Math.min(12, Math.max(firstStudent.modules[firstModuleIndex].note, afterCatchUp));
          if (this.isThisModuleValidated(module)) {
            module.resultat = 'VAR';
          } else {
            module.resultat = 'NV';
          }
        } else {
          module.resultat = firstStudent.modules[firstModuleIndex].resultat;
        }
        item.noteSemestre += module.note;
      }
      item.noteSemestre /= item.modules.length;
      item.noteSemestre = Number(this.fixMark(item.noteSemestre));

      this.canShowTable = true;
      Swal.close();
    }

    localStorage.setItem('S1S2', JSON.stringify(this.body));

    this.toBeSentBody = {students: []};
    for (const student of this.body.students) {
      this.toBeSentBody.students.push(student);
    }
  }

  oldFixMark(number) {
    const multiplier = Math.pow(10, 3), adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
  }

  fixMark(number) {
    return number.toFixed(3);
  }

  toFixedNoRounding(number) {
    const result = number.toFixed(3);
    return result <= number ? result : (result - Math.pow(0.1, 3)).toFixed(3);
  }

  toggleShowElements() {
    this.areElementsShown = !this.areElementsShown;
  }

  exportAsXls() {
    console.log(this.body);
    const main = {
      students: this.toBeSentBody.students,
      teachers:[]
    };

    this.itemService.exportS1s2(main).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      if (res.status === 1) {
        window.open('http://localhost:8080/' + res.name, '_blank');
      }
    });
  }

  closeCurrentSession() {
    Swal.fire({
      title: 'Voulez-vous vraiment cloturer la session ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Effectué avec succès',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  handle(event) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Veuillez patienter pendant le chargement du fichier !',
      showConfirmButton: false
    });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.xlsFile = reader.result;
      const data = {
        data: this.xlsFile
      };
      this.itemService.postToImportS1s2(data).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.status === 1) {
          this.body = res.data;
          this.canShowTable = true;

          this.firstBody = {students: []};
          const temporaryBody = JSON.parse(localStorage.getItem('S1S1'));
          for (const student of temporaryBody.students) {
            if (this.canShowStudent(student)) {
              this.firstBody.students.push(student);
            }
          }

          this.performCalculations();
        } else if (res.status === 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 3500
          });
        }
      });
    };
  }

  openFile() {
    document.getElementById('xlsFileToBeUploaded').click();
  }

  goToSingleStudent(line: Student) {
    this.router.navigate(['single-student', line.numero]);
  }

  isThisModuleValidated(module: Module) {
    for (const element of module.elements) {
      if (element.note < 6) {
        return false;
      }
    }
    return module.note >= 12;
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

  canShowStudent(line: Student) {
    for (const module of line.modules) {
      if (module.resultat === 'RAT') {
        return true;
      }
    }
    return false;
  }

  areAllStudentsValidated(body: Body) {
    for (const student of body.students) {
      for (const module of student.modules) {
        if (module.resultat === 'RAT') {
          return false;
        }
      }
    }
    return true;
  }

  canShowStudentFromHtml(line: Student) {
    return true;
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}

import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Student} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-deliberations-year',
  templateUrl: './deliberations-year.component.html',
  styleUrls: ['./deliberations-year.component.css']
})
export class DeliberationsYearComponent implements OnInit, AfterViewInit {
  status = 'empty';
  secondBody: Body;
  firstBody: Body;
  secondBodyOfSession2: Body;
  firstBodyOfSession2: Body;
  toBeSentBody: Body;
  areElementsShown: boolean;
  private token: string;
  private xlsFile: any;
  canShowTable: boolean;
  yearNotes: Number[] = [];
  semester1Notes: Number[] = [];
  semester2Notes: Number[] = [];

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private ref: ChangeDetectorRef, private securityService: SecurityService) {


  }

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  ngOnInit() {
    if (localStorage.getItem('STUDENTS') !== null) {
      const students = JSON.parse(localStorage.getItem('STUDENTS')).students;
      for (const student of students) {
        this.yearNotes.push(Number());
        this.semester1Notes.push(Number());
        this.semester2Notes.push(Number());
      }
    }
    this.areElementsShown = true;
    this.secondBody = {students: []};
    this.firstBody = {students: []};
    this.secondBodyOfSession2 = {students: [],};
    this.firstBodyOfSession2 = {students: []};
    this.toBeSentBody = {students: []};
    this.canShowTable = false;

    if (localStorage.getItem('S1S1') !== null) {
      this.firstBody = JSON.parse(localStorage.getItem('S1S1'));
      if (localStorage.getItem('S2S1') !== null) {
        this.secondBody = JSON.parse(localStorage.getItem('S2S1'));
        if (localStorage.getItem('S1S2') !== null) {
          this.firstBodyOfSession2 = JSON.parse(localStorage.getItem('S1S2'));
          if (localStorage.getItem('S2S2') !== null) {
            this.secondBodyOfSession2 = JSON.parse(localStorage.getItem('S2S2'));
            this.performCalculationsOfYear();
          }
        }
      }
    }
  }

  parseFloat(noteModule: any) {
    return parseFloat(noteModule);
  }

  performCalculationsOfS1() {
    for (const item of this.firstBody.students) {
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
    for (const item of this.firstBody.students) {
      item.noteSemestre = 0;
      for (const module of item.modules) {
        module.note = 0;
        for (const element of module.elements) {
          element.note = Number(this.fixMark(element.note));
          module.note += element.ponderation * element.note;
        }
        module.note = Number(this.fixMark(module.note));
        item.noteSemestre += module.note;

        if (module.note >= 12) {
          module.resultat = 'V';
        } else {
          module.resultat = 'RAT';
        }
      }
      item.noteSemestre /= item.modules.length;
      item.noteSemestre = Number(this.fixMark(item.noteSemestre));
    }
  }

  performCalculationsOfS2() {
    for (const item of this.secondBody.students) {
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
    for (const item of this.secondBody.students) {
      item.noteSemestre = 0;
      for (const module of item.modules) {
        module.note = 0;
        for (const element of module.elements) {
          element.note = Number(this.fixMark(element.note));
          module.note += element.ponderation * element.note;
        }
        module.note = Number(this.fixMark(module.note));
        item.noteSemestre += module.note;

        if (module.note >= 12) {
          module.resultat = 'V';
        } else {
          module.resultat = 'RAT';
        }
      }
      item.noteSemestre /= item.modules.length;
      item.noteSemestre = Number(this.fixMark(item.noteSemestre));
    }
  }

  performCalculationsOfYear() {
    let index = 0;
    for (const item of this.firstBody.students) {
      let semester1 = item.noteSemestre;
      const studentOfSemester2 = this.secondBody.students[index];
      let semester2 = studentOfSemester2.noteSemestre;
      if (this.hasThisStudentAnyCatchUp(item)) {
        semester1 = this.findStudentByNumber(this.firstBodyOfSession2, item.numero).noteSemestre;
      }
      if (this.hasThisStudentAnyCatchUp(studentOfSemester2)) {
        semester2 = this.findStudentByNumber(this.secondBodyOfSession2, studentOfSemester2.numero).noteSemestre;
      }
      this.semester1Notes[index] = semester1;
      this.semester2Notes[index] = semester2;
      this.yearNotes[index] = this.fixMark((this.semester1Notes[index].valueOf() + this.semester2Notes[index].valueOf()) / 2);
      console.log((this.semester1Notes[index].valueOf() + this.semester2Notes[index].valueOf()) / 2);
      index += 1;
    }
    this.canShowTable = true;
  }

  getRankOf(mark, array) {
    const newArray = [];
    for (const item of array) {
      newArray.push(item.valueOf());
    }
    return newArray
      .sort(function (a, b) {
        return b - a;
      })
      .indexOf(mark) + 1;
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
    console.log(this.secondBody);
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

  openFile() {
    document.getElementById('xlsFileToBeUploaded').click();
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

  canShowStudentFromHtml(line: Student) {
    return true;
  }

  getResultOfS1(studentIndex) {
    let validated = 0;
    for (const module of this.firstBody.students[studentIndex].modules) {
      if (module.resultat === 'V') {
        validated += 1;
      }
    }
    for (const module of this.secondBody.students[studentIndex].modules) {
      if (module.resultat === 'V') {
        validated += 1;
      }
    }
    return validated === 15 ? 'ADM' : 'NV';
  }

  getResultOfS2(studentIndex) {
    let validated = 0;
    for (const module of this.firstBody.students[studentIndex].modules) {
      if (module.resultat === 'V') {
        validated += 1;
      }
    }
    for (const module of this.secondBody.students[studentIndex].modules) {
      if (module.resultat === 'V') {
        validated += 1;
      }
    }
    if (validated === 15) {
      return 'ADM';
    } else if (validated >= 12) {
      for (const module of this.firstBody.students[studentIndex].modules) {
        if (module.note < 8) {
          return 'AJ';
        }
      }
      for (const module of this.secondBody.students[studentIndex].modules) {
        if (module.note < 8) {
          return 'AJ';
        }
      }
      return 'ADM';
    } else {
      return 'AJ';
    }
  }

  getResultOfYear(studentIndex) {
    let validated = 0;
    for (let module of this.firstBody.students[studentIndex].modules) {
      const item = this.firstBody.students[studentIndex];
      const moduleIndex = item.modules.indexOf(module);
      if (this.hasThisStudentAnyCatchUp(item)) {
        module = this.findStudentByNumber(this.firstBodyOfSession2, item.numero).modules[moduleIndex];
      }
      if (module.resultat === 'V' || module.resultat === 'VAR') {
        validated += 1;
      }
    }
    for (let module of this.secondBody.students[studentIndex].modules) {
      const studentOfSemester2 = this.secondBody.students[studentIndex];
      const moduleIndex = studentOfSemester2.modules.indexOf(module);
      if (this.hasThisStudentAnyCatchUp(studentOfSemester2)) {
        module = this.findStudentByNumber(this.secondBodyOfSession2, studentOfSemester2.numero).modules[moduleIndex];
      }
      if (module.resultat === 'V' || module.resultat === 'VAR') {
        validated += 1;
      }
    }
    if (validated === 15) {
      return 'ADM';
    } else if (validated >= 12) {
      for (const module of this.firstBody.students[studentIndex].modules) {
        if (module.note < 8) {
          return 'AJ';
        }
      }
      for (const module of this.secondBody.students[studentIndex].modules) {
        if (module.note < 8) {
          return 'AJ';
        }
      }
      return 'ADM';
    } else {
      return 'AJ';
    }
  }

  hasThisStudentAnyCatchUp(student: Student) {
    for (const module of student.modules) {
      if (module.resultat === 'RAT') {
        return true;
      }
    }
    return false;
  }

  findStudentByNumber(body: Body, numero: number) {
    for (const student of body.students) {
      if (student.numero === numero) {
        return student;
      }
    }
    return null;
  }

  goToSingleStudent(line: Student) {
    this.router.navigate(['single-student', line.numero]);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}

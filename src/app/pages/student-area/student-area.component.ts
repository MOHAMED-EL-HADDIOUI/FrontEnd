import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Student} from '../../models/main.model';
import Swal from 'sweetalert2';
import {Message, MessageService} from 'primeng/api';
import {SecurityService} from '../../services/security.service';

@Component({
  selector: 'app-student-area',
  templateUrl: './student-area.component.html',
  styleUrls: ['./student-area.component.scss']
})
export class StudentAreaComponent implements OnInit {

  student: Student;
  msgs: Message[];

  constructor(private http: HttpClient, private router: Router, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.msgs = [];
    //Add condition : if student has 3 or more unjustified absences
    this.msgs.push({severity:'warn', summary:'Warning', detail:'Vous avez +3 absences injustifiées'});
    //Add condition : if marks are available
    this.msgs.push({severity:'info', summary:'Info', detail:'Les notes sont disponibles'});
  }

  hide() {
      this.msgs = [];
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

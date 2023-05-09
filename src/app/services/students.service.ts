import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Body} from '../models/main.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private token: string;
  headers: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = {'Authorization': this.token};
  }



  getAllStudents(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/students/' + speciality);
  }


  getStudentByCode(code: any) {
    return this.http.get(environment.api + '/students/byCode/' + code);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Body,Student} from '../models/main.model';

@Injectable({
  providedIn: 'root'
})
export class DeliberationsService {
  private token: string;
  headers: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = {'Authorization': this.token};
  }

  public exportS1s1(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s1s1', item);
  }

  public postToImportS1s1(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s1s1', item);
  }

  public postToImportStudents(speciality,semestre,collegeYear, item): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-students/' + speciality+'/'+semestre+'/'+collegeYear+'/', item);
  }
  public postToImportTeachers(item): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-teachers', item);
  }

  public postToImportTest(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/test-import', item);
  }

  public exportS1s2(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s1s2', item);
  }

  public postToImportS1s2(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s1s2', item);
  }

  public exportS2s1(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s2s1', item);
  }

  public postToImportS2s1(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s2s1', item);
  }

  public exportS2s2(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s2s2', item);
  }

  public postToImportS2s2(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s2s2', item);
  }

  public addSpeciality(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/specialities', item);
  }
  public addStudent(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/students/add', item);
  }
  public addTeacher(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/teachers/add', item);
  }

  public deleteSpeciality(id: any): any {
    return this.http.delete<any>(environment.apiEndpoint + '/specialities/' + id);
  }

  public deleteStudent(id: any): any {
    return this.http.delete<any>(environment.apiEndpoint + '/students/delete/' + id);
  }
  public deleteTeacher(id: any): any {
    return this.http.delete<any>(environment.apiEndpoint + '/teachers/delete/' + id);
  }

  getSpecialities(): any {
    return this.http.get<any>(environment.apiEndpoint + '/specialities');
  }
  getSpecialitie(id: any): any {
    return this.http.get<any>(environment.apiEndpoint + '/specialities/'+id);
  }
  getSemestres(): any {
    return this.http.get<any>(environment.apiEndpoint + '/semesters');
  }
  getCollegeYears(): any {
    return this.http.get<any>(environment.apiEndpoint + '/collegeYears');
  }
  getSemestre(id: any): any {
    return this.http.get<any>(environment.apiEndpoint + '/semesters/'+id);
  }
  getCollegeYear(id: any): any {
    return this.http.get<any>(environment.apiEndpoint + '/collegeYears/'+id);
  }

  getModules(speciality, semester) {
    return this.http.get<any>(environment.apiEndpoint + '/modules/' + speciality + '/' + semester);
  }

  deleteModule(id) {
    return this.http.delete<any>(environment.apiEndpoint + '/modules/' + id);
  }

  getStudents(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/students/' + speciality);
  }

  getTeachers(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/teachers?'+speciality);
  }

  addModule(item: any) {
    return this.http.post<any>(environment.apiEndpoint + '/modules', item);
  }

  addElement(item: any) {
    return this.http.post<any>(environment.apiEndpoint + '/elements', item);
  }
  updateStudent(item: any): Observable<Student> {
    return this.http.put<any>(environment.apiEndpoint + '/students/update', item);
  }
  deleteElement(id: Number) {
    return this.http.delete<any>(environment.apiEndpoint + '/elements/' + id);
  }

  getElements(module) {
    return this.http.get<any>(environment.apiEndpoint + '/elements/ofModule/' + module);
  }
}

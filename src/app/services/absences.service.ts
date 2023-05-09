import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AbsencesService {


  constructor(private http: HttpClient) {
  }

  getElementModules(id: string) {
    return this.http.get<any>(environment.api + '/teachers/' + id + '/modules');
  }

  getStudents(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/' + speciality);
  }

  saveAbsence(absence: any) {
    return this.http.post<any>(environment.api + '/absences', absence);
  }

  getStudentAbsences(id: any) {
    return this.http.get<any>(environment.api + '/absencesByStudent/' + id);
  }

  getStudentAbsencesByCode(id: any) {
    return this.http.get<any>(environment.api + '/absencesByStudentCode/' + id);
  }

  addJustification(absence: any, justification: any) {
    return this.http.post<any>(environment.api + '/absences/' + absence.id + '/justifications', justification);
  }

  getAbsenceJustification(id) {
    return this.http.get<any>(environment.api + '/absences/' + id + '/justifications');
  }
}




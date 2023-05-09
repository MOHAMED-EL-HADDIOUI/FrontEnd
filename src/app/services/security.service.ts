import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/main.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userSubject: Subject<User | undefined> = new Subject();
  user?: User;
  refresh_token = '';
  access_token = '';

  constructor(private http: HttpClient) {
    this.access_token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') + '' : '';
    this.refresh_token = localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') + '' : '';
  }


  public loginRequest(email: string, password: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(environment.api + '/login', {
        email,
        password
      }).subscribe({
        next: res => {
          this.access_token = res.access_token;
          this.refresh_token = res.refresh_token;
          localStorage.setItem('access_token', this.access_token);
          localStorage.setItem('refresh_token', this.refresh_token);
          this.getUser();
          resolve(true);
        },
        error: err => {
          this.access_token = this.refresh_token = '';
          reject(false);
        }
      });
    });
  }


  public getUser() {
    if (this.access_token.length == 0) {
      return;
    }
    const authorizationHeader = 'Bearer ' + this.access_token;
    this.http.get<User>(environment.api + '/api/profile', {
      headers: {
        'Authorization': authorizationHeader
      }
    }).subscribe({
      next: res => {

        this.user = res;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.userSubject.next(res);
      },
      error: err => {
        console.error(err.message);
        this.refreshToken();
      }
    });
  }

  public printUser() {
    console.log(this.user);
  }

  public refreshToken() {
    const authorizationHeader = 'Bearer ' + this.refresh_token;
    return this.http.get<any>(environment.api + '/api/refresh-token', {
      headers: {
        'Authorization': authorizationHeader
      }
    });
  }

  public logout() {
    this.access_token = this.refresh_token = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.user = undefined;
    localStorage.removeItem('user');
    this.userSubject.next(undefined);
  }


  public isLoggedIn() {
    return this.access_token.length > 0
  }

}

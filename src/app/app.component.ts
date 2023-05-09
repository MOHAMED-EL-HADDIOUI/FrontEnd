import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from './services/security.service';
import { User } from './models/main.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit, OnDestroy {

  secSubscription : Subscription;
  user?: User;
  
  constructor(private securityService:SecurityService){
    this.secSubscription = securityService.userSubject.subscribe({
      next: user=>{
        this.user = user;
      },
      error: err=>{
        this.user = undefined;
        console.log(err);
      }
    })
    }

  ngOnInit(): void {
    this.securityService.getUser();
  }


  ngOnDestroy(): void {
    this.secSubscription?.unsubscribe();
    console.log("Unsubscription done");
  }

}



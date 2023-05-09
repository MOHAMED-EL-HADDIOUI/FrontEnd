import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.scss']
})
export class ChangeCredentialsComponent implements OnInit {

  loginForm !: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

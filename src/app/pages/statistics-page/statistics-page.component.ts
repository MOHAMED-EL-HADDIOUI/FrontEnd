import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module} from '../../models/main.model';
import Swal from 'sweetalert2';
import {SecurityService} from '../../services/security.service';
import Chart from 'chart.js';

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {
  status = 'empty';
  public chart: any;
  public chart2: any;
  public chart3: any;
  email = '';
  password = '';
  speciality: any;
  year: any;
  module: any;
  element: any;
  specialities = [];
  years = [];

  modules = [];

  elements = [];

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.specialities.push('II-BDCC');
    this.years.push('Première année');
    this.modules.push('Module 1');
    this.elements.push('Element 1');
    this.createChart();

    this.year = this.years[0];
    this.speciality = this.specialities[0];
    this.module = this.modules[0];
    this.element = this.elements[0];
    this.speciality = this.specialities[0];
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

  createChart() {

    this.chart = new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: [
          'Masculin',
          'Féminin'
        ],
        datasets: [{
          label: 'Dataset 1',
          data: [20, 21],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
          ]
        }]
      },
      options: {
        aspectRatio: 1.5
      }

    });

    this.chart2 = new Chart('MyChart2', {
      type: 'pie',

      data: {
        labels: [
          'Admis',
          'Ajourné',
        ],
        datasets: [{
          label: 'Dataset 2',
          data: [40, 1],
          backgroundColor: [
            'rgb(54,235,132)',
            'rgb(255,99,99)'
          ]
        }]
      },
      options: {
        aspectRatio: 1.5
      }

    });

    this.chart3 = new Chart('MyChart3', {
      type: 'pie',

      data: {
        labels: [
          'Présent',
          'Absent',
        ],
        datasets: [{
          label: 'Dataset 3',
          data: [80, 10],
          backgroundColor: [
            'rgb(54,235,132)',
            'rgb(255,99,99)'
          ]
        }]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}

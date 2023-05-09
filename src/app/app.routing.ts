import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {DeliberationsS1s1Component} from './pages/deliberations-s1s1/deliberations-s1s1.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ManageSpecialtiesComponent} from './pages/manage-specialties/manage-specialties.component';
import {DeliberationsS1s2Component} from './pages/deliberations-s1s2/deliberations-s1s2.component';
import {DeliberationsS2s1Component} from './pages/deliberations-s2s1/deliberations-s2s1.component';
import {DeliberationsYearComponent} from './pages/deliberations-year/deliberations-year.component';
import {ManageStudentsComponent} from './pages/manage-students/manage-students.component';
import {ManageModulesComponent} from './pages/manage-modules/manage-modules.component';
import {DeliberationsS2s2Component} from './pages/deliberations-s2s2/deliberations-s2s2.component';
import {MenuPageComponent} from './pages/menu-page/menu-page.component';
import {StudentAreaComponent} from './pages/student-area/student-area.component';
import { StudentAbsenceComponent } from "./pages/student-absence/student-absence.component";
import { StudentMarksComponent } from "./pages/student-marks/student-marks.component";
import { ChangeCredentialsComponent } from "./pages/change-credentials/change-credentials.component";
import { AdminGuard } from "./guards/admin.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { StudentGuard } from "./guards/student.guard";
import { GuestGuard } from "./guards/guest.guard";
import { TeacherAbsenceComponent } from "./pages/teacher-absence/teacher-absence.component";
import { TeacherAreaComponent } from "./pages/teacher-area/teacher-area.component";
import {StatisticsPageComponent} from './pages/statistics-page/statistics-page.component';
import {ManageTeachersComponent} from './pages/manage-teachers/manage-teachers.component';
import {SingleStudentComponent} from './pages/single-student/single-student.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
  },
  {
    path: 'deliberations-s1s1',
    component: DeliberationsS1s1Component,
    canActivate:[AdminGuard]
  },
  {
    path: 'menu',
    component: MenuPageComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'deliberations-s2s1',
    component: DeliberationsS2s1Component,
    canActivate:[AdminGuard]
  },
  {
    path: 'deliberations-s2s2',
    component: DeliberationsS2s2Component,
    canActivate:[AdminGuard]
  },
  {
    path: 'deliberations-year',
    component: DeliberationsYearComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'deliberations-s1s2',
    component: DeliberationsS1s2Component,
    canActivate:[AdminGuard]
  },
  {
    path: 'deliberations-s1s2',
    component: DeliberationsS1s2Component,
    canActivate:[AdminGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'manage-specialties',
    component: ManageSpecialtiesComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'manage-students',
    component: ManageStudentsComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'manage-modules',
    component: ManageModulesComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'single-student/:id',
    component: SingleStudentComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'student-area',
    component: StudentAreaComponent,
    canActivate:[StudentGuard]
  },
  {
    path: 'student-absence',
    component: StudentAbsenceComponent,
    canActivate:[StudentGuard]
  },
  {
    path: 'student-marks',
    component: StudentMarksComponent,
    canActivate:[StudentGuard]
  },
  {
    path: 'change-credentials',
    component: ChangeCredentialsComponent,
    canActivate:[StudentGuard,TeacherGuard]
  },
  {
    path: 'teacher-area',
    component: TeacherAreaComponent,
    canActivate:[TeacherGuard]
  },
  {
    path: 'teacher-absence',
    component: TeacherAbsenceComponent,
    canActivate:[TeacherGuard]
  },
  {
    path: 'admin-statistics',
    component: StatisticsPageComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'manage-teachers',
    component: ManageTeachersComponent,
    canActivate:[AdminGuard]
  },

  {
    path: '**',
    redirectTo:'',  // has to be redirectedTo pageNotFound
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
})
export class AppRoutingModule {
}

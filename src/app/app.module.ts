import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {SplitterModule} from "primeng/splitter";
import {DeliberationsS1s1Component} from './pages/deliberations-s1s1/deliberations-s1s1.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ManageSpecialtiesComponent} from './pages/manage-specialties/manage-specialties.component';
import {DeliberationsS1s2Component} from './pages/deliberations-s1s2/deliberations-s1s2.component';
import {DeliberationsS2s1Component} from './pages/deliberations-s2s1/deliberations-s2s1.component';
import {DeliberationsS2s2Component} from './pages/deliberations-s2s2/deliberations-s2s2.component';
import {DeliberationsYearComponent} from './pages/deliberations-year/deliberations-year.component';
import {ManageStudentsComponent} from './pages/manage-students/manage-students.component';
import {ManageModulesComponent} from './pages/manage-modules/manage-modules.component';
import {MenuPageComponent} from './pages/menu-page/menu-page.component';
import {StudentAreaComponent} from './pages/student-area/student-area.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from "primeng/panel";
import {TabViewModule} from "primeng/tabview";
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import {FieldsetModule} from "primeng/fieldset";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import { StudentAbsenceComponent } from './pages/student-absence/student-absence.component';
import { StudentMarksComponent } from './pages/student-marks/student-marks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeCredentialsComponent } from './pages/change-credentials/change-credentials.component';
import { TeacherAreaComponent } from './pages/teacher-area/teacher-area.component';
import { TeacherAbsenceComponent } from './pages/teacher-absence/teacher-absence.component';
import { SecurityService } from './services/security.service';
import { AbsencesService } from './services/absences.service';
import { DeliberationsService } from './services/deliberations.service';
import {FileUploadModule} from "primeng/fileupload";
import {StatisticsPageComponent} from './pages/statistics-page/statistics-page.component';
import {ManageTeachersComponent} from './pages/manage-teachers/manage-teachers.component';
import {SingleStudentComponent} from './pages/single-student/single-student.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    SplitterModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    StyleClassModule,
    FileUploadModule,
    PanelModule,
    TabViewModule,
    InputMaskModule,
    FieldsetModule,
    CardModule,
    ToastModule

    ],
  declarations: [
    AppComponent,
    MenuPageComponent,
    DeliberationsS1s1Component,
    DeliberationsS1s2Component,
    LoginPageComponent,
    ManageSpecialtiesComponent,
    DeliberationsS2s1Component,
    DeliberationsS2s2Component,
    DeliberationsYearComponent,
    ManageStudentsComponent,
    ManageModulesComponent,
    StudentAreaComponent,
    StudentAbsenceComponent,
    StudentMarksComponent,
    ChangeCredentialsComponent,
    TeacherAreaComponent,
    TeacherAbsenceComponent,
    StatisticsPageComponent,
    ManageTeachersComponent,
    SingleStudentComponent
  ],
  providers: [SecurityService, AbsencesService, DeliberationsService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

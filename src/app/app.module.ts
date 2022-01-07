import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { TerminalServicesComponent } from './components/terminal-services/terminal-services.component';
import { ServicesComponent } from './components/terminal-services/services/services.component';
import { NewOrderComponent } from './components/terminal-services/new-order/new-order.component';
import { BrokerComponent } from './components/broker/broker.component';
import { BrokerOrderComponent } from './components/broker/broker-order/broker-order.component';
import { PayComponent } from './components/pay/pay.component';
import { PayModalComponent } from './components/pay/pay-modal/pay-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackComponent } from './components/track/track.component';
import { ReportComponent } from './components/report/report.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileAccountComponent } from './components/setting/profile-account/profile-account.component';
import { ChangepwdComponent } from './components/setting/changepwd/changepwd.component';
import { NotificationComponent } from './components/setting/notification/notification.component';
import { OrderComponent } from './components/terminal-services/new-order/order/order.component';
import { ReturnFileComponent } from './components/terminal-services/new-order/return-file/return-file.component';
import { LegalAccountComponent } from './components/setting/legal-account/legal-account.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { NextModalComponent } from './components/pay/next-modal/next-modal.component';
import { LastModalComponent } from './components/pay/last-modal/last-modal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts';
import { HelpComponent } from './components/help/help.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { RedirectUnauthorizedInterceptor } from './services/redirectUnAuthorizedInterceptor.service';
import { ChangepassComponent } from './components/register/changepass/changepass.component';
import { VerifyEmailComponent } from './components/register/verify-email/verify-email.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator-directive';




@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        TerminalServicesComponent,
        ServicesComponent,
        NewOrderComponent,
        BrokerComponent,
        BrokerOrderComponent,
        PayComponent,
        PayModalComponent,
        TrackComponent,
        ReportComponent,
        SettingComponent,
        ProfileAccountComponent,
        ChangepwdComponent,
        NotificationComponent,
        OrderComponent,
        ReturnFileComponent,
        LegalAccountComponent,
        NextModalComponent,
        LastModalComponent,
        LoginComponent,
        RegisterComponent,
        HelpComponent,
        BrokerOrderComponent,
        RegisterComponent,
        LoginComponent,
        ConfirmEqualValidatorDirective,
        VerifyEmailComponent,
        ChangepassComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSelectModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        NgChartsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule
    ],
    providers: [
        DatePipe,
        {
            provide:'BrokerItemUrl',
            useValue:'https://localhost:44323/api'

        },
        {
            provide:'DeleteBrokerItem',
            useValue:'https://localhost:44323/api/Broker?id='


        },
        {
            provide:'PostBrokerItem',
            useValue:'https://localhost:44323/api/Broker'


        },
        {
            provide:'PutBrokerItem',
            useValue:'https://localhost:44323/api/Broker/'
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RedirectUnauthorizedInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}

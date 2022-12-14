import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerOrderComponent } from './components/broker/broker-order/broker-order.component';
import { BrokerComponent } from './components/broker/broker.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NextModalComponent } from './components/pay/next-modal/next-modal.component';
import { PayModalComponent } from './components/pay/pay-modal/pay-modal.component';
import { PayComponent } from './components/pay/pay.component';
import { ReportComponent } from './components/report/report.component';
import { ChangepwdComponent } from './components/setting/changepwd/changepwd.component';
import { LegalAccountComponent } from './components/setting/legal-account/legal-account.component';
import { NotificationComponent } from './components/setting/notification/notification.component';
import { ProfileAccountComponent } from './components/setting/profile-account/profile-account.component';
import { NewOrderComponent } from './components/terminal-services/new-order/new-order.component';
import { OrderComponent } from './components/terminal-services/new-order/order/order.component';
import { ReturnFileComponent } from './components/terminal-services/new-order/return-file/return-file.component';
import { ServicesComponent } from './components/terminal-services/services/services.component';
import { TerminalServicesComponent } from './components/terminal-services/terminal-services.component';
import { TrackComponent } from './components/track/track.component';
import { HelpComponent } from './components/help/help.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/register/verify-email/verify-email.component';
import { ForgotPasComponent } from './components/register/forgotPas/forgotPas.component';
import { ChangepassComponent } from './components/register/changepass/changepass.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ErrorPageComponent } from './components/errorPage/errorPage.component';
import { BalanceComponent } from './components/balance/balance.component';
import { AddBalanceComponent } from './components/balance/addBalance/addBalance.component';
import { SuccesOperationComponent } from './components/balance/succesOperation/succesOperation.component';
import { ErrorOperationComponent } from './components/balance/errorOperation/errorOperation.component';
import { CertificateComponent } from './components/login/certificate/certificate.component';


const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'terminalservices',component:TerminalServicesComponent},
    {path:'services',component:ServicesComponent},
    {path:'neworder',component:NewOrderComponent},
    {path:'broker',component:BrokerComponent},
    {path:'brokerOrder',component:BrokerOrderComponent},
    {path:'pay',component:PayComponent},
    {path:'payModal',component:PayModalComponent},
    {path:'track',component:TrackComponent},
    {path:'report',component:ReportComponent},
    {path:'changepwd',component:ChangepwdComponent},
    {path:'notification',component:NotificationComponent},
    {path:'profileAccount',component:ProfileAccountComponent},
    {path:'order',component:OrderComponent},
    {path:'returnFile',component:ReturnFileComponent},
    {path:'legalAccount',component:LegalAccountComponent},
    {path:'nextModal',component:NextModalComponent},
    {path:'help',component:HelpComponent},
    {path:'register',component:RegisterComponent},
    {path:'verify',component:VerifyEmailComponent},
    {path: 'forgotPas', component: ForgotPasComponent},
    {path: 'changepass', component: ChangepassComponent},
    {path: 'pre', component: PreloaderComponent},
    {path: 'balance', component: BalanceComponent},
    {path: 'addBalance', component: AddBalanceComponent},
    {path: 'successOperation', component: SuccesOperationComponent},
    {path: 'errorOperation', component: ErrorOperationComponent},
    {path: 'certificate', component: CertificateComponent},
    {path:'',component:LoginComponent},
    {path: '**', component: ErrorPageComponent}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

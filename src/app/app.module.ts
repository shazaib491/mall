import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { RumyCardComponent } from './rumy-card/rumy-card.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { WalletComponent } from './wallet/wallet.component';
import { BankCardComponent } from './bank-card/bank-card.component';
import { Card2Component } from './card2/card2.component';
import { OrderComponent } from './order/order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AddressComponent } from './address/address.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { NumberCardComponent } from './number-card/number-card.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    RumyCardComponent,
    PersonalCenterComponent,
    WalletComponent,
    BankCardComponent,
    Card2Component,
    OrderComponent,
    MyOrderComponent,
    AddressComponent,
    NewAddressComponent,
    NumberCardComponent,
    BankDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

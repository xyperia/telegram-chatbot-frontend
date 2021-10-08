import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './admin/menu/menu.module';
import { MaterialModule } from 'src/assets/material/material.module';
import { ConversationModule } from './admin/conversation/conversation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { ConfigComponent } from './admin/shared/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenuModule,
    MaterialModule,
    ConversationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { JwtInterceptor, ErrorInterceptor } from './helpers';
// import { AppComponent } from './app.component';
// import { HomeComponent } from './home';

// @NgModule({
//     imports: [
//         BrowserModule,
//         ReactiveFormsModule,
//         HttpClientModule,
//         AppRoutingModule
//     ],
//     declarations: [
//         AppComponent,
//         HomeComponent
//     ],
//     providers: [
//         { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
//         { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
//     ],
//     bootstrap: [AppComponent]
// })
// export class AppModule { };
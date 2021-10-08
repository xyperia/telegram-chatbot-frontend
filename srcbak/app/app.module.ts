import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './menu/menu.module';
import { MaterialModule } from 'src/assets/material/material.module';
import { ConversationModule } from './conversation/conversation.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigComponent } from './shared/config/config.component';

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
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

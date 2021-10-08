import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/assets/material/material.module';
import { MenuDetailComponent } from './menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmComponent } from '../shared/delete-confirm/delete-confirm.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuDetailComponent,
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [MenuComponent]
})
export class MenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { MaterialModule } from 'src/assets/material/material.module';
import { FormsModule } from '@angular/forms';
import { ConversationDetailComponent } from './conversation-detail/conversation-detail.component';

@NgModule({
  declarations: [ConversationComponent, ConversationDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  bootstrap: [ConversationComponent]
})
export class ConversationModule { }

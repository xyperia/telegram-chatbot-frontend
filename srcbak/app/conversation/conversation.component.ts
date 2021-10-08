import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { LogEntity } from '../entity/log.entity';
import { UserEntity } from '../entity/user.entity';
import { DeleteConfirmComponent } from '../shared/delete-confirm/delete-confirm.component';
import { ConversationService } from './conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private subs = new SubSink();
  arrLog: LogEntity[] = [];
  arrUser: UserEntity[] = [];
  title: string;
  data: string;
  selId: number;
  selNick: string;
  selUser: string;
  selPicture: string;
  constructor(private service: ConversationService, public dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.init();
  }

  async init(){
    await this.getUsers();
    this.getLog();
  }

  getLog(){
    this.subs.add(this.service.getLogView().subscribe(
      res=>{
        for(let i=0;i<res.length;i++){
          this.arrLog[i] = res[i];
          this.arrLog[i]['PICTURE'] = this.getUserPicture(this.arrLog[i]['SENDER_ID']);
        }
      }
    ));
  }

  getUsers(){
    this.subs.add(this.service.getUsers().subscribe(
      res=>{
        this.arrUser = res;
      }
    ));
  }

  getUserPicture(senderid){
    for(let i=0;i<this.arrUser.length;i++){
      if(this.arrUser[i]['SENDER_ID'] === senderid){
        return this.arrUser[i]['PICTURE'];
      }
    }
  }

  menuClick(valData: string){
    this.getUserPicture(1884843695);
    this.data = valData;
  }

  confirmDelete(senderid: number) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      data: {id: senderid, isDelete: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        try {
          this.subs.add(this.service.deleteConversation(senderid).subscribe(res => { this.refresh() }));
        } catch (error) {
          console.log(error);
        }
      }
    });
    
  }

  imgDetail(picUrl: any) {
    this.dialog.open(ImageDetailDialog, {
      data: picUrl,
      panelClass: 'custom-dialog'
    });
  }

  refresh(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/conversations']);
    });
  }

}

@Component({
  selector: 'app-img-detail',
  template: `<img [src]="data">`,
})
export class ImageDetailDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
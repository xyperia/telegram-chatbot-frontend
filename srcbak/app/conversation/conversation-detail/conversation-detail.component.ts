import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { LogEntity } from 'src/app/entity/log.entity';
import { SubSink } from 'subsink';
import { ConversationDetailService } from './conversation-detail.service';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent implements OnInit, OnChanges {
  private subs = new SubSink();
  arrLog: LogEntity[] = []
  @Input("data") content;

  constructor(private service: ConversationDetailService) { }

  ngOnInit(): void {
    this.getLog(this.content);
  }

  getLog(senderid: number){
    this.subs.add(this.service.getLogView(senderid).subscribe(res=>{
      this.arrLog = res;
    }));
  }

  ngOnChanges(): void{
    try {
      this.subs.unsubscribe();
    } catch (error) {
      console.log(console.error());
    } finally {
      this.getLog(this.content);
    }
  }

  epochToDate(timestamp: number){
    let myDate = new Date(timestamp*1000);
    return myDate.toLocaleString();
  }

}

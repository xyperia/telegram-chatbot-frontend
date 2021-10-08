import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { SubSink } from 'subsink';
import { LogEntity } from '../entity/log.entity';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  displayedColumns: string[] = ['no', 'name', 'msg', 'time'];
  arrLog: LogEntity[] = [];
  arrGroupedDate: any[] = [];
  arrVal: any[] = [];
  dataSource;
  requestChartType: ChartType = 'line';
  popularChartType: ChartType = 'bar';

  public chartColors: Color[] = [
    { backgroundColor: 'rgba(63, 81, 181, 0.5)' },
  ]

  public chartOptions:any = {
    scales: {
      xAxes: [{display: true}],
      yAxes: [{
        display: true,
        ticks: {
            suggestedMin: 0,
            beginAtZero: true
        }
    }]
    }
  };

  // requestChartLabels: Label[] = ["8 June", "9 June", "10 June", "11 June", "12 June", "13 June", "14 June", "15 June", "16 June", "17 June", "18 June", "19 June", "20 June", "21 (Today)"];
  // requestChartData: ChartDataSets[] = [
  //   { data: [45, 64, 56, 67, 32, 52, 22, 23, 11, 78, 61, 68, 47, 33], label: 'Number of requests' }
  // ];

  popularChartLabels: Label[] = [];
  popularChartData: ChartDataSets[] = [{ data: [], label: 'Number of requests' }];

  constructor(
    private service:DashboardService
  ) {  }

  ngOnInit(): void{
    this.getRecentLog();
    // this.getLog();
    this.getPopularMenu();
  }

  getRecentLog(){
    this.subs.add(this.service.getLogView().subscribe(
      res=>{
        this.dataSource = new MatTableDataSource<LogEntity>(res);
      }
    ));
  }

  // getLog(){
  //   this.subs.add(this.service.getLog().subscribe(
  //     res=>{
  //       try {
  //         for(let i=0;i<res.length;i++){
  //           var date = new Date(res[i]['TIMESTAMP']*1000);
  //           let temp = date.getDate()+" "+(this.switchMonth(date.getMonth()+1));
  //           if(!this.arrGroupedDate.some(i => temp.includes(i))){
  //             this.arrGroupedDate.push(temp);
  //           }
  //         }
  //       } finally {
  //         console.log(this.arrGroupedDate);
  //       }
        
  //     }
  //   ));
  // }

  // groupTime(val: any){
  //   var date = new Date(val*1000);
  //   let temp = date.getDate()+" "+(this.switchMonth(date.getMonth()+1));
  //   if(!this.arrGroupedDate.some(i => temp.includes(i))){
  //     this.arrGroupedDate.push(temp);
  //   }
    
  // }

  // switchMonth(val: any){
  //   switch(val) {
  //     case 1:
  //       return "Jan";
  //     case 2:
  //       return "Feb";
  //     case 3:
  //       return "Mar"
  //     case 4:
  //       return "Apr"
  //     case 5:
  //       return "May"
  //     case 6:
  //       return "Jun"
  //     case 7:
  //       return "Jul"
  //     case 8:
  //       return "Aug"
  //     case 9:
  //       return "Sep"
  //     case 10:
  //       return "Oct"
  //     case 11:
  //       return "Nov"
  //     default:
  //       return "Dec"
  //   }
  // }

  getPopularMenu(){
    this.subs.add(this.service.getPopularMenu().subscribe(
      res=>{
        for(let i =0;i<res.length;i++){
          this.popularChartData[0]['data'][i] = res[i]['VISITOR'];
          this.popularChartLabels.push(res[i]['TITLE']);
        }
      }
    ))
  }

  epochToDate(timestamp: number){
    let myDate = new Date(timestamp*1000);
    return myDate.toLocaleString();
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
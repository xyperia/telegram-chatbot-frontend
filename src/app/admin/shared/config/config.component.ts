import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigEntity } from 'src/app/admin/entity/config.entity';
import { SubSink } from 'subsink';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  telegramToken: any;
  companyName: any;
  botName: any;
  isMaintenance: any;
  devId: any;

  isSave: any = false;
  arrConfig: ConfigEntity[] = [];

  formDisabled: any = true;

  constructor(private service: ConfigService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.subs.add(this.service.getConfig().subscribe(
      res=>{
        this.arrConfig = res;
        for(let i=0;i<res.length;i++){
          if(res[i]['CONFIG_NAME'] == 'TELEGRAM_TOKEN'){
            this.telegramToken = res[i]['CONFIG_VALUE']
          } else if(res[i]['CONFIG_NAME'] == 'COMPANY_NAME'){
            this.companyName = res[i]['CONFIG_VALUE'];
          } else if(res[i]['CONFIG_NAME'] == 'BOT_NAME'){
            this.botName = res[i]['CONFIG_VALUE'];
          } else if(res[i]['CONFIG_NAME'] == 'DEV_ID'){
            this.devId = res[i]['CONFIG_VALUE'];
          } else if(res[i]['CONFIG_NAME'] == 'IS_MAINTENANCE'){
            this.isMaintenance = res[i]['CONFIG_VALUE'];
          }
        }
      }
    ));
  }

  async saveToken(){
    if(this.formDisabled == false){
      this.formDisabled = true;
      this.openSnackBar('Bot Configuration has been changed')
      this.subs.add(this.service.updateConfig(this.arrConfig[0]).subscribe());
    } else {
      this.formDisabled = false;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

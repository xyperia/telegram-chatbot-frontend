import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material/dialog';
import { ConfigComponent } from './shared/config/config.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  private subs: SubSink;
  getTitle: string = environment.appTitle;
  pageTitle: string;
  routerContent: any = [
    {
      title: this.getTitle, url: '/dashboard'
    },
    {
      title: 'Dashboard', url: '/dashboard'
    },
    {
      title: 'Menu', url: '/menu'
    },
    {
      title: 'Conversations', url: '/conversations'
    }
  ];

  public constructor(private titleService: Title, private router: Router, location: Location, public dialog:MatDialog) {
    this.titleService.setTitle(this.getTitle);
    router.events.subscribe((val) => {
      this.pageTitle = this.urlExtract(location.path());
    });
  }

  showConfig(){
    this.dialog.open(ConfigComponent, { width: '50%' });
  }

  private urlExtract(url: string){
    return url.split('/').join(' ').slice(1).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }

  // this.router.navigate(['../../list'], { relativeTo: this.route })
  // window.open('/system-engineer/jr/update/' + this.jr_id, '_blank');
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  Url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getLogView(): Observable<any>{
    return this.http.get<any>(this.Url + `/log/recent`);
  }

  public getLog(): Observable<any>{
    return this.http.get<any>(this.Url + `/log`);
  }

  public getPopularMenu(): Observable<any>{
    return this.http.get<any>(this.Url + `/menu/popular`);
  }
}

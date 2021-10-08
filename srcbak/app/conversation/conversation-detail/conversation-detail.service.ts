import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogEntity } from 'src/app/entity/log.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationDetailService {

  Url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  public getLogView(senderid: number): Observable<any>{
    return this.http.get<any>(this.Url + `/log/` + senderid);
  }
}

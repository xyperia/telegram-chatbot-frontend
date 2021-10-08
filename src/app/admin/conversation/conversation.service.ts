import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogEntity } from '../entity/log.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  Url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  public getLogView(): Observable<LogEntity[]>{
    return this.http.get<LogEntity[]>(this.Url + `/log/view`);
  }

  public deleteConversation(senderid: number){
    return this.http.delete<any>(this.Url + `/log/delete/` + senderid);
  }

  public getUsers(): Observable<UserEntity[]>{
    return this.http.get<UserEntity[]>(this.Url + `/user`);
  }
}

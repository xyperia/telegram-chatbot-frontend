import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigEntity } from 'src/app/admin/entity/config.entity';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  Url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  public getConfig(): Observable<ConfigEntity[]>{
    return this.http.get<ConfigEntity[]>(this.Url + `/config`);
  }

  public updateConfig(config_data: ConfigEntity){
    return this.http.put<any>(this.Url + '/config', config_data);
  }
}

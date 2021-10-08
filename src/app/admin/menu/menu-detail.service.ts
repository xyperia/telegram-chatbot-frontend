import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuEntity } from '../entity/menu.entity';

@Injectable({
  providedIn: 'root'
})
export class MenuDetailService {

  Url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public updateMenu(menu_data: MenuEntity){
    return this.http.put<any>(this.Url + '/menu', menu_data);
  }

  public createMenu(menu_data: MenuEntity){
    return this.http.post<any>(this.Url + `/menu`, menu_data);
  }

}

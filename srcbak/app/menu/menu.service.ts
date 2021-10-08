import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuEntity } from '../entity/menu.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  Url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  public getMenu(): Observable<MenuEntity[]>{
    return this.http.get<MenuEntity[]>(this.Url + `/menu`);
  }

  public deleteMenu(menu_id: string){
    let val = menu_id.substring(8);
    return this.http.delete<any>(this.Url + `/menu/delete/` + val);
  }
}

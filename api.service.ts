import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from '../list/list/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  constructor(private http:HttpClient) { }

  add(data:datamodel){
    return this.http.post<datamodel>("http://localhost:3000/database/",data)
  }
  get(){
    return this.http.get<datamodel[]>("http://localhost:3000/database");
  }
  delete(id:number){
    return this.http.delete<datamodel>("http://localhost:3000/database/"+id);
  }
  facth(id:number){
    return this.http.get<datamodel>("http://localhost:3000/database/"+id);
  }
  update(  id:number, data:datamodel){
    return this.http.put<datamodel>("http://localhost:3000/database/"+id,data);
  }
}

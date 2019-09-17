import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetuserdataService {
 dataval:{};
  constructor(public http:HttpClient) { }
  getUserData()
  {
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }

  //access to the object
  addtoData(f)
  {
     this.addtoData=f;
  }

  getformData()
  {
    return this.addtoData;
  }
}

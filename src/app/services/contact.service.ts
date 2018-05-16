import {Injectable} from '@angular/core';

import {IContact} from '../contacts/contacts';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {AuthorizeService} from "./authorization.service";
//baseurl = https://9fantv4use.execute-api.us-east-1.amazonaws.com/prod

@Injectable()
export class ContactService {
  private baseUrl = 'https://hjbw75ei6i.execute-api.us-east-1.amazonaws.com/prod';
  constructor(private http:HttpClient,private authorizationService:AuthorizeService){}

  getContacts():Observable<IContact>{
    var authorizationToken = this.authorizationService.getIdToken();
    return this.http.get<IContact>(this.baseUrl+'/contacts',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charse=UTF-8',
        'Authorization':authorizationToken
      })
    })
  }

  addContact(userContact):Observable<any>{
    var authorizationToken = this.authorizationService.getIdToken();
    return this.http.post(this.baseUrl+'/contacts',userContact,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charse=UTF-8',
        'Authorization':authorizationToken,
      })
    })
  }

}

import {Injectable} from '@angular/core';
import {IUser} from "../authentication/user";
import {HttpClient} from "@angular/common/http";
//import {Observable} from "rxjs/index";
import {RequestOptions} from "@angular/http";
//npm install aws-sdk --save
//npm install amazon-cognito-identity-js


import * as AWS from 'aws-sdk';
import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizeService {

  private loggedInUser = {
    idToken:''
  };

  constructor(private http:HttpClient, private router:Router){

  }


  setIdToken(idToken){
    this.loggedInUser.idToken = idToken;
  }

  getIdToken(){
    return this.loggedInUser.idToken;
  }

}

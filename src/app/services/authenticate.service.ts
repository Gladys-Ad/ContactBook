import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk';
import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';


@Injectable()
export class AuthenticateService {
  private isLoggedIn = false;
  private awsConfig = {
    userPoolId : 'us-east-1_KHp4lyhZX',
    clientId : 'm974o79en94ejuauk7e19jg67',
    accessToken:'',
  };


  constructor(){
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId:'us-east-1:2afb6402-7349-4cd7-bff0-d2cc83dc4d87'
    });
  }

  getIsLoggedIn():boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value:boolean):void {
    this.isLoggedIn = value;
  }

  setAccessToken(token){
    this.awsConfig.accessToken = token;
  }

  getAccessToken(){
    return this.awsConfig.accessToken;
  }


  getUserPool(){
    var poolData = {
      UserPoolId : this.awsConfig.userPoolId,
      ClientId : this.awsConfig.clientId
    };
    var userPool = new CognitoUserPool(poolData);

    return userPool;
  }

  getUser(username){
   var pool = this.getUserPool();
   var userData = {
     Username: username,
     Pool: pool
   };

   var cognitoUser = new CognitoUser(userData);
   return cognitoUser;
 }

 getAuthenticationDetails(user){
   var authenticationData = {
     Username: user.email,
     Password: user.password
   };
   var authenticationDetails = new AuthenticationDetails(authenticationData);
   return authenticationDetails;
 }


  login(userData){
   return new Promise((resolve,reject) =>{
     let authenticationDetails = this.getAuthenticationDetails(userData);
     let cognitoUser = this.getUser(userData.email);
     cognitoUser.authenticateUser(authenticationDetails,{
       onSuccess(result){
         resolve(result);
       },
       onFailure(error){
         reject(error);
       }
     })
   })
 }

 logout(){
   var userPool = this.getUserPool();
   var cognitoUser = userPool.getCurrentUser();
   if (cognitoUser != null) {
     cognitoUser.signOut();
   }
   this.setIsLoggedIn(false);

 }

 register(userData){
   let attributeList = [];

   let nameParam = {
     Name: 'name',
     Value: userData.name
   }
   let emailParam = {
     Name: 'email',
     Value: userData.email
   }

   var attributeName = new CognitoUserAttribute(nameParam);
   var attributeEmail = new CognitoUserAttribute(emailParam);
   attributeList.push(attributeName);
   attributeList.push(attributeEmail);


   return new Promise((resolve,reject)=>{
     this.getUserPool().signUp(userData.email,userData.password,attributeList,null,function(error,result){
       if(result){
         resolve(result);
       }
       else {
         reject(error);
       }
     })
   })


 }

}

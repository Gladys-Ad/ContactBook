import {Component, OnInit} from "@angular/core";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizeService} from "../services/authorization.service";

@Component ({

  selector:'mc-login',
  templateUrl:'./login.component.html',
  styleUrls:['./auth.component.css']

})

export class LoginComponent implements OnInit{

  loginButton = 'Login';

  loginForm: FormGroup;


  constructor(private authenticationService :AuthenticateService,private authorizeService:AuthorizeService, private router:Router, private formBuilder:FormBuilder){
  }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")]],
      password:['',[Validators.required]]
    });
  }



  loginUser(): void {
    var user={
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password
    }
    this.loginButton = "Authenticating..."
    this.authenticationService.login(user).then(
      (result:any) => {
        this.authenticationService.setAccessToken(result.getAccessToken().getJwtToken());
        this.authorizeService.setIdToken(result.getIdToken().getJwtToken());
        this.authenticationService.setIsLoggedIn(true);
        this.router.navigate(['/contacts']);
      },
      (error)=> {
        if(error.code == 'UserNotFoundException'){
          alert('You do not have an account.Please sign up!');
        }
        else{
          alert(error.message);
        }
      }
    );

    this.loginButton = "Login";
  };
}

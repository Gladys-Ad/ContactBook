import {Component, OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";

 //cross field validator, confirming password
function comparePasswords(c: AbstractControl):{[key: string]: boolean} | null {
    let password = c.get('password');
    let confirmPassword = c.get('confirmPassword');
    if(password.pristine || confirmPassword.pristine){
        return null;
    }
    if(password.value !== confirmPassword.value){
        return {'match':true}
    }
    return null;
}

  //cross field validator, confirming email
  function compareEmails(c: AbstractControl):{[key: string]: boolean} | null {
    let email = c.get('email');
    let confirmEmail = c.get('confirmEmail');
    if(email.pristine || confirmEmail.pristine){
        return null;
    }
    if(email.value !== confirmEmail.value){
        return {'match':true}
    }
    return null;
}

@Component ({

  selector:'mc-signup',
  templateUrl:'./signup.component.html',
  styleUrls:['./auth.component.css']

})

export class SignupComponent implements OnInit{
    signupButton = 'SignUp';
    signupForm: FormGroup;

    constructor(private formBuilder:FormBuilder, private authenticateService: AuthenticateService, private router:Router){
    }

    ngOnInit(): void{
        this.signupForm = this.formBuilder.group({
            name: ['',Validators.required],
            emailGroup: this.formBuilder.group({
                email:['', [Validators.required,Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")]],
                confirmEmail:['',[Validators.required,Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")]]
            },{validator:compareEmails}),
            passwordGroup: this.formBuilder.group({
                password: ['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
                confirmPassword: ['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
            },{validator:comparePasswords})
        })
    }

    signupUser(){
        var user={
            name: this.signupForm.getRawValue.name,
            email: this.signupForm.getRawValue().emailGroup.email,
            password:this.signupForm.getRawValue().passwordGroup.password
        }
        this.signupButton = "Registering...";
        this.authenticateService.register(user).then(
          (result)=>{
            this.signupForm.reset();
            alert("You have successfully signed up for an account! Please log in now");
            this.router.navigate(['/login']);
          },
          (error)=>{
            console.log(error);
            alert("There was an error signing you up for an account. "+error.message+" Please try again!")
          }
        );

        this.signupButton = "SignUp";
    }

}

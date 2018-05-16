import {Component, OnInit} from "@angular/core";
import {IContact} from "./contacts";
import {ContactService} from "../services/contact.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component ({
  selector: 'mc-contacts',
  templateUrl: './contacts.component.html'
})

export class ContactsComponent implements OnInit{
  addContactButton:string="Add Contact";
  contactForm : FormGroup;
  relations:string [] = [
    "Friend","Family","Acquaintance"
  ]
  loadingMessage:string='';
  //dependency injection for contactservice
  constructor(private formBuilder:FormBuilder, private contactService:ContactService){
  }

  userContacts: IContact[] =[];
  errorMessage : string = '';

  ngOnInit(): void{
    this.contactForm = this.formBuilder.group({
      name:['',Validators.required],
      relation:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]],
      email:['',[Validators.required,Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")]],
      address:['',Validators.required]
    });

    //do http call to get all user's contact and store results in userContacts
    this.getContacts();
  }

  addContact():void{
    var userContact = {
      name: this.contactForm.getRawValue().name,
      relation:this.contactForm.getRawValue().relation,
      phone:this.contactForm.getRawValue().phone,
      email:this.contactForm.getRawValue().email,
      address:this.contactForm.getRawValue().address
    }
    this.addContactButton = "Adding...";
    this.contactService.addContact(userContact).subscribe(
      (result)=>{
        alert(result.message);
        console.log(result);
        this.contactForm.reset();
        this.getContacts();
      },
      (error)=>{
        alert("There was an error adding your contact. Please refresh page and try again");
        console.log(error);
      }
    );
    this.addContactButton = "Add Contact";
  }

  getContacts():void{
    this.contactService.getContacts().subscribe(
      (result:any) =>{
        console.log("success getting contacts");
        this.loadingMessage="Contacts are loading...";
        this.userContacts = result.Items;
        this.loadingMessage = '';
      },
      (error) =>{
        this.loadingMessage = "Unable to load contacts at this time";
        console.log(error)
      }
    );
  }

}



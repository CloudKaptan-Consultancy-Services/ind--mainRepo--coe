/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Arijit
 * @group             : 
 * @testclass         : 
 * @last modified on  : 04-10-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   04-05-2024   Arijit   Initial Version
**/
import { LightningElement, track, api } from 'lwc';
import Toast from 'lightning/toast';
import { NavigationMixin } from 'lightning/navigation';
import handleRegistration from '@salesforce/apex/CommunityRegistrationController.handleRegistration';

export default class CkSignup extends NavigationMixin(LightningElement) {
  
  // Static Text
  @api formTitle;

  // Input Labels
  @api firstNameLabel;
  @api lastNameLabel;
  @api userNameLabel;
  @api passwordLabel;
  @api confirmPasswordLabel;

  // Button Label
  @api submitButtonLabel;

  // Placeholder
  @api firstNamePlaceholder;
  @api lastNamePlaceholder;
  @api userNamePlaceholder;
  @api passwordPlaceholder;
  @api confirmPasswordPlaceholder;



  email;
  password;
  firstName;
  lastName;
  confirmPassword;
  @track showLoader = false;

  handleInput(event) {
    if (event.target.name === "email") {
      this.email = event.target.value;
    } else if (event.target.name === "password") {
      this.password = event.target.value;
    } else if (event.target.name === "confirmPassword") {
      this.confirmPassword = event.target.value;
    } else if (event.target.name === "firstName") {
      this.firstName = event.target.value;
    } else if (event.target.name === "lastName") {
      this.lastName = event.target.value;
    }
  }

  handlePasswordMatch(event) {
    if(this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      event.target.setCustomValidity('Password didn\'t match');
    } else {
      event.target.setCustomValidity('');
    }
    event.target.reportValidity();
  }

  handleSubmit(_) {
    let inputFieldInvalid = false;
    this.template.querySelectorAll("lightning-input").forEach((inputComp) => {
      if (!inputComp.reportValidity()) {
        inputFieldInvalid = true;
      }
    });
    if (inputFieldInvalid) {
      return;
    }
    this.showLoader = true;
    const data = JSON.stringify({
      firstName:this.firstName,
      lastName: this.lastName,
      password:this.password,
      email: this.email,

    })
    handleRegistration({
      customerData: JSON.stringify({
        firstName:this.firstName,
        lastName: this.lastName,
        password:this.password,
        email: this.email,

      })
    }).then((data) =>{
      this.showLoader = false;
      if(data){
        window.location.href = data;
      }
    }).catch((error) =>{
      this.showLoader = false;
      console.log(error);
      const {
        body: { message },
      } = error;
      Toast.show({
        label: 'Submit Failed',
        message: message,
        mode: 'sticky',
        variant: 'error'
      }, this);
    })
  }

}
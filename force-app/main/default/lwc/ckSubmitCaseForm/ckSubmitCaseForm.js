/**
   * @Company : Cloudkaptan Consultancy Services Pvt. Ltd.
   * @description : This is used to
   * @author : Arijit
   * @group : 
   * @testclass : 
   * @last modified on : 04-08-2024
   * @last modified by : Arijit Naskar
   * Modifications Log
   * Ver   Date         Author        Modification
   * 1.0   03 - 28 - 2024   Arijit   Initial Version
   **/
import {
    LightningElement,
    api,
    wire,
    track
}
from 'lwc';
import USER_ID from "@salesforce/user/Id";
import {
    getRecord,
    getFieldValue,
    createRecord
}
from "lightning/uiRecordApi";
import {
    NavigationMixin
}
from 'lightning/navigation';
import USER_NAME from '@salesforce/schema/User.Name';
import USER_CONTACT_ID from '@salesforce/schema/User.ContactId';
import USER_CONTACT_NAME from '@salesforce/schema/User.Contact.Name';
import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_SUBJECT from '@salesforce/schema/Case.Subject';
import CASE_DESCRIPTION from '@salesforce/schema/Case.Description';
import CASE_TYPE from '@salesforce/schema/Case.Type';
import CASE_CONTACT from '@salesforce/schema/Case.ContactId';
import CASE_PROJECT from '@salesforce/schema/Case.Salesforce_Project__c';
import CASE_PRODUCT from '@salesforce/schema/Case.Product_Name__c';
import CASE_OCCURRED_ON from '@salesforce/schema/Case.Issue_Occurred_On__c';
import uploadFile from '@salesforce/apex/FileUploaderController.uploadFile';
export default class CkSubmitCaseForm extends NavigationMixin(
    LightningElement) {
    @api contactLabel;
    @api subjectLabel;
    @api descriptionLabel;
    @api caseTypeLabel;
    @api dateTimeLabel;
    @api sfq2projectLabel;
    @api productLabel;
    @api uploadFileLabel;
    @track someData;
    @track userName;
    fileData;
    subjectValue = "";
    descriptionValue = "";
    sfq2ProjectValue = "";
    dateTimeValue = "";
    productValue = "";
    contactId = "";
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [USER_NAME, USER_CONTACT_NAME, USER_CONTACT_ID]
    })
    getUserData({
        data,
        error
    }) {
        if (data) {
            this.userName = getFieldValue(data, USER_CONTACT_NAME) ?? getFieldValue(data, USER_NAME);
            this.contactId = getFieldValue(data, USER_CONTACT_ID);
        }
    }
    handleInput(event) {
        if (event.target.name === "subject") {
            this.subject = event.target.value;
        } else if (event.target.name === "description") {
            this.description = event.target.value;
        } else if (event.target.name === "sfq2ProjectLabel") {
            this.sfq2ProjectValue = event.target.value;
        } else if (event.target.name === "productLabel") {
            this.productValue = event.target.value;
        } else if(event.target.name === "dateTime") {
            this.dateTimeValue = event.target.value;
        } 
    }
    handleSubmitCase() {
        let inputFieldInvalid = false;
        this.template.querySelectorAll("lightning-input").forEach((
            inputComp) => {
            if (!inputComp.reportValidity()) {
                inputFieldInvalid = true;
            }
        });
        if (inputFieldInvalid) {
            return;
        }
        const fields = {};
        fields[CASE_SUBJECT.fieldApiName] = this.subject;
        fields[CASE_DESCRIPTION.fieldApiName] = this.description;
        fields[CASE_TYPE.fieldApiName] = 'Problem';
        fields[CASE_CONTACT.fieldApiName] = this.contactId ?? '003U7000005ypG5IAI';
        fields[CASE_PRODUCT.fieldApiName] = this.productValue;
        fields[CASE_PROJECT.fieldApiName] = this.sfq2ProjectValue;
        fields[CASE_OCCURRED_ON.fieldApiName] = this.dateTimeValue;
        const recordInput = {
            apiName: CASE_OBJECT.objectApiName,
            fields
        };
        createRecord(recordInput)
            .then(result => {
                if(this.fileData) {
                    const {base64, filename} = this.fileData;
                    uploadFile({ baseSixtyFourString:base64, filename, recordId: result.id})
                        .then(result=>console.log(result))
                        .catch(error => console.log(error))
                }
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'Case_Detail__c'
                    },
                    state: {
                        id: result.id
                    }
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleFilesChange(event) {
        const file  = event.target.files[0];
        if(file != null) {
            var reader = new FileReader();
            reader.onload = () => {
                var base64 = reader.result.split(',')[1];
                this.fileData = {
                    'filename': file.name,
                    'base64': base64,
                };
            }
            reader.readAsDataURL(file);
        }
    }
}
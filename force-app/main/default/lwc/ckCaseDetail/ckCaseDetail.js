/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Arijit
 * @group             : 
 * @testclass         : 
 * @last modified on  : 04-08-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   03-29-2024   Arijit   Initial Version
**/


import { LightningElement, wire, track, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {
  NavigationMixin
} from 'lightning/navigation';
import { generateUrl } from 'lightning/fileDownload';
import CASE_NUMBER from '@salesforce/schema/Case.CaseNumber';
import CASE_SUBJECT from '@salesforce/schema/Case.Subject';
import CASE_STATUS from '@salesforce/schema/Case.Status';
import CASE_DESCRIPTION from '@salesforce/schema/Case.Description';
import CASE_PRIORITY from '@salesforce/schema/Case.Priority';
import CASE_CONTACT_NAME from '@salesforce/schema/Case.Contact.Name';
import CASE_PROJECT from '@salesforce/schema/Case.Salesforce_Project__c';
import CASE_PRODUCT from '@salesforce/schema/Case.Product_Name__c';
import CASE_OCCURRED_ON from '@salesforce/schema/Case.Issue_Occurred_On__c';

import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import fetchCaseRelatedContentDocument from '@salesforce/apex/FileUploaderController.fetchCaseRelatedContentDocument';

export default class CkCaseDetail  extends NavigationMixin(LightningElement) {

    @api contactLabel;
    @api subjectLabel;
    @api descriptionLabel;
    @api caseTypeLabel;
    @api dateTimeLabel;
    @api sfq2projectLabel;
    @api productLabel;
    @api uploadFileLabel;
    @api caseNumberLabel;
    @api casePriorityLabel;

    @track param;

    @track caseDescription;
    @track caseNumber;
    @track caseSubject;
    @track casePriority;
    @track caseStatus;
    @track caseContactName
    @track caseProjectName;
    @track caseProductName;
    @track caseOccurredOn;
    @track listOfFiles;
    
    @wire(CurrentPageReference)
    currentPageReference(data) {
      this.param  = data.state.id;
    };

    handleBack(_) {
      this[NavigationMixin.Navigate]({
        type: 'comm__namedPage',
        attributes: {
            name: 'Case__c'
        }
      })
    }

    @wire(getRecord, 
      {
        recordId:'$param',
        fields:[
          CASE_DESCRIPTION,
          CASE_NUMBER,
          CASE_PRIORITY,
          CASE_STATUS,
          CASE_SUBJECT,
          CASE_CONTACT_NAME,
          CASE_PRODUCT,
          CASE_PROJECT,
          CASE_OCCURRED_ON
        ]
      })
    caseDetails({data,error}) {
      if(data) {
        this.caseContactName = getFieldValue(data, CASE_CONTACT_NAME);
        this.caseSubject = getFieldValue(data, CASE_SUBJECT);
        this.caseDescription = getFieldValue(data, CASE_DESCRIPTION);
        this.caseStatus = getFieldValue(data, CASE_STATUS);
        this.caseNumber = getFieldValue(data, CASE_NUMBER);
        this.casePriority = getFieldValue(data, CASE_PRIORITY);
        this.caseProjectName = getFieldValue(data, CASE_PROJECT);
        this.caseProductName = getFieldValue(data, CASE_PRODUCT);
        this.caseOccurredOn = getFieldDisplayValue(data, CASE_OCCURRED_ON);
      }
    }

    @wire(fetchCaseRelatedContentDocument,{
      recordId:'$param'
    })
    caseAttachmentDetails({data,error}) {
      if(data) {
        const fileList = [];
        for (const [key, value] of Object.entries(data)) {
          fileList.push({
            'fileName': value,
            'id': key,
            'download': generateUrl(key)
          })
        }
        if(fileList.length) {
          this.listOfFiles = fileList;
        }
      }
    }
}
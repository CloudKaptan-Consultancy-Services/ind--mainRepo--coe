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
 * 1.0   03-27-2024   Arijit   Initial Version
 **/
import {
  api,
  track,
  wire,
  LightningElement
} from 'lwc';
import {
  NavigationMixin
} from 'lightning/navigation';
import USER_ID from "@salesforce/user/Id";
import USER_CONTACT_ID from '@salesforce/schema/User.ContactId';
import getAllCases from '@salesforce/apex/FetchCaseController.getAllCases';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class CkCaseStatus extends NavigationMixin(LightningElement) {

  @api contactLabel;
  @api subjectLabel;
  @api caseTypeLabel;
  @api caseNumberLabel;
  @api casePriorityLabel;
  @api caseStatus;
  @api dateTimeLabel;
  @api sfq2projectLabel;
  @api productLabel;
  @track caseData = [];
  @track noData = true;
  columns = [];


  @track showMoreCases = false;
  @track contactId;

  @wire(getRecord, {
    recordId: USER_ID,
    fields: [USER_CONTACT_ID]
  })
  getUserData({
      data,
      error
  }) {
      if (data) {
          this.contactId = getFieldValue(data, USER_CONTACT_ID);
      }
  }

  @wire(getAllCases, {
    contactId: '$contactId'
  })
  getCases({
      data,
      error
  }) {
    if (data) {
      const caseArray = [];
      const filteredCases = data.filter((each) => each.Status !== 'Closed');
      
      filteredCases.forEach((
                        eachData
                      ) => {
                        caseArray.push({
                          'caseStatus': eachData.Status,
                          'caseNumber': eachData.CaseNumber,
                          'id': eachData.Id,
                          'casePriority': eachData.Priority,
                          'caseType' : eachData.Type,
                          'caseSubject' : eachData.Subject,
                          'contactName' : eachData.Contact?.Name,
                          'productName' : eachData.Product_Name__c,
                          'projectName' : eachData.Salesforce_Project__c
                        });
                      })
      this.caseData = [...caseArray.slice(0,5)];
      if(this.caseData.length>0) {
        this.noData = false;
      }
      if(caseArray.length > 5) {
        this.showMoreCases = true;
      }
    }
  }

  handleClick(event) {
    if(event.detail.action.name === 'navigate' && event.detail.row.id) {
      this[NavigationMixin.Navigate]({
        type: 'comm__namedPage',
        attributes: {
            name: 'Case_Detail__c'
        },
        state: {
            id: event.detail.row.id
        }
      })
    }
  }

  handleShowMoreCases(_) {
    this[NavigationMixin.Navigate]({
      type: 'comm__namedPage',
      attributes: {
          name: 'Case__c'
      }
    })
  }


  connectedCallback() {
    if (this.caseData) {
      this.columns.push({
        label: this.caseNumberLabel,
        type: 'button',
        typeAttributes:{
          variant: 'base',
          name: 'navigate',
          label: {
            fieldName: 'caseNumber'
          }
        }
      });
      this.columns.push({
        label: this.subjectLabel,
        fieldName: 'caseSubject',
        type: 'text'
      });
      this.columns.push({
        label: this.contactLabel,
        fieldName: 'contactName',
        type: 'text'
      });
      this.columns.push({
        label: this.caseStatus,
        fieldName: 'caseStatus',
        type: 'text'
      });
      this.columns.push({
        label: this.casePriorityLabel,
        fieldName: 'casePriority',
        type: 'text'
      });
    }
  }
}
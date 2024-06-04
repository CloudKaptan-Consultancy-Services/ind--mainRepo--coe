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

const columns = [
  { label: 'Name', fieldName: 'name' },
  {
      label: 'Age',
      fieldName: 'age',
      type: 'text',
      sortable: true,
      cellAttributes: { alignment: 'left' },
  },
  { label: 'Email', fieldName: 'email', type: 'email' },
];

export default class CkCaseList extends NavigationMixin(LightningElement) {

  @api contactLabel;
  @api subjectLabel;
  @api dateTimeLabel;
  @api sfq2projectLabel;
  @api productLabel;
  @api caseTypeLabel;
  @api caseNumberLabel;
  @api casePriorityLabel;
  @api caseStatus;



  @track caseData = [];
  @track filteredData = [];
  @track noData = true;
  columns = [];

  @track contactId;
  @track defaultSortDirection = 'asc';
  @track sortDirection = 'asc';
  @track sortedBy;

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
      data.forEach((
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
      this.caseData = caseArray;
      this.filteredData = caseArray;
      if(this.filteredData.length>0) {
        this.noData = false;
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

  handleFilterData(event){
    const tabValue = event.target.value;
    this.filteredData = this.caseData.filter((data)=>{
      if(tabValue === "all"){
        return true;
      } else if(tabValue === "open" && data.caseStatus !== 'Closed') {
        return true;
      } else if(tabValue === 'closed' && data.caseStatus === 'Closed') {
        return true;
      }
      return false;
    });
    this.noData = this.filteredData.length < 1;
  }


  connectedCallback() {
    if (this.caseData) {
      this.columns.push({
        label: this.caseNumberLabel,
        type: 'button',
        fieldName: 'caseNumber',
        sortable: true,
        typeAttributes:{
          variant: 'base',
          name: 'navigate',
          label: {
            fieldName: 'caseNumber'
          }
        }
      });
      this.columns.push({
        label: this.contactLabel,
        fieldName: 'contactName',
        type: 'text'
      });
      this.columns.push({
        label: this.sfq2projectLabel,
        fieldName: 'projectName',
        type: 'text'
      });
      this.columns.push({
        label: this.productLabel,
        fieldName: 'productName',
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
      this.columns.push({
        label: this.subjectLabel,
        fieldName: 'caseSubject',
        type: 'text'
      });
      this.columns.push({
        label: this.caseTypeLabel,
        fieldName: 'caseType',
        type: 'text'
      });
    }
  }

  sortBy(field, reverse, primer) {
    const key = primer
        ? function (x) {
              return primer(x[field]);
          }
        : function (x) {
              return x[field];
          };

    return function (a, b) {
        a = key(a);
        b = key(b);
        return reverse * ((a > b) - (b > a));
    };
  }

  onHandleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.filteredData];
    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.filteredData = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }
}
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
 * 1.0   03-28-2024   Arijit   Initial Version
**/
import { api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CkCreateCase extends NavigationMixin(LightningElement) {
  @api createCaseBtnLabel;

  handleCase() {
    this[NavigationMixin.Navigate]({
      type: 'comm__namedPage',
      attributes: {
          name: 'Submit_A_Case__c'
      }
    });
  }
}
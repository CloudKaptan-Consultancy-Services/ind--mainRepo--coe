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
 * 1.0   04-07-2024   Arijit   Initial Version
 **/
import {
    LightningElement,
    wire,
    track
} from 'lwc';
import {
    CurrentPageReference
} from 'lightning/navigation';
import {
    getRelatedListRecords
} from 'lightning/uiRelatedListApi';
import CASE_COMMENT_OBJECT from '@salesforce/schema/CaseComment';
import CASE_COMMENT_PARENT from '@salesforce/schema/CaseComment.ParentId';
import CASE_COMMENT_ID from '@salesforce/schema/CaseComment.Id';
import CASE_COMMENT_BODY from '@salesforce/schema/CaseComment.CommentBody';
import CASE_COMMENT_CREATED_BY_NAME from '@salesforce/schema/CaseComment.CreatedBy.Name';
import CASE_COMMENT_CREATED_DATE from '@salesforce/schema/CaseComment.CreatedDate';
import {
    createRecord,
    getFieldDisplayValue,
    getFieldValue
} from 'lightning/uiRecordApi';
import {
    RefreshEvent
} from 'lightning/refresh';

export default class CkCaseComment extends LightningElement {

  @track caseID;
  @track listOfComments;
  @track disablePost = true;
  @track renderAgain = false;
  commentValue

  @wire(CurrentPageReference)
  currentPageReference(data) {
      this.caseID = data.state.id;
  };

  @wire(getRelatedListRecords, {
      parentRecordId: '$caseID',
      relatedListId: 'CaseComments',
      fields: ['CaseComment.Id', 'CaseComment.CommentBody', 'CaseComment.CreatedBy.Name','CaseComment.CreatedDate'],
      sortBy: '-CreatedDate',
      where: '{ IsDeleted: { eq:false } }',
  })
  listInfo({
      error,
      data
  }) {
      if (data) {
          const commentList = [];
          data.records.forEach((each) => {
              commentList.push({
                  'id': getFieldValue(each, CASE_COMMENT_ID),
                  'comment': getFieldValue(each, CASE_COMMENT_BODY),
                  'commentedBy': getFieldValue(each, CASE_COMMENT_CREATED_BY_NAME),
                  'dateValue': getFieldDisplayValue(each, CASE_COMMENT_CREATED_DATE)
              });
          })
          if (commentList.length) {
              this.listOfComments = commentList;
          }
          this.error = undefined;
      } else if (error) {
          console.log(error);
          this.error = error;
          this.records = undefined;
      }
  }

  // renderedCallback() {
  //     console.log('Rendered Again');
  // }
  // connectedCallback() {
  //     console.log('First Rendered');
  // }

  handleCommentInput(event) {
      this.commentValue = event.detail.value;
      this.disablePost = !event.detail.value;
  }

    submitComment(_) {
        if (this.commentValue && this.caseID) {
        const fields = {};
        fields[CASE_COMMENT_BODY.fieldApiName] = this.commentValue;
        fields[CASE_COMMENT_PARENT.fieldApiName] = this.caseID;
        const recordInput = {
            apiName: CASE_COMMENT_OBJECT.objectApiName,
            fields
        };
        createRecord(recordInput)
            .then(result => {
                window.location.reload();
                // this.dispatchEvent(new RefreshEvent());
                // this.caseID = 'testing';
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
}
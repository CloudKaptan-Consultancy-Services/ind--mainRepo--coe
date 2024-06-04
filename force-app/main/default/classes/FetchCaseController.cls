/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Arijit
 * @group             : 
 * @testclass         : 
 * @last modified on  : 04-07-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   03-27-2024   Arijit   Initial Version
**/
public with sharing class FetchCaseController {
    
   
    /**
    * @description 
    * @author Arijit | 03-28-2024 
    * @param contactId
    * @return List<Case> 
    **/
    @AuraEnabled(cacheable = true)
    public static List<Case> getAllCases(String contactId){
        try {
            if(String.isBlank(contactId)) {
                contactId = '003U7000005ypG5IAI';
            }
            return [SELECT Id,
                        CaseNumber,
                        Status,
                        Subject,
                        Description,
                        Priority,
                        Contact.Name,
                        Type,
                        Salesforce_Project__c,
                        Product_Name__c
                        FROM Case 
                        WHERE ContactId =:contactId
                        WITH SYSTEM_MODE 
                        ORDER BY CreatedDate DESC
                        LIMIT 200];
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
global class LeadConversionBatch implements Database.Batchable<sObject>, Database.AllowsCallouts {
 
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('SELECT Id, FirstName, LastName, Company, Status, Email, LeadSource, Website, Rating FROM Lead WHERE (Status != \'Qualified\' AND Email_Communications_Consent__c = true AND Subcribed__c = true AND Entered_past_investment_page__c =false AND Net_worth__c > 90000)  ORDER BY CreatedDate DESC');
    }
 
    global void execute(Database.BatchableContext BC, List<Lead> scope) {
        List<Database.LeadConvert> leadConverts = new List<Database.LeadConvert>();
        for (Lead leadRecord : scope) {
            Database.LeadConvert leadConvert = new Database.LeadConvert();
            leadConvert.setLeadId(leadRecord.Id);
            Account convertedAccount = createAccount(leadRecord);
            Contact convertedContact = createContact(leadRecord, convertedAccount);
            Opportunity convertedOpportunity = createOpportunity(leadRecord,convertedAccount,convertedContact);
 
            leadConvert.setAccountId(convertedAccount.Id);
            leadConvert.setContactId(convertedContact.Id);
            leadConvert.setOpportunityId(convertedOpportunity.Id);
            leadConvert.setOpportunityName('Opportunity for ' + leadRecord.FirstName + ' ' + leadRecord.LastName);
            leadConvert.setConvertedStatus('Closed - Converted');
            leadConverts.add(leadConvert);

            leadRecord.Status = 'QUALIFIED';
        }
        List<Database.LeadConvertResult> results = Database.convertLead(leadConverts, false);
        for (Database.LeadConvertResult result : results) {
            if (!result.isSuccess()) {
                System.debug('Error converting lead: ' + result.getErrors()[0].getMessage());
            } else {
                // Process successfully converted records
                System.debug('Lead converted successfully: ' + result.getAccountId());
                System.debug('Contact created: ' + result.getContactId());
                System.debug('Opportunity created: ' + result.getOpportunityId());
            }
        }
        update scope;
    }
 
    // Method to create an Account record
    private Account createAccount(Lead leadRecord) {
        Account newAccount = new Account(
            Name = leadRecord.Company,
            AccountSource = leadRecord.LeadSource,
            website = leadRecord.Website
        );
        insert newAccount;
        return newAccount;
    }
 
    // Method to create a Contact record
    private Contact createContact(Lead leadRecord, Account acc) {
        Contact newContact = new Contact(
            FirstName = leadRecord.FirstName,
            LastName = leadRecord.LastName,
            AccountId = acc.Id,
            email = leadRecord.Email
        );
        insert newContact;
        return newContact;
    }
 
    // Method to create an Opportunity record
    private Opportunity createOpportunity(Lead leadRecord, Account acc , Contact con) {
        Opportunity newOpportunity = new Opportunity(
            Name = leadRecord.Company,
            closedate = System.today() + 30,
            stagename = 'Qualification',
            AccountId = acc.Id,
            ContactId = con.Id,
            leadSource = leadRecord.LeadSource
        );
        insert newOpportunity;
        return newOpportunity;
    }
 
    global void finish(Database.BatchableContext BC) {
    }
}
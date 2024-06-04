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
 * 1.0   03-31-2024   Arijit   Initial Version
**/
public with sharing class FileUploaderController {

    /**
     * @description : Creates a content version from a given file's base64 and name
    * @author Arijit | 03-31-2024 
    * @param baseSixtyFourString - base64 string that represents the file
    * @param filename - full file name with extension, i.e. 'products.csv'
    * @param recordId - Id of the record you want to attach this file to
    * @return String 
    **/
    @AuraEnabled
    public static String uploadFile(String baseSixtyFourString, String filename, String recordId) {
        ContentVersion cv = createContentVersion(baseSixtyFourString, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        return cdl.Id;
    }

/**
  * @description : Creates a content version from a given file's base64 and name
  * @author Arijit | 03-31-2024 
  * @param baseSixtyFourString - base64 string that represents the file
  * @param filename - full file name with extension, i.e. 'products.csv'
  * @return ContentVersion - returns the newly created ContentVersion, or null
  **/
    private static ContentVersion createContentVersion(String baseSixtyFourString, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(baseSixtyFourString);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
            Database.insert(cv,AccessLevel.SYSTEM_MODE);
            return cv;
        } catch(DMLException ex) {
            // System.debug(e);
            return null;
        }
    }

/**
  * @description 
  * @author Arijit | 03-31-2024 
  * @param contentVersionId 
  * @param recordId 
  * @return ContentDocumentLink 
  **/
    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [
                                    SELECT ContentDocumentId 
                                    FROM ContentVersion 
                                    WHERE Id =: contentVersionId
                                ].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        // ShareType is either 'V', 'C', or 'I'
        // V = Viewer, C = Collaborator, I = Inferred
        cdl.ShareType = 'V';
        try {
            Database.insert(cdl,AccessLevel.SYSTEM_MODE);
            return cdl;
        } catch(DMLException e) {
            return null;
        }
    }

    /**
    * @description 
    * @author Arijit | 04-03-2024 
    * @param recordId 
    * @return List<String> 
    **/
    @AuraEnabled(cacheable=true)
    public static Map<Id, String> fetchCaseRelatedContentDocument(String recordId){
        try {
            Map<ID, String> contentDocIdVsTitleMap = new Map<ID, String>();
            List<String> contentDocumentIdList = new List<String>();
            for(ContentDocumentLink eachConDocLink: [SELECT Id,
                                                            ContentDocumentId
                                                        FROM ContentDocumentLink 
                                                        WHERE linkedEntityId =: recordId 
                                                        WITH SYSTEM_MODE LIMIT 200 ]) {
                contentDocumentIdList.add(eachConDocLink.ContentDocumentId);
            }
            List<ContentVersion> contentDocs = [SELECT ContentDocumentId, 
                                                        FileExtension, 
                                                        Title 
                                                    FROM ContentVersion 
                                                    WHERE ContentDocumentId IN : contentDocumentIdList 
                                                    WITH SYSTEM_MODE
                                                    LIMIT 200];
            for (ContentVersion docLink : contentDocs) {
                contentDocIdVsTitleMap.put(docLink.ContentDocumentId, docLink.Title);
            }
            return contentDocIdVsTitleMap;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
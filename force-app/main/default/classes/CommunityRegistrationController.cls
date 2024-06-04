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
 * 1.0   04-09-2024   Arijit   Initial Version
**/
public without sharing class CommunityRegistrationController {
    private final static String COMMUNITY_PROFILE_NAME = 'Cloudkaptan Employee User';
    /**
    * @description 
    * @author Arijit | 04-09-2024 
    * @param customerData 
    * @return string 
    **/
    @AuraEnabled
    public static string handleRegistration(String customerData){
        ApexPages.PageReference pageRef;
        Savepoint sp = Database.setSavepoint();
        try {
            Map<String, Object> customerDataObj = (Map<String,Object>)JSON.deserializeUntyped(customerData);
            Map<String,String> customerDataMap = convertToMapString(customerDataObj);
            Account acc = new Account();
            acc.Name  = customerDataMap.get('firstName') + ' ' + customerDataMap.get('lastName');
            Database.SaveResult sr = Database.insert(acc, AccessLevel.SYSTEM_MODE);

            if(!sr.isSuccess()) {
                throw new AuraException(JSON.serialize(sr.getErrors()));
            }

            List<Profile> profileList = [SELECT ID 
                                            FROM Profile 
                                            WHERE Name =:COMMUNITY_PROFILE_NAME 
                                            WITH SYSTEM_MODE
                                            LIMIT 1];
            if(profileList.isEmpty()) {
                throw new AuraException('No Matching Profile Found');
            }


            User us = new User();
            us.username = customerDataMap.get('email');
            us.email = customerDataMap.get('email');
            us.FirstName = customerDataMap.get('firstName');
            us.LastName = customerDataMap.get('lastName');
            us.CommunityNickname = customerDataMap.get('email');
            us.profileId = profileList[0].Id;

            String userId = Site.createExternalUser(us, sr.getId(), customerDataMap.get('password'),true);

            if(String.isNotBlank(userId)) {
                pageRef = Site.login(us.Username, customerDataMap.get('password'), Site.getBaseCustomUrl());
                return pageRef.getUrl();
            } else {
                throw new AuraException('User Creation Failed');
            }
        } catch (Exception ex) {
            Database.rollback(sp);
            throw new AuraHandledException(ex.getMessage());
        }
    }

    /**
    * @description : Convert Map<String,Object> to Map<String, String>
    * @author Arijit | 04-09-2024 
    * @param customMap 
    * @return Map<String, String> 
    **/
    private static Map<String,String> convertToMapString(Map<String, Object> customMap) {
        Map<String,String> mapData = new Map<String,String>();
        for(String eachS: customMap.keySet()) {
            mapData.put(eachS, String.valueOf(customMap.get(eachS)));
        }
        return mapData;
    }
}
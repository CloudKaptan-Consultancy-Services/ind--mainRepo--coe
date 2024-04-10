/**
 * @description Sample Class for CiCd
 */
public with sharing Class DeploySampleController{
    /**
     * @description Sample Method
     */
    public void deployMethod(){

        List<Account> accList = new List<Account>();

        if(Account.SObjectType.getDescribe().isAccessible() && Schema.SObjectType.Account.fields.Id.isAccessible() &&
           Account.SObjectType.getDescribe().isAccessible() && Schema.SObjectType.Account.fields.name.isAccessible()) {

            accList = [Select id,name from Account limit 1];
        
        }
        if(Account.SObjectType.getDescribe().isAccessible() && Schema.SObjectType.Account.fields.Id.isUpdateable()){

            update accList;

        }
    }
}
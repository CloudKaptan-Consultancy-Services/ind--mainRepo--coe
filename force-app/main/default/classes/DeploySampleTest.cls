//Sample Test Class
@isTest
private class DeploySampleTest{
    static testMethod void deployCheck() {
    
        Account acc = new Account();
        acc.Name = 'TestName';
        
        Test.startTest();
        
        insert acc;
        
        DeploySample obj = new DeploySample();
        obj.deployMethod();
        
        Test.stopTest();
        
    }
}
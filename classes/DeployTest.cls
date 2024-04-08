//Sample test class
@isTest
private class DeployTest{
    static testMethod void deployMethod() {
    
        Account acc = new Account();
        acc.Name = 'TestName';
        
        Test.startTest();
        
        insert acc;
        
        Deploy obj = new Deploy();
        obj.deployMethod();
        
        Test.stopTest();
        
    }
}
//Sample Test Class
@isTest
private class DeploySampleTest{
    @isTest
    static void deployCheck() {
    
        Account acc = new Account();
        acc.Name = 'TestName';
        
        Test.startTest();
        
        insert acc;
        
        DeploySample obj = new DeploySample();
        obj.deployMethod();
        
        Test.stopTest();
        
    }
}
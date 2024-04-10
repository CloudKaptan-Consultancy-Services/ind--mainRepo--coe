//Sample Test class for CI/CD
@isTest
private class DeploySampleTest{
    @isTest
    static void deployCheck() {
    
        Account acc = new Account();
        acc.Name = 'TestName';
        
        Test.startTest();
        
        insert acc;
        
        DeploySampleController obj = new DeploySampleController();
        obj.deployMethod();

        List<Account> accList = [Select id,name from Account limit 1];
        System.assertEquals('TestName', accList[0].Name, 'Name Does Not Match');
        
        Test.stopTest();
        
    }
}
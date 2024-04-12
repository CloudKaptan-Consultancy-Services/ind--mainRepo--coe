public class TestApexGit {

     public static void testApexGitMethod()
     {
         list<account> updateAccountRecord=new list<account>();
         list<account> accList=[select id,name,phone,Git__c,Github__c,Owner.name from Account where Git__c=False and Github__c=false and Owner.name='Vivek Agrawal' limit 10];
         for(account acc:accList)
         {
             acc.Git__c=true;
             acc.Github__c=false;
             acc.phone='7779858349';
             updateAccountRecord.add(acc);
         }
         update updateAccountRecord;
     }
}
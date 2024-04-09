//Sample Class
Global Class DeploySample{
    global void deployMethod(){
        List<Account> accList = [Select id,name from Account limit 1];
        update accList;
    }
}
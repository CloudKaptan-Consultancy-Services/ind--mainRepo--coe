<<<<<<< Updated upstream
//Sample Class
=======
//Sample class
>>>>>>> Stashed changes
Global Class Deploy{
    global void deployMethod(){
        List<Account> accList = [Select id,name from Account limit 1];
        update accList;
    }
}
public with sharing class accountHelper {
    @AuraEnabled(cacheable=false)
    public static Account insertAccount(string name,string type, string industry){
        try {
            Account ac = new Account();
            ac.Name = name;
            ac.Type= type;
            ac.Industry= industry;

            insert ac;
			System.debug(ac.Id);
            return ac ;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        try {
            List<Account> acc=[select Id,name , type , industry from account order by createdDate desc limit 10 ];
            System.debug(acc);
            return acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
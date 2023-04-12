public with sharing class accountHelper {
    @AuraEnabled(cacheable=false)
    public static List<Account> updateAccount(String name , String type, String industry){
        try {
            System.debug(name);
            System.debug(type);
            List<Account> accTypeIndustry = [SELECT id, name , type , industry FROM Account];
            for(Account acc: accTypeIndustry){
                if(acc.Name == name){
                    System.debug(acc.Name);
                    acc.Type = type;
                    acc.Industry = industry;
                }
                
            }
            update accTypeIndustry;
            System.debug(accTypeIndustry);
            return accTypeIndustry;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=false)
    public static List<Account> fetchAccountsList(){
        try {
            List<Account> acc=[select name,type,industry from account order by createdDate desc limit 10 ];
            //System.debug(acc);
            return acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
@RESTResource(UrlMapping='/GetContact/')
global class createAccount {
    
    public class responseWrapper
    {
        public string FirstName;
        public String LastName;
    }
    
    @HTTPPost
    global static void createContact()
    {
        RestRequest req=RestContext.request;
        RestResponse res=RestContext.response;
        
        string jsonBody=req.requestBody.toString();
        responseWrapper resWrap = (responseWrapper)JSON.deserialize(jsonBody,responseWrapper.class);
        //string fname=(string)nmap.get('FirstName');
        //string lname=(String)nmap.get('LastName');
        
        string fName=resWrap.FirstName;
        string lName=resWrap.LastName;
            
        Contact c=new Contact();
        c.FirstName=fname;
        c.LastName=lname;
        insert c;    
        Map<String,Object> nMap1=new Map<String,Object>();
        nmap1.put('RecordId',c.Id);
        res.addHeader('Content-Type', 'application/json');
        res.responseBody = Blob.valueOf(JSON.serialize(nMap1));
 
        
    }
}
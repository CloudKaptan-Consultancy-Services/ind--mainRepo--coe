public class OmniStudioCustomFuntion implements Callable
{
    public Object call(String action, Map<String, Object> args) {

        Map<String, Object> input = (Map<String, Object>)args.get('input');
        Map<String, Object> output = (Map<String, Object>)args.get('output');
        Map<String, Object> options = (Map<String, Object>)args.get('options');

        return invokeMethod(action, input, output, options);
    }
    
    Boolean invokeMethod(String methodName, Map<String, Object> inputs, Map<String, Object> output, Map<String, Object> options)
    {
        if (methodName == 'convertCSV')
        {
            List<Object> arguments = (List<Object>)inputs.get('arguments');
            output.put('result', convertCSV(arguments));
        }
        return true;
    }
    
    List<Map<String,String>> convertCSV(List<Object> arguments)
	{
       List<String> contentVersionIdList = new List<String>();
       for(Object each : arguments)
       {
           contentVersionIdList.add(String.valueOf(each));
       }
       List<ContentVersion> contentVersionInstanceList = [Select VersionData FROM ContentVersion WHERE Id IN: contentVersionIdList];
       List<Map<String,String>> fileDataList = new List<Map<String,String>>();
       for(ContentVersion eachVersion : contentVersionInstanceList)
       {
           List<String> eachLine = eachVersion.VersionData.toString().split('\n');
           List<String> columnName = eachLine[0].split(',');
           eachLine.remove(0);
           Map<String,String> eachNode; 
           integer counter = 0;
           for (String eachDataLine : eachLine)
           {
               eachNode = new Map<String,String>();
               List<String> eachDataValues = eachDataLine.split(',');
               for(String eachValue : eachDataValues)
               {
                   eachNode.put(columnName[counter++].stripHtmlTags(),eachValue.stripHtmlTags());  
                   System.debug(eachNode);
               }
               counter = 0;
               fileDataList.add(eachNode);
               System.debug(fileDataList);
           }
       }
       return fileDataList;
    }
}
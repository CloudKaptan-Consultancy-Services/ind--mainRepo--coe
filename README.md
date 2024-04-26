# ind--mainRepo--coe
Version control of all POC related work

# Script to generate records
sfdx sfdmu:run --sourceusername sourceusername --targetusername csvfile

# Script to get secret url
sfdx force:org:display -u targetOrgAlias --verbose

# Sales Cloud :

# Post Deployment Steps :

1. Add Queue members to the queues manually.
2. Set the Deliverability -> Access to Send Email (All Email Services) to All Email.
3. Turn on the Einstein Lead scoring.
4. Add Einstien Scoring component to the Lead Lighting record Page.
5. Einstein Sales Email :
   a. First turn on Einstein for Sales in Setup.​
   b. Assign Einstein Sales Emails permission set to the required users.
   c. Once the setup is complete, opening the Email Composer shows a new button to "Draft with Einstein".​
    Referrence :https://cloudkaptan-my.sharepoint.com/:p:/p/sanjukta_chanda/EQbyo4JQmaFDvSch7pfu5CcB1iKSNm8sfJiicyTbfA1H0A?e=ZV2QJp

6. Einstein Conversation Summaries :
    1. Go to the Einstein Work Summaries page in Setup.
    2. Turn on Work Summaries.
    3. click the Conversation Catch-Up tab, and 
    4. then turn on summaries for agents, supervisors, or both.

7. Einstein Knowledge Creation
    1. From Setup, in the Quick Find box, enter Knowledge Creation, and then select Einstein Knowledge Creation.
    2. Turn on Knowledge Creation.
    3. Go to from Map Responses to Knowledge Fields, on the Knowledge Creation setup page, select Edit.
    4. To add and map fields, click Add Field. Select the Knowledge field and map it to a corresponding response.
    5. Assign your selected agents the Einstein Knowledge Creation permission set. The permission set is included with the   Einstein for Service add on.
    

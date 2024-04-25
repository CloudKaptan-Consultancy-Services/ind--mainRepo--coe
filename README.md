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
    a. Go to the Einstein Work Summaries page in Setup.
    b. Turn on Work Summaries.
    c. click the Conversation Catch-Up tab, and 
    d. then turn on summaries for agents, supervisors, or both.


###SERVICE CLOUD
##Post Deployment Steps 

* Queues :
Setup -> Queues -> Edit 'Servicing General Support' queue -> Add Admin Service Cloud User(Arnab Mukherjee) in Queue Member section

* Case Escalation rules :
Setup -> Escalation Rules -> Click on Rule 'Escalation to Critical Priority' -> Click on Rule Entry -> Edit Escalation Action -> 
    Add Admin Service Cloud User in 'Notify This User field' & Add SUPPORT-Case escaltion email template in 'Notification Template field'

* Chat setup & Omni-Channel Live Chat :
Navigate to Gear Icon -> Service Setup -> In Recommended Setup , click on View All -> Type and choose 'Chat with Customers' -> Click Start 
    -> Queue Name- WebChatQueue , Group- WebChatGroup 
    -> Next -> RoutingConfigName -> Web_Chat_Config, Priority-1 -> Next 
    -> Next -> Put website Url where you want to embed chat
    -> Next -> 'Service' -> Next -> Finish
Setup -> Presence Configuartions -> Edit and mark as true 'Allow agents to decline work requests'

* Einstein Bot 
Setup -> Chat Buttons and Automated Invitations -> A chat button is created, note the name
Setup -> Einstein Bots -> Toggle to Enable Einstein Bot 
Setup -> Einstein Bots -> Click on 'Alice' Einstein Bot -> Click on Dialog dropdown and select 'Overview' 
    -> In 'Connections' Section -> Click on Add button -> Choose 'Chat' from dropdown -> Enter noted Chat button here -> Save
    -> Scroll down and Edit Bot User to Custom ChatBot User- Select Active Admin Service Cloud user -> Activate Einstein Bot

* Omnichannel skillbased routing
Setup -> Quick Find box -> Omni-Channel Settings -> Enable Skills-Based and Direct-to-Agent Routing -> Save
Setup -> Quick Find box -> Click on Field Service Settings -> Enable Field Service -> click Save
Setup -> Quick Find box -> Omni-Channel -> Skills -> New Button -> Enter Name-Spanish, Assign Users-Arnab, Assign Profile -Admin
App Launcher -> Service Resource -> Open the present record , Assign User- Arnab. Make sure it is active. Click Save.
Scroll to the Service Resource Skills related list and click New -> Select skill -> Enter a start date -> Click Save.
Service Setup -> Skills-Based Routing Rules -> Click New Skill Mapping Set -> Enter Name,DeveloperName - Spanish, Object- Case
    Select the fields to use for routing your cases - select 'Type' -> Next -> put the field value and 'Spanish' skill -> Done. 
Setup -> Routing Configurations -> Edit the routing configuration that is used with omni-channel -> Select 
    Use with Skills-Based Routing Rules. Select Save.

* Omni- Channel Supervisor :
Setup -> Supervisor -> Supervisor Settings -> Enable all checkboxes in Conversation Monitoring Section.

* Einstein Case Classification & Case Wrap-Up: 
Setup -> Einstein Classification -> click the toggle to enable
To configure Classification Model : Click on New Model button -> Enter Name and APIName -> Click 'Next' & select 'Yes, use all case data'
    -> Click 'Next' & 'Yes, learn from all recently closed cases' -> Click Next and for 'Select Fields to predict' select 'Case Type' & 'Priority'
    -> Click Finish
On the Model Setup Page -> Click on 'Build' button -> After the model finishes building, you can configure each field's prediction settings.Click on Edit to Recommend/Automate values.
Then, activate the model to start showing recommendations in the Service Console.

* Einstein Next Best Action
Setup -> Flows -> Activate 'Update Case Status' Flow
App Launcher -> Recommendations -> Open 'Update Case Status' Recommendation -> Verify 'Is Action Active' is true -> Copy Recommendation RecordId
Setup -> Next Best action -> Open the 'Case Stratergy' Stratergy -> Click on 'Load' element -> In Recommendation conditions to be met , paste the Recommendation RecordId 
    such that Id equals Recommendation RecordId . -> Save Stratergy
Add the Next Best Action Component to the Lightning Service Console : App Launcher -> Service Console -> Navigate to Cases -> Open a case record -> Click on gear icon -> Click Edit Page 
-> Type 'Next best Action' component and drag & drop to Case Record Page -> Choose 'Update Case Status' component in the Next Best Action component -> Save 

* Einstein Article Recommendations
Setup -> Einstein Article Recommendations -> Toggle it ON.
Select which supported languages to include in your model. 
Select fields on cases and knowledge articles that Einstein will use to identify relevant articles.
Build and activate your article recommendation model.
Add the Knowledge Component to the Lightning Service Console : App Launcher -> Service Console -> Navigate to Cases -> Open a case record -> Click on gear icon -> Click Edit Page 
    -> Type 'Knowledge' component and drag & drop to Case Record Page -> Save 

* Service Console
Setup -> App Manager -> Service Console App -> Edit -> User Profile -> Verify and add System Admin profile if not added -> Save.

* Einstein Service Replies for Email
Setup ->  Inbox  -> Setup Assistant -> Toggle to disable Salesforce Inbox for all users
Setup > Feature Settings > Service > Toggle Service AI Grounding
Setup > Feature Settings > Service > Service Cloud Einstein > Toggle Einstein Service Replies for Email
Make sure you have the “Email Response User” permission set assigned to your user.

* Einstein Service Replies for Chat
Setup > Feature Settings > Service > Service Cloud Einstein > Toggle Einstein Reply Recommendations.
Ensure you have the “Service Replies User” permission set assigned to your user.

* Email-to-case
Confirm that your case page layout includes the Email quick action.
Setup -> Quick Find box -> Support Settings -> Select a Default Case Owner and an Automated Case User. 
Setup -> Quick Find box -> Email-to-Case -> Click on Email-to-Case -> Edit -> Mark Email-to-Case as true, Enable On-Demand Service

* Web-to-case
Setup -> Quick Find box -> Web-to-Case -> Mark Enable Web-To-Case as true. You can also enable the ReCAPTCHA Verification as well.
Setup -> Quick Find box -> Web-To-Case HTML Generator -> Select which all field you want to show in form from available fields. 
    -> Enter the URL hat the user will be returned to. Example- Any welcome page -> Click on Generate and copy the HTML Code to use in your website/portal.

* Knowledge
Make sure you have the “Knowledge” license.
Navigate to Gear Icon -> Service Setup -> In Recommended Setup , click on View All -> Type and choose 'Knowledge Setup' 
    -> Start -> Choose Your Lightning Knowledge Authors -> Add Admin Service Cloud User -> Next -> Next -> Finish
App Launcher -> Knowledge -> Click 'New' button -> FAQ -> Title, Url, Question -'How to apply for Top-up?',Answer-Any Answer
    -> Leave other fields as it is -> Save. -> To publish Knowledge Article click on 'Publish' lightning button.


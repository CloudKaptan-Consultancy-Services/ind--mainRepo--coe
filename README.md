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

# SERVICE CLOUD

# Post Deployment Steps 

* Queues :
Setup -> Queues -> Edit 'Servicing General Support' queue -> Add Admin Service Cloud User(Arnab Mukherjee) in Queue Member section

* Case Escalation rules :
Setup -> Escalation Rules -> Click on Rule 'Escalation to Critical Priority' -> Click on Rule Entry -> Edit Escalation Action -> 
    Add Admin Service Cloud User in 'Notify This User field' & Add SUPPORT-Case escaltion email template in 'Notification Template field'

* Chat setup & Omni-Channel Live Chat :
Navigate to Gear Icon -> Service Setup -> In Recommended Setup , click on View All -> Type and choose 'Chat with Customers' -> Follow the Guided Setup Steps
Click Start -> Queue Name- WebChatQueue , Group- WebChatGroup 
    -> Next -> RoutingConfigName -> Web_Chat_Config, Priority-1 -> Next 
    -> Next -> Put website Url where you want to embed chat
    -> Next -> 'Service' -> Next -> Finish

* Omnichannel skillbased routing
Setup -> Quick Find box -> Omni-Channel Settings -> Enable Skills-Based and Direct-to-Agent Routing -> Save
Setup -> Quick Find box -> Click on Field Service Settings -> Enable Field Service -> click Save
Setup -> Quick Find box -> Omni-Channel -> Skills -> Edit 'Spanish' Skill -> Add User-Arnab
New Button -> Enter Name-Spanish, Assign Users-Arnab, Assign Profile -Admin
App Launcher -> Service Resource -> New Button -> Name-Alex , User- Arnab, Resource Type-Agent, Active-true. Save.
Edit Service Resource Page Layout ,Click Related Lists and drag Service Resource Skills.

* Omni- Channel Supervisor :
Setup -> Supervisor -> Supervisor Settings -> Enable all checkboxes in Conversation Monitoring Section.

* Einstein Bot 
Make sure 'All Sites' is enabled.
Setup -> Einstein Bots -> Toggle Einstein Bot ON -> Create a New Bot -> Make simple bot from scratch and follow steps.

* Einstein Case Classification & Case Wrap-Up: 
Setup -> Einstein Classification -> click the toggle to enable
To configure Classification Model : Click on New Model button -> Enter Name and APIName -> Click 'Next' & select 'Yes, use all case data'
    -> Click 'Next' & 'Yes, learn from all recently closed cases' -> Click Next and for 'Select Fields to predict' select 'Case Type' & 'Priority'
    -> Click Finish
On the Model Setup Page -> Click on 'Build' button -> After the model finishes building, you can configure each field's prediction settings.Click on Edit to Recommend/Automate values.
Then, activate the model to start showing recommendations in the Service Console.

* Einstein Next Best Action
Setup -> Flows -> Activate 'Update Case Status' Flow
App Launcher -> Recommendations -> 'New Button' -> Name-'Update Case Status',Action-Update Case Status,put other required fields, Save
Setup -> Next Best action -> Open the 'Case Stratergy' Stratergy -> Click on 'Load' element -> In Recommendation conditions to be met , paste the Recommendation RecordId of the record you just created
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





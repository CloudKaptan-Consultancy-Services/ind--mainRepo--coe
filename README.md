# ind--mainRepo--coe
Version control of all POC related work

# Script to generate records
sfdx sfdmu:run --sourceusername sourceusername --targetusername csvfile

# Script to get secret url
sfdx force:org:display -u targetOrgAlias --verbose
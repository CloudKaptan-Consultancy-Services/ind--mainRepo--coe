# --------------------------------------------------------------------------------------------------------------
# Description : The purpose of this shell script is to push the sfdmu data to the destination org.
# Author : Kiranmoy Pradhan
# Date : 28/02/2024
# --------------------------------------------------------------------------------------------------------------

# Function to run sfdmu process and push data into destonation org
function runSfdmuDataPush() {
    local authOrgAlias=$1
    local productionDomain=$2
    local sourceUsername="csvfile"
    local csvDataPath="./cicd-utils/sfdmu/firstrun"
    local targetUsername=$authOrgAlias

    # Store the current directory
    local originalDir=$(pwd)

    echo "---------------------------------------------------------------------------------------------------"
    echo "|                                           SFDMU Data Push                                       |"
    echo "---------------------------------------------------------------------------------------------------"
    # Change directory to cicd-utils/sfdmu/firstrun
    cd cicd-utils/sfdmu/firstrun || { echo "Failed to change directory to cicd-utils/sfdmu/firstrun"; exit 1; }

    # Run sfdmu process based on source org alias
    if [ "$authOrgAlias" = "Production" ]; then
        echo "$productionDomain" | sf sfdmu:run --sourceusername "$sourceUsername" --targetusername "$targetUsername" --usesf
    else
        yes y | sf sfdmu:run --sourceusername "$sourceUsername" --targetusername "$targetUsername" --usesf
    fi

    # Handling MissingParentRecordsReport.csv
    if [ -f MissingParentRecordsReport.csv ]; then
        cat MissingParentRecordsReport.csv
        cp MissingParentRecordsReport.csv ../../../pipeline-artifacts || { echo "Failed to copy MissingParentRecordsReport.csv to pipeline artifacts directory."; exit 1; }
    else
        echo "MissingParentRecordsReport.csv not found."
    fi

    # Handling CSVIssuesReport.csv
    if [ -f CSVIssuesReport.csv ]; then
        cat CSVIssuesReport.csv
        cp CSVIssuesReport.csv ../../../pipeline-artifacts || { echo "Failed to copy CSVIssuesReport.csv to pipeline artifacts directory."; exit 1; }
    else
        echo "CSVIssuesReport.csv not found."
    fi

    # Return to the original directory
    cd "$originalDir" || { echo "Failed to return to the original directory."; exit 1; }
}

# Call the function with appropriate parameters
runSfdmuDataPush "$AUTH_ORG_ALIAS" "$PROD_ORG_DOMAIN"
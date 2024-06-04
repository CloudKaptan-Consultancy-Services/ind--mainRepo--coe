/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Arijit
 * @group             : 
 * @testclass         : 
 * @last modified on  : 04-07-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   03-31-2024   Arijit   Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
// import FORM_FACTOR from '@salesforce/client/formFactor';
import HAMBURGER_ICON from '@salesforce/resourceUrl/marketingHamburgerIcon';
import X_ICON from '@salesforce/resourceUrl/marketingXIcon';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import USER_ID from "@salesforce/user/Id";
import USER_NAME from "@salesforce/schema/User.Name";
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import basePath from '@salesforce/community/basePath';

export default class CkHeader extends NavigationMixin(LightningElement) {
    @api menuName;
    @api buttonLabel;
    @api buttonRedirectPageUrl;

    @track isGuestUser = isGuestUser;
    @track userId = USER_ID;
    @track userName;

    error;
    @track menuItems = [];
    publishedState;
    isLoaded;

    @track logoutLink;

    hamburgerIcon = HAMBURGER_ICON;
    xIcon = X_ICON;
    href = basePath;
    showHamburgerMenu;


    handleHamburgerMenuToggle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.showHamburgerMenu) {
            this.showHamburgerMenu = false;
        } else {
            this.showHamburgerMenu = true;
        }
    }


    handleBtnClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.buttonRedirectPageUrl
            }
        });
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app =
            currentPageReference &&
            currentPageReference.state &&
            currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }

    @wire(getRecord,({recordId:'$userId', fields:[USER_NAME]}))
    getUser({data, error}){
        if(data) {
            this.userName = getFieldValue(data, USER_NAME);
        }
    };

    handleSelection(event){
        this.showHamburgerMenu = false;
        const updatedMenuItems = [];
        this.menuItems.forEach((eachData) => updatedMenuItems.push({...eachData,isSelected:event.detail === eachData.target}));
        this.menuItems = updatedMenuItems;
    }

    handleLogout(){
        // site prefix is the community basePath without the trailing "/s"
        const sitePrefix = basePath.replace(/\/s$/i, ""); 
        window.location.href = sitePrefix + "/secur/logout.jsp";

        // this[NavigationMixin.Navigate]({
        //     type:"comm__Login",
        //     attributes:{
        //         action:'logout'
        //     }
        // });
    }
    @wire(getNavigationMenuItems, {
        menuName: '$menuName',
        publishedState: '$publishedState'
    })
    wiredMenuItems({error, data}){
        if(data && !this.isLoaded) {
            this.menuItems = data.map((item, index) => {
                    return {
                        target: item.Target,
                        id: index,
                        label: item.Label,
                        defaultListViewId: item.DefaultListViewId,
                        type: item.Type,
                        accessRestriction: item.AccessRestriction,
                        isSelected : item.Target === "/"
                    }
                }).filter((item) => {
                    // Only show "Public" items if guest user
                    return (
                        item.accessRestriction === 'None' ||
                        (item.accessRestriction === 'LoginRequired' && 
                            !isGuestUser)
                    )
                })
                this.error = undefined;
                this.isLoaded = true;
        }else if(error){
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
        }
    }
}
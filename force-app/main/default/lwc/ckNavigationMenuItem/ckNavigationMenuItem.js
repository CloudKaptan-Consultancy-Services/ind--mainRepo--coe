/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Arijit
 * @group             : 
 * @testclass         : 
 * @last modified on  : 04-08-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   04-01-2024   Arijit   Initial Version
**/
import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class CkNavigationMenuItem extends NavigationMixin(LightningElement) {
    /**
     * The NavigationMenuItem from the Apex controller,
     * contains a label and a target.
     */
    @api item = {};
    @api isSelected = false;
    @track href = '#';
    @track variant = 'base';

    /**
     * the PageReference object used by lightning/navigation
     */
    pageReference;
    renderedCallback() {
        // if((this.isSelected && this.variant) || (!this.isSelected && !(this.variant==='base'))){
        //     return;
        // }
        if(this.isSelected) {
            this.variant = 'base';
        } else {
            this.variant = 'base';
        }
    }
    connectedCallback() {
        const { type, target, defaultListViewId} = this.item;
        if(this.isSelected) {
            this.variant = "is-selected";
        }
        if(type === 'InternalLink') {
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: basePath + target
                }
            };
        }

        if (this.pageReference) {
            this[NavigationMixin.GenerateUrl](this.pageReference).then(
                (url) => {
                    this.href = url;
                }
            );
        }
    }

    handleNavigation() {
        this.dispatchEvent(new CustomEvent('navigation'));
    }

    handleClick(evt) {
        // use the NavigationMixin from lightning/navigation to perform the navigation.
        evt.stopPropagation();
        evt.preventDefault();
        this.handleNavigation();
        if (this.pageReference) {
            this.dispatchEvent(new CustomEvent('tabselected',{bubbles: true,detail: this.item.target}));
            this[NavigationMixin.Navigate](this.pageReference);
        } else {
            console.log(
                `Navigation menu type "${
                    this.item.type
                }" not implemented for item ${JSON.stringify(this.item)}`
            );
        }
    }
}
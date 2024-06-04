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
 * 1.0   03-27-2024   Arijit   Initial Version
**/
import { LightningElement, api, wire } from 'lwc';
import { getContent } from 'experience/cmsDeliveryApi';
import siteId from '@salesforce/site/Id';
import basePath from '@salesforce/community/basePath';

export default class CkCarouselItem extends LightningElement {
    @api contentId;
    title;
    bannerImage;
    bannerMainTitle;
    bannerSubTitle;
    buttonTitle;
    urlRedirectionLink;

    url;

    ariaHidden = 'true';
    ariaLabelledby;
    initialRender = true;
    tabIndex = '-1';

    _selected;

    data;

    altText;

    @wire(getContent, {channelOrSiteId: siteId, contentKeyOrId: '$contentId'})
    onGetContent({data, error}) {
        if (data) {
            const {
                contentKey,
                contentBody: {
                    altText,
                    Title,
                    Banner_Main_Title,
                    Banner_Sub_Title,
                    Banner_Image: {
                        url
                    }
                }
            } = data;
            // this.data = result.data;
            this.url = basePath + '/sfsites/c' + url;
            this.altText = altText;
            this.title = Title;
            this.bannerMainTitle = Banner_Main_Title;
            this.bannerSubTitle = Banner_Sub_Title;
        }
    }

    connectedCallback() {
        this.selected = false;
        this.setAttribute('data-handles-touch', true);
    }

    renderedCallback() {
        if (this.initialRender) {
            this.panelElement = this.template.querySelector('div');

            const privateimageregister = new CustomEvent(
                'privateimageregister',
                {
                    bubbles: true,
                    detail: {
                        callbacks: {
                            select: this.select.bind(this),
                            unselect: this.unselect.bind(this),
                            isSelected: this.isSelected.bind(this),
                            setTabIndex: this.setTabIndex.bind(this),
                            setLabelledBy: this.setLabelledBy.bind(this)
                        },
                        contentId: this.panelElement.getAttribute('id'),
                        guid: Math.random()
                    }
                }
            );

            this.classList.add('slds-carousel__panel');
            this.dispatchEvent(privateimageregister);

            this.initialRender = false;
        }
    }

    set selected(value) {
        this._selected = value;

        if (value === true) {
            this.ariaHidden = 'false';
            this.setTabIndex('0');
        } else {
            this.ariaHidden = 'true';
            this.setTabIndex('-1');
        }
    }

    get selected() {
        return this._selected;
    }

    isSelected() {
        return this.selected;
    }

    select() {
        const privateimageselect = new CustomEvent('privateimageselect', {
            bubbles: true,
            composed: true
        });

        this.selected = true;
        this.dispatchEvent(privateimageselect);
    }

    setLabelledBy(value) {
        this.panelElement.setAttribute('aria-labelledby', value);
    }

    setTabIndex(value) {
        this.tabIndex = value;
    }

    unselect() {
        this.selected = false;
    }
}
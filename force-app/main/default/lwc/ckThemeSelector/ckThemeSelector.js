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
 * 1.0   04-03-2024   Arijit   Initial Version
**/
import { LightningElement, track } from 'lwc';
import customCSS from '@salesforce/resourceUrl/customCSS';
import newCSS from '@salesforce/resourceUrl/newCss';
import {
	loadStyle
} from 'lightning/platformResourceLoader';

export default class CkThemeSelector extends LightningElement {
  @track isDarkTheme = false;
  @track themeIcon = "custom:custom3";

  connectedCallback(){
    const isDarkThemeEnabled = localStorage.getItem('theme') === 'dark';
    this.isDarkTheme = isDarkThemeEnabled;  
    this.themeIcon = isDarkThemeEnabled? "custom:custom10" : "custom:custom3";
  }

  handleThemeClick(event) {
		const isDarkTheme = localStorage.getItem('theme') === 'dark';
        var custom = document.querySelectorAll('link');
        custom.forEach((data) => {
        if(data.type==="text/css") {

        if (data.href.endsWith(isDarkTheme ? newCSS: customCSS )) {
            document.head.removeChild(data);
        }}
    })
		Promise.all([
			loadStyle(this, isDarkTheme ? customCSS: newCSS)
		]).then(() => {
			localStorage.setItem('theme', isDarkTheme ? "light" : "dark");
            const isDarkThemeEnabled = localStorage.getItem('theme') === 'dark';
            this.isDarkTheme = isDarkThemeEnabled;  
            this.themeIcon = isDarkThemeEnabled? "custom:custom10" : "custom:custom3";
			console.log('Theme Loaded '+ localStorage.getItem('theme'));
		})
	}
}
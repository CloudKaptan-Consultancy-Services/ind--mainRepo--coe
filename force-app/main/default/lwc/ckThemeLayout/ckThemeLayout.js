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
import {
	LightningElement
} from 'lwc';
import customCSS from '@salesforce/resourceUrl/lightThemeCss';
import newCSS from '@salesforce/resourceUrl/darkTheme';
import {
	loadStyle
} from 'lightning/platformResourceLoader';

/**
 * @slot main-header This is the header slot
 * @slot main-footer This is the footer slot
 * @slot default This is the default slot
 */
export default class CustomThemeLayout extends LightningElement {
	connectedCallback() {
		if (localStorage.getItem('theme') === 'dark') {
			Promise.all([
				loadStyle(this, newCSS)
			]).then(() => {
				console.log('Dark Theme Loaded');
			}).catch(error => {
				console.log(`Error Occured ${error}`);
			})
		} else {
			Promise.all([
				loadStyle(this, customCSS)
			]).then(() => {
				
				console.log('Light Theme Loaded');
			}).catch(error => {
				console.log(`Error Occured ${error}`);
			})
		}
	}
}
const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const pageTitle = '[data-testid=\'page-title\']';
const createCheckButton = '[data-testid=create-check]';
const createEndpointButton = '[data-testid=create-endpoint]';
const createRuleButton = '[data-testid=create-rule]';
const checksFilterInput = '[data-testid=\'filter--input checks\']';
const checksQuestionMark = '[data-testid=\'Checks--question-mark\']';
const checksTooltipContents = '[data-testid=\'Checks--question-mark-tooltip--contents\']';
const createCheckDropdown = '[data-testid=\'checks--column\'] [data-testid=\'dropdown-menu--contents\']';
const createCheckDropdownItem = '[data-testid=\'dropdown-menu--contents\'] [data-testid=create-%ITEM%-check]';
const endpointsFilterInput = '[data-testid=\'filter--input endpoints\']';
const endpointsQuestionMark = '[data-testid=\'Notification Endpoints--question-mark\']';
const endpointsTooltipContents = '[data-testid=\'Notification Endpoints--question-mark-tooltip--contents\']';
const rulesFilterInput = '[data-testid=\'filter--input rules\']';
const rulesQuestionMark = '[data-testid=\'Notification Rules--question-mark\']';
const rulesTooltipContents = '[data-testid=\'Notification Rules--question-mark-tooltip--contents\']';
const firstTimeThresholdCheckCreateButton = '[data-testid=\'checks--column\'] [data-testid=panel--body] [data-testid=button][title=\'Threshold Check\']';
const firstTimeDeadmanCheckCreateButton = '[data-testid=\'checks--column\'] [data-testid=panel--body] [data-testid=button][title=\'Deadman Check\']';

//Create Endpoint Popup
const epPopupEndpointDropdownButton = '[data-testid=endpoint--dropdown--button]';
const epPopupEndpointNameInput = '[data-testid=endpoint-name--input]';
const epPopupEndpointDescriptionText = '[data-testid=endpoint-description--textarea]';
const epPopupCancelButton = '[data-testid=endpoint-cancel--button]';
const epPopupSaveButton = '[data-testid=endpoint-save--button]';


const urlCtx = 'alerting';

class alertsPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: pageTitle},
            {type: 'css', selector: createCheckButton},
            {type: 'css', selector: createEndpointButton},
            {type: 'css', selector: createRuleButton},
            {type: 'css', selector: checksFilterInput},
            {type: 'css', selector: endpointsFilterInput},
            {type: 'css', selector: rulesFilterInput},
        ], urlCtx);
    }


    async getPageTitle(){
        return await this.driver.findElement(By.css(pageTitle));
    }

    async getCreateCheckButton(){
        return await this.driver.findElement(By.css(createCheckButton));
    }

    async getCreateEndpointButton(){
        return await this.driver.findElement(By.css(createEndpointButton));
    }

    async getCreateRuleButton(){
        return await this.driver.findElement(By.css(createRuleButton));
    }

    async getChecksQuestionMark(){
        return await this.driver.findElement(By.css(checksQuestionMark));
    }

    async getChecksFilterInput(){
        return await this.driver.findElement(By.css(checksFilterInput));
    }

    async getChecksTooltipContents(){
        return await this.driver.findElement(By.css(checksTooltipContents));
    }

    static getChecksTooltipContentsSelector(){
        return { type: 'css', selector: checksTooltipContents };
    }

    async getEndpointsQuestionMark(){
        return await this.driver.findElement(By.css(endpointsQuestionMark));
    }

    async getEndpointsFilterInput(){
        return await this.driver.findElement(By.css(endpointsFilterInput));
    }

    async getEndpointsTooltipContents(){
        return await this.driver.findElement(By.css(endpointsTooltipContents));
    }

    static getEndpointsTooltipContentsSelector(){
        return { type: 'css', selector: endpointsTooltipContents };
    }

    async getRulesFilterInput(){
        return await this.driver.findElement(By.css(rulesFilterInput));
    }

    async getRulesQuestionMark(){
        return await this.driver.findElement(By.css(rulesQuestionMark));
    }

    async getRulesTooltipContents(){
        return await this.driver.findElement(By.css(rulesTooltipContents));
    }

    static getRulesTooltipContentsSelector(){
        return { type: 'css', selector: rulesTooltipContents };
    }

    async getFirstTimeThresholdCheckCreateButton(){
        return await this.driver.findElement(By.css(firstTimeThresholdCheckCreateButton));
    }

    async getFirstTimeDeadmanCheckCreateButton(){
        return await this.driver.findElement(By.css(firstTimeDeadmanCheckCreateButton));
    }

    async getCreateCheckDropdownItem(item){
        return await this.driver.findElement(By.css(createCheckDropdownItem.replace('%ITEM%', item)));
    }

    static getCreateCheckDropdownSelector(){
        return { type: 'css', selector: createCheckDropdown }
    }

    async getEpPopupEndpointDropdownButton(){
        return await this.driver.findElement(By.css(epPopupEndpointDropdownButton));
    }

    async getEpPopupEndpointNameInput(){
        return await this.driver.findElement(By.css(epPopupEndpointNameInput));
    }

    async getEpPopupEndpointDescriptionText(){
        return await this.driver.findElement(By.css(epPopupEndpointDescriptionText));
    }

    async getEpPopupCancelButton(){
        return await this.driver.findElement(By.css(epPopupCancelButton));
    }

    async getEpPopupSaveButton(){
        return await this.driver.findElement(By.css(epPopupSaveButton));
    }

}

module.exports = alertsPage;

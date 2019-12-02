const expect = require('chai').expect;
const assert = require('chai').assert;
const { Key, until, By } = require('selenium-webdriver');

const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const dashboardPage = require(__srcdir + '/pages/dashboards/dashboardPage.js');
const basePage = require(__srcdir + '/pages/basePage.js');
const cellEditOverlay = require(__srcdir + '/pages/dashboards/cellEditOverlay.js');

class dashboardSteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.dbdPage = new dashboardPage(driver);
        this.cedOverlay = new cellEditOverlay(driver);
    }

    async nameDashboard(name){
        await this.dbdPage.getPageTitle().then(async elem => {
            await elem.click().then( async () => {
                await this.dbdPage.getNameInput().then(async input => {
                    await input.clear().then(async () => {
                        await input.sendKeys(name + Key.ENTER).then(async () => {
                        });
                    });
                });
            });
        });
    }

    async verifyDashboardLoaded(name){
        await this.dbdPage.isLoaded();
        await this.dbdPage.getPageTitle().then(async title => {
            await title.getText().then(async text => {
                await expect(text).to.equal(name);
            });
        });

    }

    async verifyDashboardCellVisible(name){
        await this.assertVisible(await this.dbdPage.getCellByName(name));
    }

    async verifyDashboardEmptyDocLinkVisible(){
        await this.assertVisible(await this.dbdPage.getEmptyStateTextLink());
    }

    async verifyDashboardEmptyDocLink(link){
        await this.verifyElementAttributeContainsText(await this.dbdPage.getEmptyStateTextLink(),
            'href', link);
    }

    async verifyDashboardEmptyAddCell(){
        await this.assertVisible(await this.dbdPage.getEmptyStateAddCellButton());
    }

    async clickDashboardTimeLocaleDropdown(){
        await this.clickAndWait(await this.dbdPage.getTimeLocaleDropdown());
    }

    async verifyDashboardDropdownContains(items){
        let itemArr = items.split(',');
        for(let i = 0; i < itemArr.length; i++){
            await this.dbdPage.getDropdownMenuItem(itemArr[i].trim()).then(async elem => {
               assert(true, `${await elem.getText()} is in list`);
            }).catch(e => {
               assert(false, `${itemArr[i]} is in list`);
            });
        }
    }

    async verifyDashboardDropdownContainsDividers(labels){
        let labelArr = labels.split(',');
        for(let i = 0; i < labelArr.length; i++){
            await this.dbdPage.getdropdownMenuDivider(labelArr[i].trim()).then(async elem => {
                assert(true, `${await elem.getText()} is in list`);
            }).catch(e => {
                assert(false, `${labelArr[i]} is in list`);
            });
        }
    }

    async clickDashboardRefreshDropdown(){
        await this.clickAndWait(await this.dbdPage.getRefreshRateDropdown());
    }

    async clickDashboardTimeRangeDropdown(){
        await this.clickAndWait(await this.dbdPage.getTimeRangeDropdown());
    }

    async clickCreateCellEmpty(){
        //todo wait for buckets to be loaded ---
        await this.clickAndWait(await this.dbdPage.getEmptyStateAddCellButton(), async() => {
            await this.driver.wait(
                until.elementLocated(By.css(cellEditOverlay.getBucketSelectSearchSelector().selector))
            );
        });
    }

    async verifyCellNotPresent(name){
        await this.assertNotPresent(await dashboardPage.getCellSelectorByName(name))
    }

    async getCellMetrics(name){
        await this.dbdPage.getCellByName(name).then(async cell => {
            await cell.getRect().then(async rect => {
                console.log("DEBUG rect " + JSON.stringify(rect));
            })
        })
    }

    async toggleDashboardCellContextMenu(name){
        await this.clickAndWait(await this.dbdPage.getCellContextToggleByName(name), async () => {
            await this.driver.wait(
                until.elementLocated(By.css(dashboardPage.getCellPopoverContentsSelector().selector))
            );
        })
    }

    async clickDashboardPopOverlayAddNote(){
        await this.clickAndWait(await this.dbdPage.getCellPopoverContentsAddNote(), async () => {
            await this.driver.wait(
                until.elementLocated(By.css(basePage.getPopupBodySelector().selector))
            );
        });
    }

    async verifyEditNotePopupLoaded(){
        await this.assertVisible(await this.dbdPage.getPopupBody());
        await this.verifyElementContainsText(await this.dbdPage.getPopupTitle(), 'Edit Note');
        await this.assertVisible(await this.dbdPage.getNotePopupCodeMirror());
        await this.assertVisible(await this.dbdPage.getPopupDismiss());
        await this.assertVisible(await this.dbdPage.getPopupCancelSimple());
        await this.assertVisible(await this.dbdPage.getPopupSaveSimple());
        await this.assertVisible(await this.dbdPage.getNotePopupNoDataToggle());
        await this.assertVisible(await this.dbdPage.getNotePopupEditorPreview());
    }

    async setCellNotePopupCodeMirrorText(text){
        await this.setCodeMirrorText(await this.dbdPage.getNotePopupCodeMirror(), text);
    }

    async verifyCellNotPopupPreviewContains(text){
        await this.dbdPage.getNotePopupEditorPreviewText().then(async elem => {
           await expect(await elem.getText()).to.include(text);
        });
    }

    async clickCellNotePopupSave(){
        await this.clickAndWait(await this.dbdPage.getPopupSaveSimple());
    }

    async verifyCellHasNoteIndicator(name){
        await this.assertVisible(await this.dbdPage.getCellNoteByName(name));
    }

    async clickCellNoteIndicator(name){
        await this.clickAndWait(await this.dbdPage.getCellNoteByName(name));
    }

    async verifyContentsOfCellNote(text){
        await this.dbdPage.getNotePopoverContents().then(async contents => {
            await expect(await contents.getText()).to.include(text);
        })
    }

    async clickCellTitle(name){
        await this.clickAndWait(await this.dbdPage.getCellTitle(name));
    }

    async verifyCellNotePopoverNotPresent(){
        await this.assertNotPresent(dashboardPage.getNotePopoverSelector());
    }

    async verifyCellContentPopoverItemEditNote(){
        await this.verifyElementContainsText(await this.dbdPage.getCellPopoverContentsAddNote(), 'Edit Note');
    }

    async verifyCellContentPopoverNotPresent(){
        await this.assertNotPresent(dashboardPage.getCellPopoverContentsSelector());
    }

    async verifyCodeMirrorContainsText(text){
        expect(await this.getCodeMirrorText(await this.dbdPage.getNotePopupCodeMirror()))
            .to.include(text);
    }

    async clearCellNotePopupCodeMirror(){
        await this.setCodeMirrorText(await this.dbdPage.getNotePopupCodeMirror(), '');
    }

    async verifyCellNotePopupMarkupPreviewNoText(){
        await this.dbdPage.getNotePopupEditorPreviewText().then(async text => {
            let strText = await text.getText();
             expect(strText.length).to.equal(0);
        });
    }
}

module.exports = dashboardSteps;

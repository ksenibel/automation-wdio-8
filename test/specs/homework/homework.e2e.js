import {getNameField, getEmailField, getPasswordField, getPasswordFieldControl, getLoginButton, getRightNavbar, getUserNameDropdown, 
    getToastMessage, getErrorField} from './functions.js'

import LoginPage from '../../pageobjects/login.page.js';

describe('Homework', async () => {

    beforeEach(async () => {
        await LoginPage.openLoginPage();
    });


    it.skip('Should check if the registration field is displayed correctly', async () => {

        await expect(await LoginPage.nameField).toBeDisplayed();
        await expect(await LoginPage.nameField).toBeEnabled();

        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.emailField).toBeEnabled();

        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeEnabled();

        await expect(await LoginPage.passwordFieldControl).toBeDisplayed();
        await expect(await LoginPage.passwordFieldControl).toBeEnabled();

        await expect(await LoginPage.loginButtonSelector.getText()).toEqual('Zaregistrovat')

        await browser.pause(5000);
    });

    it.skip('Should register the user with valid cridentials', async () => {

        const userFullName = "Test Test ";

        await (await LoginPage.nameField).setValue('Test Test');
        await (await LoginPage.emailField).setValue('993456789@email.cz');
        await (await LoginPage.passwordField).setValue('Czech123');
        await (await LoginPage.passwordFieldControl).setValue('Czech123');
        await (await LoginPage.loginButtonSelector).click();

        await expect(await (await LoginPage.userNameDropdown).getText()).toEqual(userFullName);

        browser.pause(10000);
    });

    it.skip('Should not register the user with existing email', async () => {

        await (await LoginPage.nameField).setValue('Lišák Admin');
        await (await LoginPage.emailField).setValue('da-app.admin@czechitas.cz');
        await (await LoginPage.passwordField).setValue('Czechitas123');
        await (await LoginPage.passwordFieldControl).setValue('Czechitas123');
        await (await LoginPage.loginButtonSelector).click();

        await expect (await (await LoginPage.getToastMessage())).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await (await LoginPage.getErrorField())).toEqual('Účet s tímto emailem již existuje');

        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.loginButtonSelector).toBeDisplayed();

        await browser.pause(5000);
    });

    it('Should not register the user with the wrong password', async () => {

        await (await LoginPage.nameField).setValue('Test Test');
        await (await LoginPage.emailField).setValue('11234@email.cz');
        await (await LoginPage.passwordField).setValue('1234567890');
        await (await LoginPage.passwordFieldControl).setValue('1234567890');
        await (await LoginPage.loginButtonSelector).click();

        await expect(await (await LoginPage.getToastMessage())).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await (await LoginPage.getErrorField())).toEqual('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        await browser.pause(5000);

    });

});
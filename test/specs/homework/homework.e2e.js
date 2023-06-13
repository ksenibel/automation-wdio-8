async function openLoginPage (){
    await browser.reloadSession();
    await browser.url('/registrace');
}

async function getNameField(){
    return $('#name')
}

async function getEmailField(){
    return $('#email')
}

async function getPasswordField(){
    return $('#password')
}

async function getPasswordFieldControl(){
    return $('#password-confirm')
}

async function getLoginButton(){
    return $('.btn-primary')
}

async function getRightNavbar() {
    return $('.navbar-right');
}

async function getUserNameDropdown() {
    return (await getRightNavbar()).$('[data-toggle="dropdown"]')
}

async function getToastMessage() {
    return $('.toast-message')
}

async function getErrorField() {
    return $('.invalid-feedback')
}

describe('Homework', async () => {

    beforeEach(async () => {
        await openLoginPage();        
    });


    it.skip('Should check if the registration field is displayed correctly', async () => {

        const nameField = await getNameField();
        await expect(nameField).toBeDisplayed();
        await expect(nameField).toBeEnabled();

        const emailField = await getEmailField();
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await getPasswordField();
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const passwordFieldControl = await getPasswordFieldControl();
        await expect(passwordFieldControl).toBeDisplayed();
        await expect(passwordFieldControl).toBeEnabled();

        const loginButtonSelector = await getLoginButton();
        await expect(await loginButtonSelector.getText()).toEqual('Zaregistrovat')

        await browser.pause(5000);
    });

    it.skip('Should register the user with valid cridentials', async () => {
       
        const userFullName = "Test Test";

        await (await getNameField()).setValue('Test Test');
        await (await getEmailField()).setValue('9234567@email.cz');
        await (await getPasswordField()).setValue('Czech123');
        await (await getPasswordFieldControl()).setValue('Czech123');
        await (await getLoginButton()).click();

        await expect(await (await getUserNameDropdown()).getText()).toEqual(userFullName);

        browser.pause(10000);
    })

    it.skip('Should not register the user with existing email', async () => {

        const emailField = await getEmailField();
        const passwordField = await getPasswordField();
        const loginButtonSelector = await getLoginButton();

        await (await getNameField()).setValue('Lišák Admin');
        await (await getEmailField()).setValue('da-app.admin@czechitas.cz');
        await (await getPasswordField()).setValue('Czechitas123');
        await (await getPasswordFieldControl()).setValue('Czechitas123');
        await (await getLoginButton()).click();

        await expect(await (await getToastMessage()).getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await (await getErrorField()).getText()).toEqual('Účet s tímto emailem již existuje');

        await expect(await emailField).toBeDisplayed();
        await expect(await passwordField).toBeDisplayed();
        await expect(await loginButtonSelector).toBeDisplayed();

        await browser.pause(5000);
    });

    it('Should not register the user with the wrong password', async () => {

        await (await getNameField()).setValue('Test Test');
        await (await getEmailField()).setValue('11234@email.cz');
        await (await getPasswordField()).setValue('1234567890');
        await (await getPasswordFieldControl()).setValue('1234567890');
        await (await getLoginButton()).click();

        await expect(await (await getToastMessage()).getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');
        
        await expect(await (await getErrorField()).getText()).toEqual('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        await browser.pause(5000);

    });

});
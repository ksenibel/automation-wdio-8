describe('Homework', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
    });


    it('Should check if the registration field is displayed correctly', async () => {

        const nameField = $('#name')
        console.log('Name field is displayed' + await nameField.getHTML());
        console.log('Name field is enabled: ' + await nameField.isEnabled());

        const emailField = $('#email');
        console.log('Email field is displayed' + await emailField.getHTML());
        console.log('Email field is enabled: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is displayed' + await passwordField.getHTML());
        console.log('Password field is enabled: ' + await passwordField.isEnabled());

        const passwordFieldControl = $('#password-confirm');
        console.log('Password field control is displayed' + await passwordFieldControl.getHTML());
        console.log('Password field control is enabled: ' + await passwordFieldControl.isEnabled());

        const loginButtonSelector = $('.btn-primary');
        console.log('Login button text' + await loginButtonSelector.getHTML());

        await browser.pause(5000);
    });

    it('Should register the user with valid cridentials', async () => {
        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordFieldControl = $('#password-confirm');
        const loginButtonSelector = $('.btn-primary');
        const registeredUser = $('.navbar-right').$('[data-toggle="dropdown"]');
        const userFullName = "Test Test"

        await nameField.setValue('Test Test');
        await emailField.setValue('523456@email.cz');
        await passwordField.setValue('Czech123');
        await passwordFieldControl.setValue('Czech123');
        await loginButtonSelector.click();

        await expect(await registeredUser.getText()).toEqual(userFullName);

        await browser.pause(5000);
    })

    it('Should not register the user with existing email', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordFieldControl = $('#password-confirm');
        const loginButtonSelector = $('.btn-primary');
        const toastMessage= $('.toast-message');
        const errorField = $('.invalid-feedback');

        await nameField.setValue('Lišák Admin');
        await emailField.setValue('da-app.admin@czechitas.cz');
        await passwordField.setValue('Czechitas123');
        await passwordFieldControl.setValue('Czechitas123');
        await loginButtonSelector.click();

        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await errorField.getText()).toEqual('Účet s tímto emailem již existuje');

        await expect(await emailField).toBeDisplayed();
        await expect(await passwordField).toBeDisplayed();
        await expect(await loginButtonSelector).toBeDisplayed();

        await browser.pause(5000);
    });

    it('Should not register the user with the wrong password', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordFieldControl = $('#password-confirm');
        const loginButtonSelector = $('.btn-primary');
        const toastMessage= $('.toast-message');
        const errorField = $('.invalid-feedback');

        await nameField.setValue('Test Test');
        await emailField.setValue('11234@email.cz');
        await passwordField.setValue('1234567890');
        await passwordFieldControl.setValue('1234567890');
        await loginButtonSelector.click();

        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');
        
        await expect(await errorField.getText()).toEqual('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        await browser.pause(5000);

    });

});
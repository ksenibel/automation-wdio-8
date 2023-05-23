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

        await nameField.setValue('Test Test');
        await emailField.setValue('223456@email.cz');
        await passwordField.setValue('Czech123');
        await passwordFieldControl.setValue('Czech123');
        await loginButtonSelector.click();

        console.log('Email field is displayed: ' + await emailField.isDisplayed());
        console.log('Password field is displayed: ' + await passwordField.isDisplayed());
        console.log('Login button is displayed: ' + await loginButtonSelector.isDisplayed());

        const registeredUser = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('Registered user is dispalyed ' + await registeredUser.getText());

        await browser.pause(10000);
    })

    it('Should not register the user with existing email', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordFieldControl = $('#password-confirm');
        const loginButtonSelector = $('.btn-primary');

        await nameField.setValue('Lišák Admin');
        await emailField.setValue('da-app.admin@czechitas.cz');
        await passwordField.setValue('Czechitas123');
        await passwordFieldControl.setValue('Czechitas123');
        await loginButtonSelector.click();

        const toastMessage= $('.toast-message');
        console.log('toast-message appeared ' + await toastMessage.getText());

        const errorField = $('.invalid-feedback');
        console.log('error message appeared ' + await errorField.getText());

        await browser.pause(5000);
    });

    it('Should not register the user with the wrong password', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordFieldControl = $('#password-confirm');
        const loginButtonSelector = $('.btn-primary');

        await nameField.setValue('Test Test');
        await emailField.setValue('11234@email.cz');
        await passwordField.setValue('1234567890');
        await passwordFieldControl.setValue('1234567890');
        await loginButtonSelector.click();

        const toastMessage= $('.toast-message');
        console.log('toast-message appeared ' + await toastMessage.getText());

        const errorField = $('.invalid-feedback');
        console.log('error message appeared ' + await errorField.getText());

        await browser.pause(5000);

    });

});
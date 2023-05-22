describe('Homework', async () => {

    it('should open page', async () => {

        await browser.reloadSession();

        await browser.url('/registrace');

        const idNameSelector = $('#name');
        console.log(await idNameSelector.getHTML());

        const emailField = $('#email');
        console.log('Email filed is displayed' + await emailField.getHTML());
        console.log('Email field is enabled: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is displayed' + await passwordField.getHTML());
        console.log('Password field is enabled: ' + await passwordField.isEnabled());

        const passwordFieldControl = $('#password-confirm');
        console.log('Password field control is displayed' + await passwordFieldControl.getHTML());
        console.log('Password field control is enabled: ' + await passwordFieldControl.isEnabled());

        const loginButtonSelector = $('.btn-primary');
        console.log('Login button text' + await loginButtonSelector.getHTML());

        await idNameSelector.setValue('Name Surname');
        await emailField.setValue('da-app.admin@czechitas.cz');
        await passwordField.setValue('Czechitas123');
        await passwordFieldControl.setValue('Czechitas123');
        await loginButtonSelector.click();

        await browser.pause(5000);
    });

});


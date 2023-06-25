import AppPage from './app.page.js';

class LoginPage extends AppPage{

    constructor() {
        super();
        this.url = '/registrace';
    }

    get nameField() {return $('#name');}
    get emailField() {return $('#email');}
    get passwordField() {return $('#password');}
    get passwordFieldControl() {return $('#password-confirm');}
    get loginButtonSelector() {return $('.btn-primary');}
    get toastMessage() {return $('.toast-message');}
    get errorField() {return $('.invalid-feedback');}
    
    async openLoginPage() {
        await browser.reloadSession();
        await browser.url(this.url);

    }
    async login(username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async getErrorField() {
        return await this.errorField.getText();
    }

    async getToastMessage() {
        return await this.toastMessage.getText();
    }

}

export default new LoginPage();

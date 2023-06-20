export async function openLoginPage (){
    await browser.reloadSession();
    await browser.url('/registrace');
}

export async function getNameField(){
    return $('#name')
}

export async function getEmailField(){
    return $('#email')
}

export async function getPasswordField(){
    return $('#password')
}

export async function getPasswordFieldControl(){
    return $('#password-confirm')
}

export async function getLoginButton(){
    return $('.btn-primary')
}

export async function getRightNavbar() {
    return $('.navbar-right');
}

export async function getUserNameDropdown() {
    return (await getRightNavbar()).$('[data-toggle="dropdown"]')
}

export async function getToastMessage() {
    return $('.toast-message')
}

export async function getErrorField() {
    return $('.invalid-feedback')
}
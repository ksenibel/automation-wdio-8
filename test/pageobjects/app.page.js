class AppPage{
    get navbarRight() {return $('.navbar-right');}
    get userNameDropdown() {return this.navbarRight.$('[data-toggle="dropdown"]');}

    async getCurrentUser() {
        return await this.userNameDropdown.getText();
    }
}

export default AppPage
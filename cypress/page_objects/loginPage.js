class LoginPage {

    get loginHeading() {
        return cy.get('h1')
    }

    get emailInput() {
        return cy.get('div[class="el-input"]').first()
    }

    get passwordInput() {
        return cy.get('div[class="el-input"]').last()
    }

    get loginButton() {
        return cy.get('div[class="vs-u-text--left"]')
    }

    login(email, pass) {
        this.emailInput.clear().type(email)
        this.passwordInput.clear().type(pass)
        this.loginButton.click()
    }

}

export const loginPage = new LoginPage()
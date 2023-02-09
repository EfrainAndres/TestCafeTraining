import { Selector, t } from 'testcafe';

class ContactUsPage {

    constructor() {
        this.submitButton = Selector('input').withAttribute('type', 'submit');
        this.fullNameLabel = Selector('div.hs_firstname');
        this.emailLabel = Selector('div.hs_email');
    }

    async submitForm() {
        await t
            .wait(2000)
            .click(this.submitButton);
    }

    async verifyMessageFullName(requiredMessage) {
        await t
            .expect(this.fullNameLabel.innerText).contains(requiredMessage);
    }

    async verifyMessageEmail(requiredMessage) {
        await t
            .expect(this.emailLabel.innerText).contains(requiredMessage);
    }
}

export default new ContactUsPage();
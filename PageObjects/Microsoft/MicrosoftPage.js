import { Selector, t, ClientFunction } from 'testcafe';
import xpathSelector from '../../Tests/utils/xpathSelector'

class MicrosoftPage {
    constructor() {
        this.languageButton = Selector('#Languages-languagePicker');
        this.englishOption = Selector('a').withText('English (United States)');
        this.searchButton = Selector('#search');
        this.searchInput = Selector('#cli_shellHeaderSearchInput');
        this.shopLink = Selector('a').withAttribute('aria-label', 'Shop pivot');
        this.firstHardwareOption = Selector(xpathSelector('//div[@class="col slide-item px-2"]')).nth(0);
        this.cartPageHeader = Selector('#store-cart-root > div > div > header > div.headerContainer--dpz4iB5U.c-heading.x-hidden-focus > h1');
        this.numberOfItems = Selector('#store-cart-root > div > div > div > section.aside--5dgOR64U.asideSticky--bgSBPBhh > div > div > div:nth-child(2) > div > span:nth-child(1) > span:nth-child(1)');
        this.checkoutButton = Selector('#store-cart-root > div > div > div > section.aside--5dgOR64U.asideSticky--bgSBPBhh > div > div > button');
    }

    async searchInMicrosoft(toSearch) {
        await t
            .maximizeWindow()
            .click(this.searchButton)
            .typeText(this.searchInput, toSearch)
            .pressKey('enter');
    }

    async shopOption() {
        await t
            .wait(1000)
            .click(this.shopLink)
            .wait(2000);
    }

    async selectItem() {
        await t
            .click(this.firstHardwareOption)
            .wait(4000);
    }

    async geoModal() {
        const closeModalGeo = ClientFunction(() => {
            const modalGeo = document.querySelector('#geo-selector-modal');
            if (modalGeo) {
                const closeButtonGeo = modalGeo.querySelector('button.close');
                closeButtonGeo.click();
            }
        });

        const popUpGeo = Selector('#geo-selector-modal');
        if (await popUpGeo.exists) {
            await closeModalGeo();
            await t.wait(5000);
        }
    }

    async emailModal() {
        const closeModal = ClientFunction(() => {
            const modal = document.querySelector('#emailSup-modal');
            if (modal) {
                const closeButton = modal.querySelector('button.close');
                closeButton.click();
            }
        });

        const popUp = Selector('#emailSup-modal');
        if (await popUp.exists) {
            await closeModal();
            await t.wait(2000);
        }
    }

    async cart() {
        const cartButton = ClientFunction(() => {
            const addToCartButton = document.querySelector('#rootContainer_BuyBox > section > div > div.col-lg-3.buy-box-right-col > div > div > div > button');
            addToCartButton.click();
        });

        await cartButton();
        await t.wait(5000);
    }

    async validateCartPage() {
        await t
            .expect(this.cartPageHeader.exists).ok()
            .expect(this.numberOfItems.innerText).contains('1');
    }

}

export default new MicrosoftPage();
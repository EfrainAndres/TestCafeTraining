import MicrosoftPage from '../../PageObjects/Microsoft/MicrosoftPage';

fixture`Microsoft Shopping`
    .page`https://www.microsoft.com/en-us`
    .before(async ctx => {
        const userData = require("../../DataFiles/SearchFile.json");
        ctx.Search = userData.searchTerm;
    });

/*test('Change language to English', async t => {
    await t.click(MicrosoftPage.languageButton)
        .click(MicrosoftPage.englishOption);
});*/

test('Search for Microsoft Modern Wireless', async t => {
    await MicrosoftPage.searchInMicrosoft(t.fixtureCtx.Search);
    await MicrosoftPage.shopOption();
    await MicrosoftPage.selectItem();
    await MicrosoftPage.geoModal();
    await MicrosoftPage.emailModal();
    await MicrosoftPage.cart();
    await MicrosoftPage.validateCartPage();
});

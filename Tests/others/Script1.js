import { Selector, t } from 'testcafe';

fixture`Apple.com`
    .page`https://www.apple.com/`;

test('iPad Pro search', async t => {
    const searchBar = Selector('[id="ac-gn-link-search"]');
    const searchInput = Selector('[id="ac-gn-searchform-input"]');
    const imageResults = Selector('[id="exploreCurated"]');
    const firstResult = Selector('a').withText('Learn more')
    const buyButton = Selector('a').withAttribute('aria-label', 'Buy iPad Pro');

    await t
        .maximizeWindow()
        .click(searchBar)
        .typeText(searchInput, 'iPad Pro')
        .pressKey('enter')
        .expect(imageResults.count).gte(2)
        .click(firstResult.nth(0))
        .click(buyButton)
        .expect(Selector('title').innerText).contains('Buy iPad Pro');
});
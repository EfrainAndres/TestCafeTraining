import { Selector, t } from 'testcafe';

const getElementsByXPath = Selector(xpath => {
    const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    const items = [];
    let item = iterator.iterateNext();
    while (item) {
        items.push(item);
        item = iterator.iterateNext();
    }
    return items;
});
export default function (xpath) {
    return Selector(getElementsByXPath(xpath));
}


fixture`Google.com`
    .page`https://www.google.com/`;

test('Test Cafe Automation search', async t => {
    const searchInput = Selector('[name="q"]');
    const firstResult = Selector('h3').withText('TestCafe');
    const docsButton = Selector(getElementsByXPath('//*[@id="header"]/div/nav/ul/li[2]/a'));

    await t
        .maximizeWindow()
        .typeText(searchInput, 'Test Cafe Automation')
        .pressKey('enter')
        .click(firstResult)
        .click(docsButton)
        .expect(Selector('h1').innerText).contains('Getting Started');
});
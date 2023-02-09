import { Selector } from 'testcafe';

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

fixture`Getting Started`

fixture`Getting Started`
    .page`https://www.unosquare.com/ContactUs`;

test('My first test', async t => {
    await t
        .maximizeWindow()
        .expect(Selector('input[name = "firstname"]').visible).ok()
        .typeText('input[name = "firstname"]', 'My Name')
        .typeText('input[name = "email"]', 'Myemail@unosquare.com')
        .typeText('textarea[name = "message"]', 'The script')
        .scrollBy(0, -500)
        .click(Selector(getElementsByXPath("//div[2]/div/div/a/span/span")))

});
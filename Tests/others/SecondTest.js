import { Selector } from 'testcafe';

fixture`Getting Started`
    .page`https://www.unosquare.com/ContactUs`;

test('My first test', async t => {
    await t
        .maximizeWindow()
        .expect(Selector('input[name = "firstname"]').visible).ok()
        .typeText('input[name = "firstname"]', 'My Name')
        .typeText('input[name = "email"]', 'Myemail@unosquare.com')
        .typeText('textarea[name = "message"]', 'The script!')
});
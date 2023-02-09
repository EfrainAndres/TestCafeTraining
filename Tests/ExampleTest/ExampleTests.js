import page from '../../PageObjects/ExamplePage/mainPage';
import { Selector } from 'testcafe';

var name, replaceName;

fixture `My fixture`
    .page `https://devexpress.github.io/testcafe/example/`
    .before( async t => {
        name= 'John';
        replaceName = 'Dwayne'
    })

test('Text typing basics', async t => {
    await t
    .wait(2000)
    .typeText(page.nameInput, name)
    .typeText(page.nameInput, replaceName, { replace: true })
    .expect(page.nameInput.value).eql(replaceName);
});

test('Click check boxes and then verify their state', async t => {
    for (const feature of page.featureList) {
        await t
            .click(feature.label)
            .expect(feature.checkbox.checked).ok();
    }
});

test('Submit a developer name and check the header', async t => {
    const header = Selector('#article-header');

    await page.submitName(name);

    await t.expect(header.innerText).eql('Thank you, '+ name +'!');
});
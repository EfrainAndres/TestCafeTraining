import { Selector } from 'testcafe';

fixture`Screenshot`
    .page`https://devexpress.github.io/testcafe/example/`;

test('Taking Screenshot', async t => {
    await t
        .wait(3000)
        .takeScreenshot()
        .takeElementScreenshot('.col-2');
});
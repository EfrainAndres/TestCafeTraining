import { Selector } from 'testcafe';


fixture`Example`
    .page `https://www.file.io/`;

test('Upload a file Test', async t => {
    await t
    .wait(8000)
    .setFilesToUpload(Selector('#upload-button'), [
        '../automated.qa.postman_environment.json'
    ])
    .wait(8000);
});
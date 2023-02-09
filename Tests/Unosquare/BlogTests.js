import blogPage from "../../PageObjects/Unosquare/Blog";

var postTitle;

fixture`Unosquare Blog`
    .page`https://www.unosquare.com/blog/`
    .beforeEach(async t => {
        await t.maximizeWindow();
        postTitle = 'What is JavaScript Used for?';
    });

test('Validate First Post and Read More', async t => {
    await blogPage.postIsDisplayed(postTitle);
    await blogPage.selectFirstPost();
    await blogPage.verifyTitlePost(postTitle);
});
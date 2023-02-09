import { Selector, t } from 'testcafe';
import XpathSelector from '../utils/xpathSelector';

const titleTag = Selector('span').withAttribute('class', 'last');
const titlePage = Selector('h1');
const posts = Selector('.elementor-post__title').find('a');
const firstPost = Selector('.elementor-post__title').find('a').nth(0);
const readMore = Selector('.elementor-post__read-more');
const titlePagePost = Selector(XpathSelector('//h1[@class="elementor-heading-title elementor-size-default"]'));
const pagination = Selector('.page-numbers');
const currentPagination = Selector('span').withAttribute('aria-current', 'page');

fixture`Unosquare Blog Validation`
    .page`https://blog.unosquare.com/tag/software-development`
    .beforeEach(async t => {
        await t.maximizeWindow();
    });

test('Validate Software Development Title', async t => {

    await t
        .takeScreenshot()
        .expect(titleTag.exists)
        .ok()
        .takeElementScreenshot(titleTag)
        .expect(posts.count).eql(6)
        .takeElementScreenshot(posts)
        .expect(titleTag.textContent)
        .contains('Software Development')
        .expect(titlePage.innerText)
        .eql('Digital Transformation Blog')
        .takeElementScreenshot(titlePage);
});

test('Validate First Post and Read More', async t => {

    await t
        .takeScreenshot()
        .expect(firstPost.textContent).contains('What is JavaScript Used for?')
        .expect(readMore.exists)
        .ok()
        .takeElementScreenshot(firstPost)
        .click(readMore.nth(0))
        .wait(2000)
        .expect(titlePagePost.innerText).contains('What is JavaScript Used for?')
        .takeElementScreenshot(titlePagePost);
});

test('Validate Pagination', async t => {

    await t
        .takeScreenshot()
        .expect(pagination.exists)
        .ok()
        .expect(pagination.count).eql(7)
        .takeElementScreenshot(pagination)
        .click(pagination.nth(1))
        .wait(2000)
        .expect(currentPagination.innerText).contains('2')
        .takeElementScreenshot(currentPagination);
});
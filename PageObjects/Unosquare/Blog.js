import { Selector, t } from 'testcafe';
import XpathSelector from '../../Tests/utils/xpathSelector';

class BlogPage {

    constructor() {
        this.firstPost = Selector('.elementor-post__title').find('a').nth(0);
        this.readMore = Selector('.elementor-post__read-more');
        this.titlePagePost = Selector(XpathSelector('//h1[@class="elementor-heading-title elementor-size-default"]'));
    }

    async postIsDisplayed(postTitle) {
        await t
            .wait(2000)
            .expect(this.firstPost.innerText).contains(postTitle)
            .expect(this.readMore.exists)
            .ok();
    }

    async selectFirstPost() {
        await t
            .click(this.readMore.nth(0))
            .wait(2000);
    }

    async verifyTitlePost(postTitle) {
        await t
            .expect(this.titlePagePost.innerText).contains(postTitle);
    }
}

export default new BlogPage();
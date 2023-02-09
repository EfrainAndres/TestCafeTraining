import { Selector } from 'testcafe';
import xpathSelector from '../utils/xpathSelector';

fixture`Amazon Shopping`
    .page`https://www.amazon.com/`
    .beforeEach(async t => {
        await t.maximizeWindow();
    });

test('Verify Samsung Galaxy Note 20 Price', async t => {

    const searchInput = Selector('#twotabsearchtextbox');
    const firstProduct = Selector(xpathSelector('//span[@class="a-offscreen"]')).nth(0);
    const addToCartBtn = Selector('#add-to-cart-button');
    const cartBtn = Selector('#nav-cart');
    const deleteItemBtn = Selector(xpathSelector('//input[@value="Eliminar"]'));
    const emptyCart = Selector('h1').withAttribute('class', 'a-spacing-mini a-spacing-top-base')

    // Search for Samsung Galaxy Note 20
    await t
        .takeScreenshot()
        .typeText(searchInput, 'Samsung Galaxy Note 20')
        .pressKey('enter')
        .wait(1500);

    // Verify item is displayed and store the first price
    await t
        .expect(firstProduct.exists)
        .ok();
    
    const firstPrice = await firstProduct.textContent;

    // Click on the first result
    await t
        .takeElementScreenshot(firstProduct)
        .click(firstProduct)
        .wait(1500);

    // Compare the first price with the price on the details page
    const currentPrice = await Selector('div#corePrice_feature_div > div > span > span').textContent;
    await t
        .takeScreenshot()
        .expect(currentPrice).eql(firstPrice);

    // Click on Add to Cart
    await t.click(addToCartBtn);

    // Go to cart and verify the price again
    await t.click(cartBtn);
    const cartPrice = await Selector('span#sc-subtotal-amount-activecart > span').textContent;
    await t
        .takeScreenshot()
        .expect(cartPrice).eql(firstPrice);

    // Delete item
    await t
        .click(deleteItemBtn)
        .expect(emptyCart.exists)
        .ok()
        .expect(emptyCart.innerText).eql('Tu carrito de Amazon está vacío.')
        .takeElementScreenshot(emptyCart);
});
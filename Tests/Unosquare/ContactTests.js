import contacUs from "../../PageObjects/Unosquare/ContacUs";

var requiredMessage;

fixture`Unosquare ContactUs`
    .page`https://www.unosquare.com/contact-us/`
    .beforeEach(async t => {
        await t.maximizeWindow();
        requiredMessage = 'Please complete this required field.';
    });

test('Validate error messages', async t => {
    await contacUs.submitForm();
    await contacUs.verifyMessageFullName(requiredMessage);
    await contacUs.verifyMessageEmail(requiredMessage);
});
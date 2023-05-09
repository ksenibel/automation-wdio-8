describe('Homework', async () => {

    it('should open page', async () => {

        await browser.reloadSession();

        await browser.url('/registrace');

        const idNameSelector = $('#name');
        console.log(await idNameSelector.getHTML());

        const idEmailSelector = $('#email');
        console.log(await idEmailSelector.getHTML());

        const idPasswordSelector = $('#password');
        console.log(await idPasswordSelector.getHTML());

        const idPasswordControlSelector = $('#password-confirm');
        console.log(await idPasswordControlSelector.getHTML());

        const buttonSelector = $('.btn-primary');
        console.log(await buttonSelector.getHTML());

        await idNameSelector.setValue('Name Surname');
        await idEmailSelector.setValue('da-app.admin@czechitas.cz');
        await idPasswordSelector.setValue('Czechitas123');
        await idPasswordControlSelector.setValue('Czechitas123');
        await buttonSelector.click();

        await browser.pause(5000);
    });

});

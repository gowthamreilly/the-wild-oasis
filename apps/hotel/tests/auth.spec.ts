import { expect, test } from "@playwright/test";

test.beforeEach('login ',async({page})=>{

    await page.goto('http://localhost:5173/login');

    const loginText = page.getByRole('heading').filter({
        has: page.getByText('Log in to your account')
    });
    await expect(loginText).toBeVisible();
    const email = page.getByLabel('Email address');
    await expect(email).toBeVisible();
    const password = page.getByLabel('Password');
    await expect(password).toBeVisible();
    const Login = page.getByRole('button',{name:'Log in'});
    await expect(Login).toBeVisible();

// Login Unsuccessfull 
    await email.fill("Bhavya@gmail.com");
    await password.fill("Bhavy");
    await Login.click();
    const alertDiv = page.getByRole('status');
    await expect(alertDiv).toHaveText('Provided email or password are incorrect');

    await page.reload();

//Login Successfull 
    await email.fill("gowtham@gowthamreilly.com");
    await password.fill("Revolution@24");
    await Login.click();
    await page.waitForURL('http://localhost:5173/dashboard');
    expect(page.url()).toContain('http://localhost:5173/dashboard');
})


test('Check for the discounted cabins',async({page})=>{
    const headingDesktop = page.getByRole('heading', {
        name: 'Dashboard'
    })
    await expect(headingDesktop).toBeVisible();
    //look for the cabins page nevigation link 
    const cabinNevigateLink = page.getByRole('link',{
        name: 'Cabins'
    })
    await expect(cabinNevigateLink).toBeVisible();
    //navigate to the cabins page
    await cabinNevigateLink.click();
    await page.waitForURL('http://localhost:5173/cabins');
    expect(page.url()).toContain('cabins');
    //assert the cabins page 
    const cabinPageHeading = page.getByRole('heading',{
        name : 'All cabins'
    })
    await expect(cabinPageHeading).toBeVisible();

    const tabelLocator = page.getByRole('table');
    await expect(tabelLocator).toBeVisible();

    const rowElement = tabelLocator.locator('section div').and(tabelLocator.getByRole('row'));

    const rowWithDisount = rowElement.filter({
        hasNot:page.locator('span')
    })
    const rowWithOutDisount = rowElement.filter({
        has:page.locator('span')
    })

    await expect(rowWithDisount).toHaveCount(await rowWithDisount.count());
    await expect(rowWithOutDisount).toHaveCount(await rowWithOutDisount.count());


    const noDiscountBtn = page.getByRole('button',{
        name: 'No discount'
    });
    await noDiscountBtn.click();
    await expect(noDiscountBtn).toBeDisabled();
    await expect(rowWithDisount).toHaveCount(await rowWithDisount.count());
    await expect(rowWithOutDisount).toHaveCount(await rowWithOutDisount.count());

    const DiscountBtn = page.getByRole('button',{
        name: 'With discount'
    });
    await DiscountBtn.click();
    await expect(DiscountBtn).toBeDisabled();
    await expect(rowWithDisount).toHaveCount(await rowWithDisount.count());
    await expect(rowWithOutDisount).toHaveCount(await rowWithOutDisount.count());

})
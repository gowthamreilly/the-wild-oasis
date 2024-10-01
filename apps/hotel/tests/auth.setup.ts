import { expect, test } from "@playwright/test";


// const BASE_URL = 'http://localhost:5173/'
test('login ',async({page})=>{

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

    await email.fill("gowtham@gowthamreilly.com");
    await password.fill("Revolution@24");
    await Login.click();
    await page.waitForURL('http://localhost:5173/dashboard');
    expect(page.url()).toContain('http://localhost:5173/dashboard');

    await page.context().storageState({
        path:'auth.json'
    })
})
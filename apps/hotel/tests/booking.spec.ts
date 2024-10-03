//1. Go to Bookings page
//2. Check for the bookings data 
//3. Add bookings from customer side 
//4. Edit the bookings from customer side 
//5. Check the booking from hotel side 
//6. Sort the bookings based on status on hotel booking application 
//7. View the details of the perticular cabin bookings 
//8. Delete the pertucular cabin boooking 
//9. Checkin the newlyy created cabin 
//10. Checkout the the cabin 
//11. Check for all three status Unconfermed , Checked In and Checked Out 

import test, { expect } from "@playwright/test";
import { CustomerLoginPage } from "./pages/customer.login.page";

const CUSTOMER_APP_URL = "http://localhost:3000/";
const CUSTOMER_DASHBOARD_URL = `${CUSTOMER_APP_URL}account`;
test.describe('Add a booking',()=>{
    test.beforeEach('login into customer side',async ({page})=>{
        const loginPage = new CustomerLoginPage(page);

        await page.goto(CUSTOMER_APP_URL);
        await expect(loginPage.guestAreaLocator).toBeVisible();
        await loginPage.guestAreaLocator.click();
        await expect(loginPage.loginPageTitle).toBeVisible();
        await expect(loginPage.emailLocator).toBeVisible();
        await expect(loginPage.passwordLocator).toBeVisible();
        await expect(loginPage.loginBtn).toBeVisible();
        await loginPage.emailLocator.fill('luffy@strawhatpirates.org');
        await loginPage.passwordLocator.fill('iloveadventure');
        await loginPage.loginBtn.click();
        await page.waitForURL('http://localhost:3000/account')
    })
    test('create the booking using Ui',async ({page})=>{
        await page.goto(CUSTOMER_DASHBOARD_URL);
        
    })

})

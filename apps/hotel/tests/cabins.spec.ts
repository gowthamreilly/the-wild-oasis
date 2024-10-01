import { expect, test } from "@playwright/test";

const sampleData = {
    "name": "demo",
    "maxCapacity": "3",
    "regularPrice": "2300",
    "discount": "200",
    "description": "The demo one",
    "image": "https://umxjivfxuijjbopalczq.supabase.co/storage/v1/object/public/cabin-images/0.4918158679085989-harry-potter.jpg"
}
const TOKEN_KEY = 'sb-umxjivfxuijjbopalczq-auth-token'
let cabin_name = '';
test.beforeEach('Create Cabin via API',async ({page,request},response)=>{
    const localStorageItem = (await page.context().storageState()).origins[0].localStorage.find((item)=> item.name === TOKEN_KEY);
    const localStorageValue = localStorageItem? localStorageItem.value: undefined;

    const jsonData = localStorageValue ? JSON.parse(localStorageValue) : undefined;

    const accessToken = jsonData ? jsonData['access_token'] : undefined;
    console.log(accessToken);
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4'
    if(accessToken ){
       const response =  await request.post(`https://umxjivfxuijjbopalczq.supabase.co/rest/v1/cabins?columns=%22name%22%2C%22maxCapacity%22%2C%22regularPrice%22%2C%22discount%22%2C%22description%22%2C%22image%22&select=*` ,{
           data : sampleData,
           headers : {
            'Apikey':API_KEY ? API_KEY :'' ,
            'Authorization': `Bearer ${accessToken}`,
            'prefer': 'return=representation',
           }
        });
        if(response.status() === 201){
            const data = await response.json();
            cabin_name = data[0]['name'];
        }
    }
})

test('delet the the created cabim',async ({page})=>{
    await page.goto('http://localhost:5173/dashboard');
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

    console.log(cabin_name);
    
    const rowElement = tabelLocator.locator('section div').and(tabelLocator.getByRole('row'));
    const cabin = rowElement.filter({
        hasText: cabin_name
    })
    expect(cabin).toBeVisible();

    const menuBtn = cabin.locator('button');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const menuDiv = page.locator('ul').filter({
        has : page.getByRole('button',{name: 'Edit'})
    });
    await expect(menuDiv).toBeVisible();


    const deleteBtn = menuDiv.getByRole('button',{
        name:'Delete',
    })

    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    const deleteBtn2 = page.getByRole('button',{
        name:'Delete'
    })
    await expect(deleteBtn2).toBeVisible();
    await deleteBtn2.click();

    const popUp = page.getByRole('status');
    await expect(popUp).toBeVisible();
    await expect(cabin).not.toBeVisible();
})

test('Check for the discounted cabins',async({page})=>{
    await page.goto('http://localhost:5173/dashboard');
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
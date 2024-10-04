import { Locator, Page } from "@playwright/test";

export class CustomerLoginPage {

    private page:Page ; 
    readonly guestAreaLocator : Locator;
    readonly loginPageTitle : Locator;
    readonly emailLocator : Locator; 
    readonly passwordLocator : Locator ;
    readonly loginBtn : Locator ;

    constructor(page : Page){
        this.guestAreaLocator = page.locator('header ul li').filter({
            hasText: 'Guest area'
        });

        this.loginPageTitle= page.getByRole('heading', {name: 'Sign in to access your guest area'});
        const formDiv = page.locator('form').locator('div')
        this.emailLocator= formDiv.filter({ hasText: /^Email$/ }).locator('input');
        // this.emailLocator = emailDiv.locator('input');
        const passswordlDiv= formDiv.filter({ hasText: /^Password$/ });
        this.passwordLocator = passswordlDiv.locator('input');
        this.loginBtn=page.getByRole('button',{name : 'Sign i'});
    }
}
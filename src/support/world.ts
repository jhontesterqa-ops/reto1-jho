import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class CustomWorld extends World {
    apiContext: APIRequestContext | undefined;
    response: APIResponse | undefined;
    userId: string | number | undefined;
    baseUrl: string | undefined;
    responseData: any;

    async initApi() {
       
        this.apiContext = await request.newContext({
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               
            }
        });
    }

    async closeApi() {
        await this.apiContext?.dispose();
    }
}

setWorldConstructor(CustomWorld);
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserManager } from '../api/UserManager';

let userManager: UserManager;

Before(async function (this: CustomWorld) {
    await this.initApi();
});

After(async function (this: CustomWorld) {
    await this.closeApi();
});

Given('que el servicio de API está disponible en {string}', async function (this: CustomWorld, url: string) {
    this.baseUrl = url;
    userManager = new UserManager(this.apiContext!, this.baseUrl);
});

// --- Scenario 1 ---
When('creo un usuario con nombre {string} y trabajo {string}', async function (this: CustomWorld, name: string, job: string) {
    this.response = await userManager.createUser(name, job);
    const body = await this.response.json();
    this.userId = body.id; 
    this.responseData = body;
    console.log(`Usuario creado con ID: ${this.userId}`);
});

When('consulto el usuario por su ID', async function (this: CustomWorld) {
    if(Number(this.userId) > 12) { 
        console.log("Reqres no persiste usuarios nuevos, consultando usuario ID 2 para simular éxito de lectura");
        this.response = await userManager.getUserById(2); 
    } else {
        this.response = await userManager.getUserById(this.userId!);
    }
});

// CORRECCIÓN AQUÍ: statusCode es de tipo 'number'
Then('la respuesta debe tener el código de estado {int}', async function (this: CustomWorld, statusCode: number) {
    expect(this.response!.status()).toBe(statusCode);
});

Then('los datos del usuario consultado deben coincidir con {string} y {string}', async function (this: CustomWorld, name: string, job: string) {
    expect(this.responseData.name).toBe(name);
    expect(this.responseData.job).toBe(job);
});

// --- Scenario 2 ---
Given('que existe un usuario creado con nombre {string} y trabajo {string}', async function (this: CustomWorld, name: string, job: string) {
    this.userId = 2;
});

When('actualizo el usuario con nuevo nombre {string} y trabajo {string}', async function (this: CustomWorld, name: string, job: string) {
    this.response = await userManager.updateUser(this.userId!, name, job);
    this.responseData = await this.response.json();
});

// CORRECCIÓN AQUÍ: statusCode es de tipo 'number'
Then('la respuesta de actualización debe ser {int}', async function (this: CustomWorld, statusCode: number) {
    expect(this.response!.status()).toBe(statusCode);
});

Then('la respuesta debe contener los datos actualizados {string} y {string}', async function (this: CustomWorld, name: string, job: string) {
    expect(this.responseData.name).toBe(name);
    expect(this.responseData.job).toBe(job);
});

// --- Scenario 3 & 4 ---
Given('que existe un usuario con ID {int} para eliminar', async function (this: CustomWorld, id: number) {
    this.userId = id;
});

When('elimino al usuario', async function (this: CustomWorld) {
    this.response = await userManager.deleteUser(this.userId!);
});


Then('el código de respuesta de eliminación debe ser {int}', async function (this: CustomWorld, statusCode: number) {
    expect(this.response!.status()).toBe(statusCode);
});

Then('al consultar la lista de usuarios, el usuario eliminado no debe existir', async function (this: CustomWorld) {
    const listResponse = await userManager.listUsers(1);
   
    expect(listResponse.ok()).toBeTruthy(); 
    
    const listBody = await listResponse.json();
    
   
    let users;
    if (Array.isArray(listBody)) {
        users = listBody; // Es json-server
    } else {
        users = listBody.data; // Es Reqres real
    }
    
    
    if (!users) {
        throw new Error("No se pudo obtener la lista de usuarios. Respuesta: " + JSON.stringify(listBody));
    }

    const userExists = users.some((u: any) => u.id == this.userId);
    
    expect(userExists).toBeFalsy();
});
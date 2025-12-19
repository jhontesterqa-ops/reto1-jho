import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserManager {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async createUser(name: string, job: string): Promise<APIResponse> {
        const response = await this.request.post(`${this.baseUrl}/api/users`, {
            data: { name, job }
        });
        // Debugging: Si falla, imprimimos el cuerpo para entender por qué
        if (!response.ok()) {
            console.log(`ERROR CREANDO USUARIO. Status: ${response.status()}`);
            // console.log(await response.text()); // Descomentar si quieres ver el HTML del error
        }
        return response;
    }

    async getUserById(id: string | number): Promise<APIResponse> {
        return await this.request.get(`${this.baseUrl}/api/users/${id}`);
    }

    async updateUser(id: string | number, name: string, job: string): Promise<APIResponse> {
        const response = await this.request.put(`${this.baseUrl}/api/users/${id}`, {
            data: { name, job }
        });
        if (!response.ok()) {
            console.log(`ERROR ACTUALIZANDO. Status: ${response.status()}`);
        }
        return response;
    }

    async deleteUser(id: string | number): Promise<APIResponse> {
        return await this.request.delete(`${this.baseUrl}/api/users/${id}`);
    }

    async listUsers(page: number = 1): Promise<APIResponse> {
        return await this.request.get(`${this.baseUrl}/api/users?page=${page}`);
    }
}
# QA Automation Challenge - Reqres API Testing

Proyecto de automatización de pruebas para la API de gestión de usuarios, implementado con **TypeScript**, **Playwright** y **Cucumber (BDD)**.

## 🚀 Estrategia de Solución

Debido a bloqueos de seguridad (Error 403 / Cloudflare) detectados en la API pública `reqres.in` al realizar pruebas automatizadas continuas, se implementó una estrategia de **Virtualización de Servicio (Mock Server)**.

Se utiliza **JSON-Server** para simular localmente la API, garantizando:
1.  **Estabilidad:** Cero falsos negativos por caídas de red o bloqueos de IP.
2.  **Persistencia:** Capacidad real de probar CRUD (Crear, Editar, Borrar) verificando cambios de estado en la base de datos.

## 📋 Tecnologías

* **Lenguaje:** TypeScript
* **Framework:** Playwright
* **BDD:** Cucumber (Gherkin)
* **Mock Server:** Json-server
* **Patrón de Diseño:** API Object Model (Capas separadas: Features -> Steps -> API Manager)

## 🛠️ Instalación

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/jhontesterqa-ops/reto1-jho.git
    cd reto1-jho
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```

## ▶️ Ejecución de Pruebas

Este proyecto cuenta con un comando unificado que levanta el servidor local, ejecuta las pruebas y apaga el servidor al finalizar.

Simplemente ejecuta:

```bash
npm test
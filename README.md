# Proyecto NestJS - Guía de Configuración

Este repositorio contiene un proyecto desarrollado con NestJS, un framework de Node.js para construir aplicaciones eficientes y escalables en el lado del servidor.

## Configuración del Proyecto

### Instalación

1. Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/devrrior/task-manager-system
   cd task-manager-system
   ```

2. Instala las dependencias:

   ```bash
   npm install

   ```

### Archivo .env

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno con tus propias configuraciones:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Admin123!
DB_DATABASE=task_manager_sys

# Configuración de claves secretas para tokens JWT
ACCESS_TOKEN_SECRET_KEY=your_access_token_secret_key
REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret_key
ACCESS_TOKEN_EXPIRATION_MS=86400000   # Tiempo de expiración en milisegundos (24 horas)
REFRESH_TOKEN_EXPIRATION_MS=2592000000   # Tiempo de expiración en milisegundos (30 días)
```

Asegúrate de reemplazar your_access_token_secret_key y your_refresh_token_secret_key con claves secretas seguras para tu aplicación.

### Base de Datos MySQL con Docker

Si deseas utilizar una base de datos MySQL para desarrollo, puedes usar el siguiente archivo docker-compose.yml que está disponible en el repositorio:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:latest
    ports:
      - 3306:3306
    environment:
      - MYSQL_ROOT_PASSWORD=Admin123!
      - MYSQL_DATABASE=task_manager_sys
```

Para ejecutar MySQL con Docker:

```bash
docker-compose up -d
```

Esto iniciará un contenedor Docker con MySQL y lo hará accesible en localhost:3306.

## Ejecutar el Proyecto

Una vez configurado el archivo .env y levantada la base de datos, puedes ejecutar el proyecto NestJS:

```bash
npm start

```

Esto iniciará la aplicación en modo de desarrollo. Visita http://localhost:3000 para interactuar con la API.

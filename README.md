Este projeto é uma API backend desenvolvida em [NestJS](https://nestjs.com/) com autenticação via JWT, conexão com banco de dados PostgreSQL e suporte a operações CRUD para as entidades **Users**, **Customers** e **Sales**.

---

## 🛠 Tecnologias Utilizadas

- NestJS (última versão)
- PostgreSQL
- TypeORM
- JWT (autenticação)
- Bcrypt (criptografia de senha)
- Docker (opcional para facilitar execução)

---

## 🧱 Estrutura do Banco de Dados

### 🔹 Customers

| Campo     | Tipo    | Observações              |
|-----------|---------|---------------------------|
| id        | number  | Autoincremento            |
| name      | string  | Máximo 100 caracteres     |
| address   | string  | Máximo 255 caracteres     |
| city      | string  | Máximo 100 caracteres     |
| state     | string  | 2 caracteres (UF)         |

---

### 🔹 Sales

| Campo       | Tipo    | Observações                         |
|-------------|---------|--------------------------------------|
| id          | number  | Autoincremento                      |
| customerId  | number  | ID do cliente relacionado           |
| date        | Date    | Data do pedido                      |
| totalPrice  | number  | Preço total                         |
| userId      | number  | Usuário que cadastrou o pedido      |

---

### 🔹 Users

| Campo    | Tipo     | Observações                    |
|----------|----------|---------------------------------|
| id       | number   | Autoincremento                 |
| name     | string   | Máximo 100 caracteres          |
| email    | string   | Máximo 100 caracteres (único)  |
| password | string   | Criptografada (bcrypt)         |
| active   | boolean  | Usuário ativo ou não           |

---

## 🔐 Autenticação

Autenticação via JWT:

- Login com e-mail e senha
- Geração de token JWT contendo:

```json
{
  "user": {
    "id": number,
    "name": string
  }
}
````

* Token JWT do tipo `Bearer` deve ser enviado no header:

```
Authorization: Bearer <token>
```

---

## 📦 Rotas da API

### 📌 Users (protegido por JWT)

| Método | Rota        | Descrição     |
| ------ | ----------- | ------------- |
| POST   | /users/create      | Criar usuário |
| GET    | /users      | Listar todos  |
| GET    | /users/\:id | Buscar por ID |
| PUT    | /users/update/\:id | Atualizar     |
| DELETE | /users/delete/\:id | Remover       |

---

### 📌 Customers (protegido por JWT)

| Método | Rota            | Descrição     |
| ------ | --------------- | ------------- |
| POST   | /customers      | Criar cliente |
| GET    | /customers      | Listar todos  |
| GET    | /customers/\:id | Buscar por ID |
| PUT    | /customers/\:id | Atualizar     |
| DELETE | /customers/\:id | Remover       |

---

### 📌 Sales (protegido por JWT)

| Método | Rota        | Descrição     |
| ------ | ----------- | ------------- |
| POST   | /sales      | Criar pedido  |
| GET    | /sales      | Listar todos  |
| GET    | /sales/\:id | Buscar por ID |
| PUT    | /sales/\:id | Atualizar     |
| DELETE | /sales/\:id | Remover       |

---

### 📌 Auth

| Método | Rota  | Descrição                |
| ------ | ----- | ------------------------ |
| POST   | /auth | Login e geração de token |

---

## 📍 Banco de Dados PostgreSQL

Configure suas credenciais em um arquivo `.env`:

```
DB_HOST=
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_jwt
JWT_EXPIRES_IN=3600s
```


## ▶️ Como executar

1. Clone o projeto

```bash
git clone https://github.com/
cd saibweb
```

2. Instale as dependências

```bash
npm install
```

3. Configure o `.env`

4. Rode a aplicação

```bash
npm run start:dev
```



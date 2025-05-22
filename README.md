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

| Método | Rota          | Descrição                     |
| ------ | ------------- | ----------------------------- |
| POST   | /users/create | Criar novo usuário            |
| GET    | /users        | Listar todos os usuários      |
| GET    | /users/\:id   | Buscar usuário por ID         |
| PUT    | /users/update | Atualizar usuário autenticado |
| DELETE | /users/delete | Remover usuário autenticado   |

---

### 📌 Customers (protegido por JWT)

| Método | Rota                   | Descrição                |
| ------ | ---------------------- | ------------------------ |
| POST   | /customers/create      | Criar cliente            |
| GET    | /customers             | Listar todos os clientes |
| GET    | /customers/\:id        | Buscar cliente por ID    |
| PUT    | /customers/update/\:id | Atualizar cliente        |
| DELETE | /customers/delete/\:id | Remover cliente          |

---

### 📌 Sales (protegido por JWT)

| Método | Rota                           | Descrição                       |
| ------ | ------------------------------ | ------------------------------- |
| POST   | /sales/create                  | Criar nova venda                |
| GET    | /sales                         | Listar todas as vendas          |
| GET    | /sales/\:id                    | Buscar venda por ID             |
| GET    | /sales/customer/\:customer\_id | Vendas de um cliente específico |
| GET    | /sales/user/\:user\_id         | Vendas de um usuário específico |
| GET    | /sales/report?start=\&end=     | Relatório de vendas por período |
| PUT    | /sales/update/\:id             | Atualizar venda                 |
| DELETE | /sales/delete/\:id             | Remover venda                   |

---

### 📌 Auth

| Método | Rota        | Descrição                |
| ------ | ----------- | ------------------------ |
| POST   | /auth/login | Login e geração de token |



---

### ✅ Plus (Extras)
* [x] **Criptografar/descriptografar senha do usuário**
* [x] **Atualizar usuário autenticado, sem precisar passar id do usuario na rota**

  * `PUT /users/update`

* [x] **Remover usuário autenticado, sem precisar passar id do usuario na rota**

  * `DELETE /users/delete`

* [x] **Buscar vendas por cliente**

  * `GET /sales/customer/:customer_id`

* [x] **Buscar vendas por usuário**

  * `GET /sales/user/:user_id`

* [x] **Relatório de vendas por período**

  * `GET /sales/report?start=&end=`

---
## 📍 Banco de Dados PostgreSQL

Configure suas credenciais em um arquivo `.env` (copie o .env.example):

```
DB_HOST=db #para reconhecimento do docker
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

3. Configure o `.env` (copiar o `.env.example`)

4. Rode a aplicação

```bash
npm run start:dev
```

---

### 📚 Documentação adicional

Na raiz do projeto, há uma pasta chamada [`docs/`](./docs) contendo:

* ✅ **Collection do Postman** pronta para uso com todas as rotas.
* ✅ Documentação individual para os módulos:

  * `auth`
  * `users`
  * `customers`
  * `sales`

Cada documento inclui:

* 📌 Descrição das rotas
* 🗄️ Especificação dos campos no banco de dados
* 🔐 Requisitos de autenticação (quando aplicável)

---
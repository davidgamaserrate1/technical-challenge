
## 🧱 Estrutura do Banco de Dados


### 🔹 Users

| Campo    | Tipo     | Observações                    |
|----------|----------|---------------------------------|
| id       | number   | Autoincremento                 |
| name     | string   | Máximo 100 caracteres          |
| email    | string   | Máximo 100 caracteres (único)  |
| password | string   | Criptografada (bcrypt)         |
| active   | boolean  | Usuário ativo ou não           |

---


### 📌 Users (protegido por JWT)

| Método | Rota          | Descrição                     |
| ------ | ------------- | ----------------------------- |
| POST   | /users/create | Criar novo usuário            |
| GET    | /users        | Listar todos os usuários      |
| GET    | /users/\:id   | Buscar usuário por ID         |
| PUT    | /users/update | Atualizar usuário autenticado |
| DELETE | /users/delete | Remover usuário autenticado   |

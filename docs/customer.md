## 🧱 Estrutura do Banco de Dados

### 🔹 Customers

| Campo     | Tipo    | Observações              |
|-----------|---------|---------------------------|
| id        | number  | Autoincremento            |
| name      | string  | Máximo 100 caracteres     |
| address   | string  | Máximo 255 caracteres     |
| city      | string  | Máximo 100 caracteres     |
| state     | string  | 2 caracteres (UF)         |


## 📦 Rotas da API

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

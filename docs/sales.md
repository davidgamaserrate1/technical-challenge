
## 🧱 Estrutura do Banco de Dados

### 🔹 Sales

| Campo       | Tipo    | Observações                         |
|-------------|---------|--------------------------------------|
| id          | number  | Autoincremento                      |
| customerId  | number  | ID do cliente relacionado           |
| date        | Date    | Data do pedido                      |
| totalPrice  | number  | Preço total                         |
| userId      | number  | Usuário que cadastrou o pedido      |

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

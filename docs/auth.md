
## 🧱 Estrutura do Banco de Dados
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


### 📌 Auth

| Método | Rota        | Descrição                |
| ------ | ----------- | ------------------------ |
| POST   | /auth/login | Login e geração de token |


# Linkio Challenge

Uma API pequena em Express + TypeScript que demonstra autenticação e gestão de pedidos usando JWT, MongoDB e bcrypt. Este repositório é um esqueleto para desafios de código que implementa rotas, controllers, modelos e testes para que colaboradores possam executar, estender e avaliar a aplicação de exemplo rapidamente.

- [Link da coleção no postman](https://joaotambue13-5b9e13d8-6940719.postman.co/workspace/Jo%C3%A3o-Tambue's-Workspace~b15be79e-f3b8-4795-80cd-4a893c76b3d7/collection/50982599-cb12ac20-9754-4366-b852-23ef4ffb0ff0?action=share&source=copy-link&creator=50982599)

## Funcionalidades

- Autenticação e autorização baseada em JWT
- Hash de senha com `bcrypt`/`bcryptjs`
- Modelo e controller de pedidos
- Estrutura organizada em TypeScript (controllers, rotas, modelos, middlewares)

## Começando

Pré-requisitos:

- Node.js (recomenda-se v18+)
- Uma instância MongoDB em execução (local ou na nuvem)

Clonar e instalar:

```bash
git clone <repo-url>
cd linkio-challenge
npm install
```

Executar em desenvolvimento (recarregamento automático com TypeScript):

```bash
npm run dev
```

Build e iniciar (produção):

```bash
npm run build
npm start
```

## Configuração

Crie um arquivo `.env` na raiz do projeto (exemplo de variáveis usadas pela aplicação):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/exemplo
JWT_SECRET=seu_segredo_jwt_aqui
```

Ajuste os valores conforme necessário. A aplicação lê a configuração de `process.env` via `src/config/db.ts` e `src/server.ts`.

## Scripts

Scripts npm disponíveis (conforme `package.json`):

```bash
npm run dev    # Executar com ts-node-dev para desenvolvimento
npm run build  # Compilar TypeScript para /dist
npm start      # Iniciar a aplicação compilada em /dist
```

## Exemplos

Os endpoints comuns estão organizados em rotas e controllers. Veja o código-fonte para detalhes: [src/server.ts](src/server.ts), [src/app.ts](src/app.ts).

Registro / Login (exemplo):

```bash
# Registrar (exemplo)
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# Login (exemplo)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

Criar um pedido (autenticado):

```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"item":"Widget","qty":2}'
```

Veja as definições de rota em [src/routes](src/routes) e a lógica dos controllers em [src/controllers](src/controllers).

## Executando testes

Este repositório inclui um arquivo de teste em [tests/order.test.ts](tests/order.test.ts). Os testes usam o `vitest`, que está listado nas dependências.

Execute os testes via npx (ou adicione um script `test` se preferir):

```bash
npx vitest
```

## Onde obter ajuda

- Abra uma issue neste repositório para bugs ou dúvidas.
- Inspecione os arquivos fonte e os testes para exemplos de uso: [tests/order.test.ts](tests/order.test.ts).

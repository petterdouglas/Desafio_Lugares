# Desafio_Lugares

## Como executar a aplicação

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Git (opcional)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/petterdouglas/Desafio_Lugares.git
cd Desafio_Lugares
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

### Execução

1. Crie uma pasta .env.local e adicione as seguintes baseURL's:

> **VITE_API_COUNTRY=https://restcountries.com/v2/**

> **VITE_API_LOCAL=http://localhost:3001/**

2. Inicie o servidor de desenvolvimento ou acesse o deploy:

**https://desafio-lugares.vercel.app**

ou

```bash
npm run dev
# ou
yarn dev
```

3. Em outro terminal, inicie o JSON Server:

```bash
npm run start
# ou
yarn start
```

## Testes

1. Para rodar os 3 testes básicos de renderização da tela principal:

```bash
npm run test
# ou
yarn test
```

## Observações

Certifique-se que as portas **3000** e **3001** estão disponíveis

Para alterar as portas, edite os scripts no package.json

## Tecnologias Utilizadas

**⚛️ React 19 com TypeScript**

**🚀 Vite e Vitest**

**💨 TailwindCSS**

**📡 json-server**

**📝 react-hook-form**

**🎭 react-imask**

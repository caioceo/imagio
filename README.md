# Imagio

Imagio é uma aplicação web para criação de perfis e publicação de projetos. O foco é oferecer uma forma simples, organizada e visual de apresentar trabalhos, com suporte a imagens, links e vídeos.

## Escopo e funcionalidades

- Perfil de usuário: criação e edição
- Projetos: upload e exibição com imagens, descrição e links externos
- Colaboradores: marcação de participantes (helpers)
- Vídeos: integração opcional via YouTube (ID)
- Busca: consulta simples por profissionais

## Aprendizado

Este projeto pode servir como base para estudo e prática de tópicos modernos de desenvolvimento web:

- SvelteKit 5
  - Organização por rotas (`+page.svelte`, `+layout.svelte`) e rotas dinâmicas (`[username]`, `[number]`)
  - Separação de lógica de servidor (`+page.server.ts`) e endpoints (`+server.ts`)
  - Padrões de estado e componentes reativos

- Persistência com MongoDB e Prisma
  - Modelagem de dados e acesso via ORM
  - Retorno de respostas JSON em endpoints (ex.: `GET /api/user/get`)

- Upload e processamento de imagens
  - Manipulação de `FileList` no cliente e pré-visualização
  - Pipeline de processamento com `sharp` no servidor
  - 
- Boas práticas de projeto
  - Tipagem com TypeScript e checagem com `svelte-check`
  - Formatação consistente com Prettier
  - Separação de responsabilidades entre camada de UI, endpoints e utilitários

## Arquitetura e stack

- Frontend: Svelte 5 + SvelteKit
- Build tool: Vite
- Estilos: Tailwind CSS
- Banco de dados: MongoDB
- ORM: Prisma
- Ícones: Lucide Svelte

Dependências principais (ver `package.json` para versões):
- `@sveltejs/kit`, `svelte`, `vite`
- `tailwindcss`
- `prisma`, `@prisma/client`, `mongodb`
- `sharp`, `bcrypt`
- `@lucide/svelte`

## Instalação e execução

Pré-requisitos:
- Node.js 18+ (ou superior)
- Instância/URI de MongoDB

Passos:

```bash
# Clone o repositório
git clone https://github.com/caioceo/imagio.git
cd imagio

# Instale as dependências
npm install

# Gere artefatos do Prisma
npx prisma generate

# Ambiente de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`.

Build e preview:

```bash
npm run build
npm run preview
```

## Configuração

Crie um arquivo `.env` na raiz com a conexão do banco:

```env
DATABASE_URL="mongodb://usuario:senha@host:porta/dbname?options"
```

## Estrutura do projeto

```
imagio/
├─ src/
│  ├─ app.html
│  ├─ app.css
│  ├─ routes/
│  │  ├─ +layout.svelte
│  │  ├─ +page.svelte                  # Home, login/registro
│  │  ├─ [username]/
│  │  │  ├─ edit-profile/+page.svelte  # Edição de perfil
│  │  │  ├─ project/
│  │  │  │  ├─ new/+page.svelte        # Upload de novo projeto
│  │  │  │  ├─ [number]/+page.svelte   # Visualização de projeto
│  │  │  │  ├─ [number]/+page.server.ts
│  │  ├─ api/
│  │  │  ├─ user/
│  │  │  │  ├─ get/+server.ts          # GET /api/user/get?username=...
│  │  │  │  ├─ register/+server.ts     # POST /api/user/register
│  │  │  │  ├─ login/+server.ts        # POST /api/user/login
│  ├─ lib/
│  │  ├─ server/prisma.ts              # Cliente Prisma
│  │  ├─ utils.ts                      # Funções utilitárias (ex.: getProjectById)
├─ prisma/
│  ├─ schema.prisma
├─ static/
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
└─ svelte.config.js
```

## Rotas e endpoints

Rotas principais:
- `/` — página inicial, login/registro
- `/[username]` — espaço do usuário (perfil)
- `/[username]/edit-profile` — edição de perfil
- `/[username]/project/new` — criação de projeto
- `/[username]/project/[number]` — página de projeto

Endpoints (HTTP):
- `GET /api/user/get?username={username}` — obtém dados de um usuário
- `POST /api/user/register` — registra usuário
- `POST /api/user/login` — autentica usuário

Os endpoints retornam JSON. Em caso de erro, a resposta inclui mensagem descritiva.

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview do build
npm run check     # svelte-check + TypeScript
npm run format    # Prettier (write)
npm run lint      # Prettier (check)
```

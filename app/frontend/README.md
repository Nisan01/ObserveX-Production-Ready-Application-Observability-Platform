# PedalCraft Bike Store

React/Vite e-commerce frontend for selling bikes. The app includes a responsive
home page, product catalog, category and search filtering, cart drawer, checkout
summary, and a multistage Dockerfile.

## Run with Docker

```bash
docker build -t pedalcraft-frontend .
docker run --rm -p 8080:80 pedalcraft-frontend
```

Open `http://localhost:8080`.

## Local development

Dependencies are declared in `package.json`, but this workspace was prepared
without installing `node_modules`.

```bash
npm install
npm run dev
```

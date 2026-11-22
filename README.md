# Hunsrik na Prática

Aplicação demonstrativa para apoiar atividades de aprendizagem e preservação do Hunsrik.

## Desenvolvimento

Requer Node.js e npm.

```sh
npm install
npm run dev
```

Para validar a compilação de produção e visualizar o resultado:

```sh
npm run build
npm run preview
```

## Publicação no GitHub Pages

O workflow em `.github/workflows/deploy-pages.yml` publica automaticamente a branch `main` após cada push e também pode ser iniciado manualmente em **Actions**. No GitHub, configure **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O Vite detecta o nome do repositório no GitHub Actions e gera os caminhos corretos para um site de projeto, como `/hunserik_site/`. No desenvolvimento local, continua usando `/`. O workflow também publica `404.html` para manter as rotas do React Router ao recarregar páginas internas.

O diagnóstico, o plano progressivo e as limitações atuais estão em [DIAGNOSTICO-MVP.md](DIAGNOSTICO-MVP.md).

---

# Figma Make and Code Layers files

This directory contains scripts, configuration, and generated files that Figma
Make and Code Layers use to install dependencies, run your app, build previews,
and publish your site.

Commit this directory to your repository so Figma Make and Code Layers can reuse
it the next time this repository is imported and start your preview server right
away, without setting up the project from scratch.

To learn more about these files, see
[Use Git with Figma Make and code layers](https://help.figma.com/hc/en-us/articles/44220165255063-Use-Git-with-Figma-Make-and-code-layers#h_01M5X47F86RN1RW0F8565KZHB8)
in the Figma Help Center.

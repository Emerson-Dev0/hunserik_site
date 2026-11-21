# Diagnóstico técnico e plano do MVP

## Estado da base (entrega 1)

- Aplicação React + TypeScript com Vite, React Router e Tailwind CSS v4.
- A entrada real está na raiz (`main.tsx` → `App.tsx` → `app/routes.tsx` e `app/App.tsx`). `public/` contém uma cópia antiga da interface e não é a entrada usada pelo HTML.
- Interface existente: início, vocabulário, pronúncia e jogo de associação, com identidade visual infantil em verde, creme e cores quentes; layout adapta-se a telas estreitas e respeita redução de movimento.
- Rotas principais e navegação entre telas já existem. Rota desconhecida retorna ao início.
- O vocabulário está centralizado em `app/data/vocabulary.ts` com tipos para forma Hunsrik, referência em português, categoria, tema, variante, fonte e estado de validação.
- Os controles de áudio apenas animam uma barra: não há arquivo de áudio reproduzido. A interface sinaliza que as faixas são demonstração.
- Não há API, banco de dados, autenticação, fluxo de envio nem persistência local. Não há painel de conteúdo.
- A configuração inicial não era executável neste checkout: faltava `package.json`, o HTML apontava para `/src/main.tsx` inexistente, o Vite importava configuração de `/.figma/make/site.json` ausente e o TypeScript incluía `src/` inexistente.

## Mudanças desta entrega

- Criado `package.json` e `package-lock.json` com scripts de desenvolvimento, build e preview e as dependências exigidas pelos imports existentes.
- Corrigidos os caminhos de entrada do HTML e de configuração do Vite para os arquivos presentes.
- Ajustado o escopo do TypeScript para compilar a estrutura existente.
- Biblioteca: pesquisa em português e Hunsrückisch, categorias apresentadas em cartões com contagem, filtros por categoria, cartões de palavras e detalhes acessíveis com fonte, variantes e estado de validação.
- Os seis rótulos em português existentes foram mantidos como exemplos demonstrativos, sem formas Hunsrik ou traduções atribuídas. Eles não são material oficial.
- Importado `vocabulario_hunsrik_portugues.txt`: 189 linhas aproveitáveis, consolidadas em 188 registros sem duplicação exata. Todos estão pendentes; 11 entradas têm formas alternativas explícitas e preservadas.
- Os registros importados mantêm categoria e observação original, referência bibliográfica (IHLBrI 2018 ou Alves/UFMG 2026), forma Hunsrückisch original e variantes auxiliares sem normalizar grafia. Tema e variante regional ficam não informados quando a fonte não os especifica.
- Jogo de associação usa registros com ambos os campos preenchidos para montar partidas, alternativas embaralhadas, feedback, pontos, contagem de acertos, conclusão e reinício. Os 188 pares pendentes ficam disponíveis em modo de demonstração, sem serem apresentados como oficiais; níveis requerem 3, 5 e 8 pares.
- A configuração do Vite desativa a cópia estática redundante de `public/`, que conflitava com a transformação dos arquivos da aplicação.

## Plano progressivo

1. **Base confiável (concluído):** recuperar configuração coerente com a estrutura existente, instalar dependências, gerar lockfile, compilar para produção e documentar limitações.
2. **Biblioteca (estrutura concluída):** pesquisa, navegação por cartões de categoria, detalhes e estados estão implementados. Pendente receber e validar conteúdo real e registrar o responsável pela validação; favoritos/aprendidas ficam fora do escopo desta entrega.
3. **Áudio autêntico:** associar gravações reais e falante/variante; controles devem tocar arquivos reais e informar claramente quando indisponíveis.
4. **Jogo de associação (fluxo funcional em demonstração):** partidas, dificuldade, embaralhamento, pontuação e feedback usam pares completos da biblioteca. Conteúdo pendente continua identificado como não oficial. Outros jogos seguem pendentes.
5. **Passaporte:** perfil, seleção de avatar, progresso e conquistas com persistência local explicitamente identificada, enquanto não houver backend.
6. **Oficinas e curadoria:** temas e atividades; painel demonstrativo de submissão/revisão, deixando claro que não há autenticação/backend.
7. **Estabilização:** revisar acessibilidade, responsividade, navegação e interações e documentar operação após as funcionalidades anteriores.

## Pendências e riscos conhecidos

- O build de produção passa (`npm run build`). Os fluxos visuais e de interação precisam de validação com falantes e usuários finais.
- Os 188 registros importados aguardam revisão de falantes. O jogo pode ser utilizado em modo de demonstração; os resultados não certificam a precisão linguística e o material não é oficial até validação.
- A tela de pronúncia permanece demonstrativa; não há áudio real. Favoritos, progresso, perfil, jogos adicionais, oficinas, administração, backend e autenticação não foram implementados.
- `public/` ainda contém uma cópia antiga dos fontes, ignorada pelo Vite via `publicDir: false`; avaliar sua remoção ou atualização em uma limpeza futura.
- Não há cobertura de testes, backend, banco de dados ou autenticação configurados.

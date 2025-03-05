# Word Game: Um Desafio de Cognatos

## Apresentação do Jogo

O **Word Game** é um jogo educativo e dinâmico que desafia os jogadores a identificarem palavras cognatas e não cognatas em inglês. O objetivo é testar e aprimorar o conhecimento linguístico dos participantes, tornando a experiência divertida e envolvente.

## Regras do Jogo

1. O jogo apresenta uma palavra aleatória em inglês.
2. O jogador deve decidir se a palavra é **cognata** (parecida com sua versão em português) ou **não cognata**.
3. Para responder, o jogador clica no botão correspondente à sua escolha.
4. Se a resposta estiver correta, o jogador ganha **10 pontos**.
5. Se errar, não recebe pontos.
6. O placar é atualizado automaticamente e os jogadores podem visualizar o ranking com as maiores pontuações.
7. O jogo pode ser jogado quantas vezes o jogador quiser para melhorar sua pontuação.

## Programação do Jogo

O **Word Game** foi desenvolvido utilizando tecnologias modernas e eficientes para garantir uma experiência fluida e responsiva.

### Tecnologias Utilizadas

- **Node.js**: Plataforma principal do servidor para gerenciar requisições.
- **Express.js**: Framework para criar rotas e manipular requisições HTTP.
- **Express-Handlebars**: Motor de templates para renderizar páginas dinâmicas.
- **Sequelize**: ORM utilizado para interagir com o banco de dados SQLite.
- **SQLite**: Banco de dados leve para armazenar pontuações dos jogadores.
- **CSS**: Estilização para melhorar a interface do usuário.

### Estrutura do Código

- **Servidor em Node.js**: Gerencia requisições e respostas entre o cliente e o banco de dados.
- **Banco de Dados (SQLite + Sequelize)**: Registra os nomes dos jogadores e suas pontuações.
- **Templates Handlebars**: Renderizam a interface do jogo e a tabela de pontuação.
- **Rotas Principais**:
  - `/` → Página inicial do jogo com uma palavra aleatória.
  - `/check` → Processa a resposta do jogador e salva a pontuação.
  - `/leaderboard` → Exibe o ranking dos melhores jogadores.

## Conclusão

O **Word Game** é um jogo intuitivo e educativo, ideal para quem quer testar ou aprimorar seu vocabulário em inglês. Seu desenvolvimento em **Node.js**, com o uso de **Express, Handlebars e Sequelize**, proporciona uma experiência dinâmica e envolvente para os jogadores.

Seja bem-vindo ao desafio! Você consegue alcançar o topo do ranking?
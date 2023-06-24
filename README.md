## Para iniciar a utilização do template, após realizar clone do repository, será necessário utilizar o seguinte comando no terminal:

> npm install

Esse comando fará com que todas as dependências presentes no arquivo package.json sejam instaladas corretamente. Importante notar que estamos utilizando o Eslint e Prettier, dessa forma será necessário instalar as extensões no vscode para auxiliar a formatação do código.

## Estrutura básica do template:

/webapi/

/src//controllers/

/src//models/

/src//service/

/src//routers/

/src/app.ts

/src/server.ts

.env

package.json

tsconfig.json

- server.ts: módulo de inicialização do servidor web onde nossa webapi estará hospedada, módulo de infraestrutura;
- app.ts: módulo de configuração da webapi, módulo de aplicação;
- routers: pasta onde guardaremos os módulos de roteamento, que mapeiam os endpoints para as funções de controle;
- controllers: pasta onde guardaremos os módulos de controle, que recebem as requisições roteadas e fazem os processamentos necessários;
- models: pasta onde guardaremos os módulos de entidades, que contém a especificação delas;
- service: pasta onde guardaremos os módulos de repositório, que contém as funções de leitura, exclusão, inserção, etc das entidades;

## API seguindo a seguinte lógica

A requisição chega no app.ts e é roteada por algum router. O roteamento da requisição a leva até um controller que fará seu processamento. Caso ele precise de dados, usará repository(service) da entidade que é o módulo responsável pelo acesso a dados, especificados pelo model.

![image](https://user-images.githubusercontent.com/108702072/224134375-0caef268-ead4-4892-aa62-e62030070691.png)

# escalaveis_PB_TP1
> Projeto feito como Trabalho Final para a disciplina *Projeto de Bloco: Engenharia de Softwares Escaláveis* do *Instituto Infnet* 
> Por João Cicero - 2025
> Feito com base em fork do projeto [escalaveis_PB_TP1](https://github.com/jvcmtr/escalaveis_PB_TP1/tree/TP3)

## Serviço de Issues
`IssueService/`
Projeto REST API em Java SpringBoot para CRUD de Issues

## Serviço de Auditoria
`HistoryService/`
Projeto REST API SpringBoot para propositos de auditoria.

## Frontend
`Frontend/`
Projeto React que consome os endpoints da API.


### Rodando Localmente
1. Faça o download do repositorio 
2. Rode a **Serviço de Issues**
    ```
    cd IssueService/
    mvn spring-boot:run
    ```
3. Em um novo terminal, rode o **Serviço de Auditoria**
    ```
    cd HistoryService/
    mvn spring-boot:run
    ```
4. Em um novo terminal, rode o app **frontend**
    ```
    cd Frontend/
    npm install
    npm run
    ```
5. Acesse o portal atravéz de `http://localhost:3000`

### Postman
É possivel acessar as APIs do **Serviço de Issues** e o **Serviço de Auditoria** atravéz do postman usando as colections disponiveis:
- `postman\collections\Servico_de_Issues.postman_collection.json`
- `postman\collections\Servico_de_Auditoria.postman_collection.json`

Para saber como importar uma collection do postman [Clique Aqui](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/#import-postman-data)

# Bootstrap Total - Ponto G++

## Boilerplate para Bootstrap 4 com Gulp

Um _workflow_ usando o Gulp para desenvolvimento _front-end_ com o **Bootstrap 4**. Para sua utilização é preciso instalar o Gulp globalmente no seu sistema, com o comando:

```bash
$ npm install gulp-cli -g
```

## Instruções de uso:

1. Clone o repositório ou copie o arquivo _zip_.
2. Instale as dependências com o comando:

```bash
$ npm install
```

3. Inicie o _script_ com o comando:

```bash
$ npm start
```

4. Os arquivos-fonte estão na pasta **src**, nas sub-pastas respectivas:

* html - inclusive index.html;
* img - imagens para serem otimizadas;
* js - arquivos javaScript;
* scss - use o arquivo **main.scss** para personalizar seu **css**.

5. Os arquivos processados são colocados na pasta **build**. Em produção, ajuste a variável **devBuild** no arquivo **gulpfile.js** para **true**. Dessa forma, os arquivos javascript e css serão comprimidos.

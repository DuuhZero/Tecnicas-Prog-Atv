# Atividade 5 de Técnicas de Programação


### Utilizei o MongoDb Atlas como banco de dados nesta aplicação, é necessário ter um cluster criado para poder conectar ao projeto

## Como rodar o projeto

### Entre no diretório do projeto
```
cd atlantis-hotel
```


### Configure o .env do backend
Vá até a pasta backend 
```
cd backend
```
e crie um arquivo .env para conexão com o banco de dados mongoDB neste formato
```
MONGODB_URI=mongodb+srv://<usuario>:<password>@<nome-do-banco>.f8v6kum.mongodb.net/?retryWrites=true&w=majority&appName=<nome-do-banco> PORT=3001
```

Você pode pegar esse modelo de mongodb_uri no momento que cria o banco no site e vai em connect

### Instale as dependencias no backend e rode o server para o nosso Backend
```
npm install
npm run dev
```

### Instale as dependencias no frontend e rode a aplicação react
```
cd frontend
npm install
npm run dev
```

### Após isto basta clicar no link que irá aparecer no terminal.
```
http://localhost:5173/
```

Agora basta testar todas as funcionalidades presentes no site

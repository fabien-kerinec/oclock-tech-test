# Oclock fullstack test technique

Dans ce repos, on retrouve ma proposition pour le tet technique pour le poste : `formateur JS fullstack`

## Detail du test

Dans ce test, il était demandé de refaire le memory game (jeu de carte où il faut retrouver les pairs parmi un ensemble de carte retourné)  
Les contraintes étaient les suivantes :

- Utilisation de html / css / js
- Possibilité d'utiliser un preprocesseur css
- Mettre en place une base de donnée pour sauvegarder les scores
- Le jeu doit être codé en objet
- Garder en tête que ce projet doit avoir un potentiel éducatif

Dans la suite de ce document, je vais essayer d'expliquer mes choix ainsi que la façon dont j'ai pensé l'application

## Cible d'un point de vue educatif

Étant donnée que ma candidature porte principalement sur du javascript, j'ai décidé prendre pour cible des étudiant qui seraient en découverte de NODE.JS.  
Le but étant ici de donner un exemple relativement simple de plusieurs notions importantes lors de la construction du backoffice via nodeJS ainsi que de faire une découverte des bases de données non-relationnelle.  
J'ai quand même souhaité faire en sorte de garder de la cohérance dans la façon dont le jeu est développé.  
J'ai décidé de tout gérer côté backoffice pour éviter de pouvoir intervenir dessus côté front.  
De même en plus de la base de données, j'ai souhaité montrer une deuxième façon de stocker des données dans l'application.

## Stack

| environnement   | details                |
| --------------- | ---------------------- |
| frontend        | HTML / JS / SCSS / CSS |
| backend         | NODE.JS / Express.JS   |
| base de données | MongoDB                |

Concernant les packages utilisés, j'ai la aussi voulu en utiliser le moins possible pour éviter la complexité / abstraction

| package      | version | descriptions                                                                              |
| ------------ | ------- | ----------------------------------------------------------------------------------------- |
| nodejs       | v16.4.0 | Permet d'utiliser du javascript côté serveur                                              |
| express      | v4.17.1 | Permet de créer un serveur web et aide la création d'api                                  |
| mongoose     | v6.0.7  | Permet de définir gérer la connexion a la base de données et de génerer des schémas typés |
| cors         | v2.8.5  | Permet de configurer les cors et de les utiliser comme middleware express                 |
| node-sass    | v1.42.1 | Permet de compiler le scss vers du css classique                                          |
| uuid         | v8.3.2  | Permet de génerer des uuid. C'est un format pour former des ids uniques                   |
| dotenv       | v10.0.0 | Permet de configurer des informations sensibles, exemples les clefs d'API                 |
| nodemon      | v2.0.13 | Permet d'avoir un reload automatique du serveur pendant le developpement                  |
| autoprefixer | v2.0.13 | Permet de rajotuter des prefix lors de l'execution d'une commande en l'occurence au build |
| postcss-cli  | v2.0.13 | Permet d'executer certaines des commande postcss via l'invit de commande                  |

## Demarrage du projet et detail commandes

Pour créer une base de données mongodb gratuitement vous avez plusieurs possibilités :

- en local de manière classique
- en ligne par exemple via https://www.mongodb.com/fr-fr

J'ai choisi d'utiliser la version en ligne pour pouvoir mettre en ligne le projet.  
En vous créant un compte puis en suivant le processus de création en faisant attention à bien sélectionner l'offre free.  
Vous serez en mesure de récuperer les informations nécessaires.  
Pour visualiser le contenu de votre base de données, vous pourrez utiliser le logiciel https://www.mongodb.com/fr-fr/products/compass

Commencer par créer un `.env` a partir du `.env.sample`.  
L'ensemble des variables sont necessaires à configurer. Le detail de celles-ci sont plus bas

Attention, en fonction de votre système d'exploitation, en phase de dev, il faudra lancer séparement `npm run dev` et `npm run scss` pour que tout s'execute proprement

| command | descriptions                                                                             |
| ------- | ---------------------------------------------------------------------------------------- |
| start   | Demarre le serveur                                                                       |
| dev     | Demarre le serveur en executant deux autres commande `server` et `scss`                  |
| server  | Demarre nodemon qui permet de redemarrer automatiquement le serveur en cas de changement |
| compile | Permet de compiler le scss lors du build                                                 |
| prefix  | Permet de lancer l'autoprefixer lors du build                                            |
| build   | Compile tout le scss lors du build pour le rendre compatible et utilisable en css        |
| scss    | Permet une compilation à la volée lors de changement                                     |

## Architecture

Dans l'optique d'une découverte de Node.JS, j'ai voulu rester en environnement fermé et donc tout gérer directement dans la même application.  
Nous nous retrouvons donc avec une seule application et pas, comme souvent dans le cas de nodeJS une application back et une application front séparée

#### Backend

J'ai choisir de segmenter mon application en trois parties :

- les services : qui vont me permettre de contrôler l'ensemble du jeu
- les routes : qui vont permettre à la partie front de communiquer avec la partie backend
- la base de données qui va nous permettre de stocker l'ensemble des parties gagné

##### Variable d'environnement

Permet de stocker des informations souvent sensibles, ou globales à l'application.
Pour des raison pratiques j'importe ces variables dans un fichier de configuration : `config.js`  
Cela permet de rajouter de la documentation JSDoc qui permet une autocompletion plus complète

| variable            | type   | description                                                           |
| ------------------- | ------ | --------------------------------------------------------------------- |
| PORT                | Number | Permet de definir un port par default                                 |
| GAME_DURATION       | Number | Permet de definir un temps de jeu pour notre application              |
| GAME_PAIR           | Number | Permet de definir un nombre de paires pour notre jeu.                 |
| MONGO_USER          | String | User permettant la connexion à la base de données                     |
| MONGO_PASS          | String | Mot de passe permettant la connexion à la base de données             |
| MONGO_HOST          | String | Url permettant la connexion à la base de données                      |
| MONGO_DATABASE_NAME | String | Nom de la base de donnée permettant la connexion à la base de données |

##### Services

C'est ici que l'ensemble du jeu va être géré.  
L'objectif étant de gérer le jeu via des class, j'ai crée deux class

- Game : Gère ce qui se passe sur le jeu de manière génerale, il va aussi contenir un Board
- Board : Va gérer l'état des cards du jeu ainsi que definir de manières aléatoire le plateau.
- Data : Solution de stockage des board pour l'exemple. Dans notre cas, il va garder en mémoire l'ensemble des board qui sont en cours. Ils sont identifiés de manière unique via un UUID

##### Routes

J'ai mis en place deux type de routes :

- La route initiale : `/` qui permet un rendu html
- Les routes de l'api : `/api/game/XXXX` qui permette d'interagir avec le jeu

##### Base de donnée

La base de données ici est simple.  
Nous avons un seul model qui va définir une collection `leaderboard` et contenir des documents comprenant les scores des parties finies.

MongodDB est une base de données non-relationnelle orientée document. Ce qui veut dire que contrairement aux bases de données plus classiques, les éléments ne sont pas liés entre eux, et que les données sont stocké sous forme de collections et de documents au lieu d'être basé sur des tables et des colonnes.  
Les documents sont des paires de clés / valeurs comme des objets Javascript, ou du JSON.  
Les bases de données telles que mongoDB sont réputés pour leurs flexibilités et leurs performances, cependant, elles ne sont pas à utiliser dans tous les cas et peuvent vite devenir complexe à maintenir si jamais les données sont liées entre elles.

Vous pourrez trouver plus d'information à ce sujet dans cet article : https://datascientest.com/mongodb

Mongoose est une interface qui va nous permettre de requéter de maniere simple la base de données.  
On y retrouve des methodes préconcue pour faire des requète tels que :

- find() pour récuperer des éléments
- findById() pour récuperer un élément en fonction de son ID
- create() pour créer des éléments
- updateOne() pour mettre à jour un élément
- updateMany() pour mettre à jour un array d'éléments
- Vous en trouverez d'autres à l'url : https://mongoosejs.com/docs/queries.html

De même il permet de créer des modèles de données permettant de typer la base de données
Vous trouverez l'ensemble de la documentation ici : https://mongoosejs.com/docs/guide.html

##### Utils

Cette partie de l'app est surtout pour l'exemple, cela permet d'avoir un ensemble de méthode que nous pourrons réutiliser dans notre application.

#### Frontend

La partie front end est très classique.  
Le scss est compilé en un fichier scss.  
le js sert exclusivement a gérer les appels à l'api via fetch et à traiter les informations qui reviennent de l'api.  
Pour rajouter quelques petites choses que tout le monde ne connait pas, j'ai décidé d'utiliser deux choses :

- lorem picsum : une api permettant de génerer des images en fonction d'une taille précisé dans l'url => https://picsum.photos/
- lottie files : qui permet d'avoir des animation svg qui sont faisable via after effect. Ici j'ai utilisé des animations présentes dans leur bibliotèque gratuite. => https://lottiefiles.com/featured

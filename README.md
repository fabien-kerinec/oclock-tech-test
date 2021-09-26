# Oclock fullstack test technique

Dans ce repos, on retrouve ma proposition pour le tet technique pour le poste : `formateur JS fullstack`

## Detail du test

Dans ce test, il était demandé de refaire le memory game (jeu de carte ou il faut retrouver les pairs parmis un ensemble de carte retournée)  
Les contraintes étaient les suivantes :

- Utilisation de html / css / js
- Possibilité d'utiliser un preprocess css
- Mettre en place une base de donnée pour sauvegarder les scores
- Le jeu doit être codé en objet
- Garder en tête que ce projet doit avoir un potentiel educatif

Dans la suite de ce document, je vais essayé d'expliquer mes choix ainsi que la façon dont j'ai pensé l'application

## Cible d'un point de vue educatif

Etant donnée que ma candidature porte principalement sur du javascript, j'ai décidé prendre pour cible des étudiant qui seraient en découverte de NODE.JS.  
Le but étant ici de donner un exemple relativement simple de plusieurs notions importantes lors de la construction du backoffice via nodeJS ainsi que de faire une decouverte des base de données non relationnelle.
J'ai quand même souhaité faire en sorte de garder de la coherance dans la façon dont le jeu est developpé.  
J'ai decidé de tout gerer côté backoffice pour éviter de pouvoir intervenir dessus côté front.
De même en plus de la base de donnée, j'ai souhaité montrer une deuxieme façon de stocker des données dans l'application.

## Stack

| environnement  | details                |
| -------------- | ---------------------- |
| frontend       | HTML / JS / SCSS / CSS |
| backend        | NODE.JS / Express.JS   |
| base de donées | MongoDB                |

Concernant les packages utilisés, j'ai la aussi voulu en utiliser le moins possible pour éviter la complexité / abstraction

| package  | version | descriptions                                                                            |
| -------- | ------- | --------------------------------------------------------------------------------------- |
| nodejs   | v16.4.0 | Permet d'utiliser du javascript côté serveur                                            |
| express  | v4.17.1 | Permet de créer un serveur web et aide la creation d'api                                |
| mongoose | v6.0.7  | Permet de definir gerer la connexion a la base de donnée et de generer des schemas typé |
| cors     | v2.8.5  | Permet de configurer les cors et de les utiliser comme middleware express               |
| sass     | v1.42.1 | Permet de compiler le scss vers du css classique                                        |
| uuid     | v8.3.2  | Permet de generer des uuid. C'est un format pour former de id unique                    |
| dotenv   | v10.0.0 | Permet de configurer des informations sensibles, exemples les clef d'API                |
| nodemon  | v2.0.13 | Permet d'avoir un reload automatique du serveur pendant le developpement                |

## Architecture

Dans l'optique d'une decouverte de Node.JS, j'ai voulu rester en environnement fermé et donc tout gerer directement dans la même application  
Nous nous retrouvons donc avec une seule application et pas, comme souvent dans le cas de nodeJS une application back et une application front séparée

#### Backend

J'ai choisir de segmenter mon application en trois parties :

- les serivces : qui vont me permettre de controller l'ensemble de mon jeu
- les routes : qui vont permettre a la partie front de communiquer avec la partie backend
- la base de données qui va nous permettre de stocker l'ensemble des partie gagner

##### Variable d'environnement

Permet de stocker des informations souvent sensibles, ou globales à l'application.
Pour des raison pratique j'importe ces variable dans un fichier de configuration : `config.js`  
Cela permet de rajouter de la documentation JSDoc qui permet une autocompletion plus complete

| variable            | type   | description                                                          |
| ------------------- | ------ | -------------------------------------------------------------------- |
| PORT                | Number | Permet de definir un port par default                                |
| GAME_DURATION       | Number | Permet de definir un temps de jeu pour notre application             |
| GAME_PAIR           | Number | Permet de definir un nombre de pair pour notre jeu.                  |
| MONGO_USER          | String | User permettant la connexion à la base de donnée                     |
| MONGO_PASS          | String | Mot de passe permettant la connexion à la base de donnée             |
| MONGO_HOST          | String | Url permettant la connexion à la base de donnée                      |
| MONGO_DATABASE_NAME | String | Nom de la base de donnée permettant la connexion à la base de donnée |

##### Services

C'est ici que l'ensemble du jeu va être géré.  
L'objectif étant de gerer le jeu via des class, j'ai crée deux class

- Game : Gere ce qui se passe sur le jeu de manière generale, il va aussi contenir un Board
- Board : Va gerer l'etat des card du jeu ainsi que definir de manières aleatoire le plateau.
- Data : Solution de stockage des board pour l'exemple. Dans notre cas, il va garder en mémoire l'ensemble des board qui sont en cour. Ils sont identifié de manière unique via un UUID

##### Routes

J'ai mis en place deux type de routes :

- La route initial : `/` qui permet un rendu html
- Les routes de l'api : `/api/game/XXXX` qui permette d'interagir avec le jeu

##### Base de donnée

La base de donnée ici est simple.  
Nous avons un seul model qui va definir une collection `leaderboard` et contenir des documents comprenant les scores de partie finies

##### Utils

Cette partie de l'app est surtout pour l'exemple, cela permet d'avoir un ensemble de methode que nous pourrons réutiliser dans notre application.

#### Frontend

La partie front end est très classique classique.
Le scss est compilé en un fichier scss
le js sert exclusivement a gerer les appel a l'api via fetch et a traité les informations qui reviennent de l'api.
Pour rajouter quelques petite choses que tout le monde ne connait pas, j'ai decidé d'utiliser deux choses :

- lorem picsum : une api permettant de generer des images en fonction d'une taille precisé dans l'url
- lottie files : qui permet d'avoir des animation svg qui sont faisable via after effect. Ici j'ai utilisé des images presente dans leurs bibliotèques gratuite.

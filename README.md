# cswReader 2

cswReader est un outil simple et ouvert de consultation de catalogues de métadonnées conformes au format ISO 19139 / INSPIRE (flux CSW).

La présente documentation est adressée aux personnes souhaitant installer cswReader et contribuer au projet.

Un [Guide d'utilisation de cswReader](./src/config/app/locales/fr/pages/help.md) est disponible en ligne à partir de l'application.

Une démo est en ligne à l'adresse: http://geograndest.net/cswreader2

## Fonctionnalités principales

-   Consultation de flux CSW de métadonnées ISO/INSPIRE sous forme de grille et de liste
-   Recherche de fiches de métadonnées ISO/INSPIRE
-   Consultation de fiches de métadonnées ISO/INSPIRE

## Installation

### Prérequis

L'application ne nécessite pas de prérequis pour fonctionner à partir du code compilé. Il vous suffit de copier le contenur du dossier `build` sur votre serveur.

Si vous souhaitez compiler vous-même le code, vous aurez cependant besoin de nodejs en local (utiliser la commande `npm install` pour disposer des packages requis).
Par défaut, le code est compilé via webpack avec les commandes: `npm run serve` et `npm run build`.

Un serveur web PHP peut-être utilisé comme proxy pour faciliter l'utilisation "cross domain" (testé avec les versions 5.6 et 7.0). Cf. le fichier de configuration.

### Procédure

cswReader ne nécessite pas d'installation particulière.
Il suffit de placer les fichiers du dossier "build" ci-dessus sur un serveur web.

## Configuration

La configuration de cswReader se fait soit via des paramètres d'URL, soit via le fichier `config/config.json`.

### Paramètres d'URL

Il est possible de définir plusieurs propriétés via des paramètres d'URL.
Cela permet entre autre de personnaliser l'interface de l'application en se connectant via une URL spécifique ou transmettre à une autre personne une version de l'application similaire à celle dont on dispose.

L'ensemble de ces variables sont paramétrables également dans le fichier de configuration `config/config.json`.

#### `lang`

Une langue spécifique peut-être utilisée en précisant le paramètre `lang` et le code de la langue sur 2 caratères (`fr` pour français, `de` pour allemand, `en` pour anglais, etc.).
Aini, pour forcer l'affichage en allemand (pour peut que cette traduction existe...), il faut ajouter dans l'URL `index.html?lang=de` ou `&lang=de`.

#### `cswUrl`

Le pramètre `cswUrl` permet de préciser l'URL d'un flux CSW à afficher par défaut.

#### `constraint`

Le paramètre `constraint` permet de préciser un terme à rechercher pour filtrer les résultats du flux CSW. Il s'utilise conjointement au paramètre `constraintType`.

#### `constraintType`

Le paramètre `constraint_type` permet de préciser le champ sur lequel s'applique la recherche du paramètre `constraint`. La valeur par défaut est `AnyText` qui correspond à une recherche sur l'ensemble de la fiche.
Les valeurs possibles dépendant de la configuration du serveur. Elles sont récupérés par l'application via une requête `getCapabilities` sur le flux CSW.

Les valeurs possibles sont généralement:

-   `AnyText`: recherche sur toute la fiche
-   `Title`: recherche dasn le titre de la fiche
-   `Abstract`: recherche dans le résumé
-   ...

#### `filter`

Le paramètre `filter` permet d'appliquer un filtre simple sur les fiches. Il est activé lors du clic sur une étiquette ("WMS", "WFS" ou "open data").

#### `maxRecords`

Le paramètre `maxRecords` permet de préciser le nombre de fiches à retourner lors d'un appel CSW.
Par défaut il est défini à 10 (cf. `config/config.json`).
Il peut être augmenté pour désactiver l'infinite scroll et charger tous les résultat en une seule requête.

#### `md`

Le paramètre `md` permet de préciser l'identifiant d'une fiche de métadonnée à afficher.

#### `back`

Le paramètre `back` fonctionne conjointement avec le paramètre `md`. Il permet de préciser la vue à afficher lors de la fermeture de la fiche de métadonnées.

#### `header`

Le paramètre `header` permet de préciser si l'en-tête de la page (menu) doit être visible.
Attention, si l'en-tête n'est pas visible, certaines fonctionnalités comme la recherche sont inutilisables.

#### `footer`

Le paramètre `footer` permet de préciser si l'le pied de page de la page doit être visible.
Attention, si e pied de page n'est pas visible, certaines informations comme le nombre de résultats ne sont pas visible, tout comme ceraines fonctionnalités comme le changement de langue.

#### `config`

Le paramètre `config` permet de préciser et surcharger le fichier de configuration de l'application. Par défaut il correspond à `config/config.json`.

#### `displayCswBtn`

Le paramètre `displayCswBtn` permet de désactiver le module "changeCsw".

#### Exemples d'URL paramétrées:

-   http://localhost:8000/index.html?lang=en&csw_url=https:%2F%2Fwww.cigalsace.org%2Fgeonetwork%2Fsrv%2Ffre%2Fcsw&csw_list=config%2Fcsw_url2.json&view=list&header=1&footer=0

-   http://localhost:8000/index.html?lang=en&config=config%2Fconfig2.json&header=1

### Détail du fichier `config/config.json`

Extrait comment du fichier de configuration:

```js
{
    "app": {                                                // Paramètre de configuration de l'application
        "name": "cswReader",                                // Nom de l'application
        "title": "cswReader",                               // Titre de l'application
        "version": "2.0.0",                                 // Version de l'application
        "copyrights": "(c) CIGAL / GéoGrandEst 2018",       // Copyrights apparaissant dans le footer
        "copyrights_url": "https://www.cigalsace.org",      // URL du copyright
        "proxy": "php/index.php?url=",                      // URL du proxy. Laisser vide si non utilisé
        "lang": "fr",                                       // Langue par défaut si impossibilité d'utiser celle du navigateur
        "changeview_format": "button",                      // Format du module "changeView". 2 valuers possibles: 'list' et 'button'
        "changeview_list": ["catalogGrid", "catalogList"],  // Liste des vues proposés dans le module "changeView"
        "displayCswBtn": 1,                                 // Affichage ou non du module "changeCsw" par défaut (possibilité de le forcer via paramêtre d'URL)
        "header": 1,                                        // Affichage ou non du header par défaut (ex.: intégration dans iframe)
        "footer": 1,                                        // Affichage ou non du footer par défaut (ex.: intégration dans iframe)
        "locales": {                                        // Chemin vers les fichiers de traduction de l'application
            "fr": {
                "locale": "config/app/locales/fr/locales.json",
                "pages": "config/app/locales/fr/pages.json"
            },
            "en": {
                "locale": "config/app/locales/en/locales.json",
                "pages": "config/app/locales/en/pages.json"
            },
            "de": {
                "locale": "config/app/locales/de/locales.json",
                "pages": "config/app/locales/de/pages.json"
            }
        }
    },
    "catalog": {                                            // Paramètre de configuration du catalogue
        "icon": "glyphicon-globe",                          // Icon du module "changeCsw"
        "csw": {                                            // Paramètres par défaut pour l'appel du flux CSW getRecords
            "url": "",
            "startposition": "1",
            "maxrecords": "10",                             // Mettre un chiffre supérieur au nombre de résultats pour désactiver l'infinte scoll
            "constraint_type": "AnyText",                   // Possibilité de définir un filtre par défaut
            "constraint": ""                                // Possibilité de définir un filtre par défaut
        },
        "csw_list": [{                                      // Liste des catalogues
            "id": "1",
            "title": "Catalogue GéoGrandEst - Géocatalogue",
            "description": "Flux CSW du serveur GéoGrandEst contenant les fiches publiés sur le Géocatalogue national (données Inspire).",
            "url": "https://www.cigalsace.org/geonetwork/srv/fre/csw-geocatalogue"
        }, {
            "id": "2",
            "title": "Catalogue GéoGrandEst - Général",
            "description": "Flux CSW du serveur GéoGrandEst contenant l'ensemble des fiches de métadonnées (cartes et données géographiques).",
            "url": "https://www.cigalsace.org/geonetwork/srv/fre/csw"
        }]
    },
    "views": {                                              // Liste des vues
        "catalogGrid": {                                    // Vue grille du catalogue
            "url": "app.catalogGrid",
            "path": "config/views/catalog-grid/catalog-grid.html",
            "icon": "glyphicon-th-list",
            "name": {
                "fr": "Vue catalog (FR)",
                "en": "catalog views (EN)",
                "de": "catalog views (DE)"
            },
            "locales": {
                "fr": "config/views/catalog-grid/locales.fr.json",
                "en": "config/views/catalog-grid/locales.en.json",
                "de": "config/views/catalog-grid/locales.de.json"
            }
        },
        "catalogList": {                                    // Vue liste du catalogue
            "url": "app.catalogList",
            "path": "config/views/catalog-list/catalog-list.html",
            "icon": "glyphicon-th",
            "name": {
                "fr": "Vue liste (FR)",
                "en": "List views (EN)",
                "de": "List views (DE)"
            },
            "locales": {
                "fr": "config/views/catalog-list/locales.fr.json",
                "en": "config/views/catalog-list/locales.en.json",
                "de": "config/views/catalog-list/locales.de.json"
            }
        },
        "home": {                                           // Vue de la page d'accueil
            "url": "app.home",
            "path": "config/views/home/home.html",
            "icon": "glyphicon-home",
            "name": {
                "fr": "Accueil",
                "en": "Home (EN)",
                "de": "Home (DE)"
            },
            "locales": {
                "fr": "config/views/home/locales.fr.json",
                "en": "config/views/home/locales.en.json",
                "de": "config/views/home/locales.de.json"
            }
        },
        "mdViewData": {                                     // Vue d'une fiche de données
            "type": "mdView",                               // Vue de type "métadonnées"
            "default": true,                                // Vue par défaut
            "url": "app.mdViewData",
            "path": "config/views/md-view-data/md-view-data.html",
            "icon": "glyphicon-eye-open",
            "hierarchyLevels": ["dataseries", "dataset"],   // HierachyLevel correspondant à la vue
            "keywords": {                                   // Mots-clés correspondant à la vue
                "fr": ["données", "Données ouvertes"],
                "en": ["data"],
                "de": ["data"]
            },
            "name": {
                "fr": "Métadonnée",
                "en": "Metadata (EN)",
                "de": "Metadata (DE)"
            },
            "locales": {
                "fr": "config/views/md-view-data/locales.fr.json",
                "en": "config/views/md-view-data/locales.en.json",
                "de": "config/views/md-view-data/locales.de.json"
            }
        },
        "mdViewService": {                                  // Vue pour les fiches de service
            "type": "mdView",
            "default": false,
            "url": "app.mdViewService",
            "path": "config/views/md-view-service/md-view-service.html",
            "icon": "glyphicon-eye-open",
            "hierarchyLevels": ["service"],
            "keywords": {
                "fr": [],
                "en": [],
                "de": []
            },
            "name": {
                "fr": "Métadonnée",
                "en": "Metadata (EN)",
                "de": "Metadata (DE)"
            },
            "locales": {
                "fr": "config/views/md-view-service/locales.fr.json",
                "en": "config/views/md-view-service/locales.en.json",
                "de": "config/views/md-view-service/locales.de.json"
            }
        },
        "mdViewMap": {                                      // Vue pour les fiches de carte
            "type": "mdView",
            "url": "app.mdViewMap",
            "path": "config/views/md-view-map/md-view-map.html",
            "icon": "glyphicon-eye-open",
            "hierarchyLevels": ["dataset"],
            "keywords": {
                "fr": ["carte"],
                "en": ["map"],
                "de": ["map"]
            },
            "name": {
                "fr": "Métadonnée",
                "en": "Metadata (EN)",
                "de": "Metadata (DE)"
            },
            "locales": {
                "fr": "config/views/md-view-map/locales.fr.json",
                "en": "config/views/md-view-map/locales.en.json",
                "de": "config/views/md-view-map/locales.de.json"
            }
        }
    }
}
```

A noter que les vue de type "mdView" servent à l'affichage des fiches de métadonnées. Il est possible de configurer cswReader pour utiliser une vue en fonction de 2 types de critères: "hierarchyLevel" et "keywords".
Ainsi, une vue avec `"hierarchyLevels": ["dataset"]` ne sera utilisée que pour les fiches de type "dataset". Si de plus il est précisé `"keywords": { "fr": ["carte"] (...) }`, seules les fiches de type "dataset" contenant le mot-clé "carte" utiliseront cette vue.
Si aucun mot-clé n'est précisé, la vue est utilisée pour toutes les fiches du type.
Dans le cas ou aucun critère n'est vérifié, la vue par défaut est utilisée (`"default": true`).

### Multilinguisme et traduction

L'interface est multilingue.
Les fichiers de traduction de l'application sont dans le répertoire `config/app/locales/[lg]`.
Chaque vue dispose également de ses fichiers de traduction dans `config/views/[viewname]/locales.[lg].json`.

## Choix techniques et développement

Les choix sont réalisés afin que:

-   L'application soit moderne dans son graphisme, son ergonomie et ses fonctionnalités
-   L'application reste légère et maintenable
-   L'application n'impose pas d'exigences particulières pour l'installation et l'utilisation
-   L'application puisse fonctionner en mode connecté et déconnecté
-   L'application ne nécessite pas d'authentification (possibilité d'ajouter une authentification HTTP côté serveur si nécessaire)

### Langages utilisés

-   JS, HTML et CSS côté interface utilisateur
-   Markdown pour la documentation

### Principaux frameworks et bibliothèques utilisés

-   [jquery](https://jquery.com/) - version 3.3.1
-   [twitter bootstrap](http://getbootstrap.com/) - version 3.3.7
-   [angular js](https://angularjs.org/) - version 1.6.9
-   [ui-bootstrap](https://angular-ui.github.io/bootstrap/) - version 2.5.0
-   [ui-router](https://ui-router.github.io/ng1/) - version 1.0.15
-   [showdown](https://github.com/showdownjs/showdown) - version 1.8.1
-   [moment](http://momentjs.com/) - version 2.12.0
-   [ng-infinite-scroll](https://sroze.github.io/ngInfiniteScroll/) - version 1.3.0
-   [xml-js](https://github.com/nashwaan/xml-js) - version 1.6.2

### Bonnes pratiques

Le développement de cette application s'appuie en grande partie sur **[AngularJS styleguide (ES2015)](https://github.com/toddmotto/angularjs-styleguide)** de Todd Motto.

## Contribution

### Installation de l'environnement de développement

Le développement de cswReader 2 est principalement basé sur nodejs et webpack. NodeJs doit être installé.

Cloner le dépôt GitHub:

```
git clone https://github.com/geograndest/mdedit2.git
cd mdedit2
```

Installer les modules

```
npm install
```

Lancer l'environnement de développement

```
npm run serve
```

Pour compiler le code (cf. dossier build)

```
npm run build
```

## TODO

-   [ ] Mieux adapter la vue "csw-md-service" aux données de service
-   [ ] Supprimer la double gestion data/service dans la vue "csw-md-data"
-   [ ] Permettre l'utilisation de filtres cumulatifs en cliquant sur les étiquettes "WMS", "WFS" et "Open data"

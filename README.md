# Portfolio de Binou30

Portfolio personnel réalisé en HTML, CSS et JavaScript.

Le site est organisé en quatre grandes sections :

- **À propos** : présentation personnelle ;
- **Code** : projets de sites web et jeux vidéo ;
- **LEGO** : constructions et galerie de photos ;
- **Liens** : profils et liens externes.

## Fichiers principaux

```text
index.html       contenu du site et cartes
style.css        mise en page générale, navbar, logo et responsive
projets.css      sections, cartes, tags, photos et liens de projets
script.js        navigation, menu burger et animations de clic
static/          favicon et images à ajouter
```

Pour personnaliser le contenu, travaille principalement dans `index.html`. Les fichiers CSS servent à modifier l’apparence et `script.js` le fonctionnement.

## Modifier une section

Chaque section possède un titre `<h2>` et, si besoin, un texte d’introduction :

```html
<h2 id="titre-code">Code</h2>
<p class="introduction-section">Mets ta description ici.</p>
```

Tu peux remplacer le texte entre les balises sans modifier les classes ni les `id`.

Les identifiants utilisés par la navigation sont `a-propos`, `code`, `lego` et `liens`. Ne les change pas sans modifier également les destinations dans `script.js`.

## Ajouter ou modifier une carte

Une carte de projet utilise cette structure :

```html
<article class="carte-projet">
    <h4>Titre du projet</h4>
    <p>Description du projet.</p>
    <div class="tags-projet">
        <span class="tag-projet">HTML</span>
        <span class="tag-projet">CSS</span>
    </div>
    <a class="lien-projet" href="https://exemple.com" target="_blank" rel="noopener noreferrer">
        Lien associé ↗
    </a>
</article>
```

Pour ajouter une carte, copie un bloc `<article class="carte-projet">`, colle-le dans la bonne `<div class="grille-projets">`, puis remplace son titre, sa description, ses tags et son lien.

La classe `carte-placeholder` donne une apparence en pointillés. Supprime-la pour obtenir une carte normale :

```html
<article class="carte-projet carte-placeholder">
```

devient :

```html
<article class="carte-projet">
```

## Ajouter des tags

Dans la zone `tags-projet`, copie un tag et change son texte :

```html
<span class="tag-projet">JavaScript</span>
```

Tu peux en ajouter autant que nécessaire. Garde la classe `tag-projet` pour conserver le style.

## Ajouter une photo

Place d’abord ton image dans le dossier `static/` :

```text
static/mon-projet.jpg
static/ma-construction.png
```

Évite les espaces et les accents dans les noms de fichiers. Utilise plutôt `savoie-click.png`.

Pour un site web ou un jeu vidéo, remplace la zone photo par :

```html
<img
    class="photo-projet"
    src="static/mon-projet.jpg"
    alt="Capture d'écran de mon projet"
>
```

Pour une construction LEGO, utilise :

```html
<img
    class="photo-lego"
    src="static/ma-construction.png"
    alt="Photo de ma construction LEGO"
>
```

L’attribut `alt` doit décrire l’image pour conserver un site accessible.

## Ajouter un lien à un projet

Dans une carte, modifie le lien associé :

```html
<a class="lien-projet" href="https://mon-site.com" target="_blank" rel="noopener noreferrer">
    Voir le projet ↗
</a>
```

Tu peux y mettre le site du projet, une démo, une page Scratch, un MOOC, une documentation, une vidéo ou une galerie.

## Ajouter un profil dans Liens

La section Liens utilise cette structure :

```html
<a class="carte-lien" href="https://mon-profil.com" target="_blank" rel="noopener noreferrer">
    <span>Nom du profil</span>
    <span aria-hidden="true">↗</span>
</a>
```

Pour ajouter une case, copie cette ligne dans `<div class="grille-liens">`, puis modifie le `href` et le nom affiché.

## Modifier À propos

Dans la section `a-propos`, remplace les paragraphes :

```html
<div class="bloc-a-propos">
    <p>Ta première présentation.</p>
    <p>Une deuxième information.</p>
</div>
```

Tu peux ajouter d’autres paragraphes avec la même structure.

## Modifier l’apparence

`projets.css` contient les styles des sections, cartes, tags, photos et liens de projets.

`style.css` contient les couleurs générales, le fond, la navbar, le logo, le menu burger, le responsive et les animations.

Les variables mobiles sont regroupées dans le bloc `@media (max-width: 56.25rem)` de `style.css`. Elles permettent notamment de modifier la taille du logo, la largeur des boutons et l’espace entre eux.

`script.js` gère les clics de navigation, l’ouverture du burger, le retour en haut via le logo et les effets de clic. Il n’est normalement pas nécessaire de le modifier pour ajouter du contenu.

## Conseils

- conserve les classes existantes lorsque tu copies une carte ;
- vérifie le chemin exact de chaque image ;
- utilise toujours un texte `alt` pour les images ;
- teste le site sur ordinateur et mobile après plusieurs ajouts ;
- garde les commentaires présents dans `index.html` comme repères de personnalisation.


Base URL : https://eldenring.fanapis.com/api


## Récupérer une liste

GET /bosses, /weapons, /armors, /items, /creatures, /npcs, /shields, /talismans, /spirits, /sorceries, /incantations, /locations, /ashes, /ammos, /classes

Paramètres disponibles : limit (nombre de résultats), page (pagination), name (filtre par nom)

Exemple : https://eldenring.fanapis.com/api/bosses?limit=10


## Structure d'un objet retourné

Chaque objet contient les champs suivants selon la catégorie :

- id : identifiant unique
- name : nom
- image : URL de l'image
- description : texte descriptif
- d'autres champs spécifiques à la catégorie (healthPoints, location, skills...)


## Récupérer par nom

https://eldenring.fanapis.com/api/bosses?name=Malenia


## Récupérer l'image

L'image est directement dans le champ image de l'objet. C'est une URL complète, on la met dans le src d'une balise img.

```js
fetch('https://eldenring.fanapis.com/api/bosses?name=Malenia')
  .then(res => res.json())
  .then(json => {
    const boss = json.data[0];
    document.getElementById('monImage').src = boss.image;
    document.getElementById('monNom').textContent = boss.name;
    document.getElementById('maDesc').textContent = boss.description;
  });
```

```html
<img id="monImage">
<p id="monNom"></p>
<p id="maDesc"></p>
```


## Récupérer plusieurs résultats

```js
fetch('https://eldenring.fanapis.com/api/weapons?limit=20')
  .then(res => res.json())
  .then(json => {
    json.data.forEach(item => {
      console.log(item.name, item.image);
    });
  });
```


## Chercher dans plusieurs catégories

Si on ne sait pas dans quelle catégorie est l'élément recherché, on boucle sur les catégories jusqu'à trouver un résultat.

```js
const categories = ['bosses', 'items', 'weapons', 'armors', 'creatures'];

async function chercher(nom) {
  for (const cat of categories) {
    const res = await fetch(`https://eldenring.fanapis.com/api/${cat}?name=${nom}`);
    const json = await res.json();
    if (json.data.length > 0) return json.data[0];
  }
  return null;
}
```

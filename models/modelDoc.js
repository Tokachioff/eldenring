/**
 * Modèle de la page documentation.
 * Gère les appels à l'API Elden Ring et la gestion des favoris en LocalStorage.
 */
const EldenModel = {

  /**
   * Liste des catégories disponibles dans l'API Elden Ring.
   * @type {string[]}
   */
  categories: [
    'armors', 'ashes', 'bosses', 'classes', 'creatures',
    'incantations', 'items', 'locations', 'npcs',
    'shields', 'sorceries', 'spirits', 'talismans', 'weapons'
  ],

  /**
   * Clé utilisée pour stocker les favoris dans le LocalStorage.
   * @type {string}
   */
  STORAGE_KEY: 'elden_favoris',

  /**
   * Récupère tous les éléments d'une catégorie depuis l'API.
   * @param {string} cat Nom de la catégorie à récupérer.
   * @returns {Promise<Object[]>} Liste des éléments de la catégorie.
   */
  fetchCategory(cat) {
    return fetch(`https://eldenring.fanapis.com/api/${cat}?limit=100`)
      .then(res => res.json())
      .then(json => json.data);
  },

  /**
   * Recherche des éléments dans une catégorie à partir d'une chaine de caractères.
   * @param {string} cat Nom de la catégorie dans laquelle chercher.
   * @param {string} query Chaine de caractères saisie par l'utilisateur.
   * @returns {Promise<Object[]>} Liste des éléments correspondant à la recherche.
   */
  searchCategory(cat, query) {
    return fetch(`https://eldenring.fanapis.com/api/${cat}?name=${encodeURIComponent(query)}&limit=100`)
      .then(res => res.json())
      .then(json => json.data ?? []);
  },

  /**
   * Recherche des éléments dans toutes les catégories en parallèle.
   * @param {string} query Chaine de caractères saisie par l'utilisateur.
   * @returns {Promise<{cat: string, items: Object[]}[]>} Résultats groupés par catégorie.
   */
  searchAll(query) {
    const requetes = this.categories.map(cat =>
      this.searchCategory(cat, query)
        .then(items => ({ cat, items }))
        .catch(() => ({ cat, items: [] }))
    );
    return Promise.all(requetes);
  },

  /**
   * Retourne la liste des favoris stockés dans le LocalStorage.
   * @returns {string[]} Liste des recherches favorites.
   */
  getFavoris() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Ajoute une recherche aux favoris si elle n'existe pas déjà.
   * @param {string} query Recherche à ajouter aux favoris.
   */
  addFavori(query) {
    const favoris = this.getFavoris();
    if (!favoris.includes(query)) {
      favoris.push(query);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoris));
    }
  },

  /**
   * Supprime une recherche des favoris.
   * @param {string} query Recherche à supprimer des favoris.
   */
  removeFavori(query) {
    const favoris = this.getFavoris().filter(f => f !== query);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoris));
  },

  /**
   * Vérifie si une recherche est déjà dans les favoris.
   * @param {string} query Recherche à vérifier.
   * @returns {boolean} True si la recherche est un favori, false sinon.
   */
  isFavori(query) {
    return this.getFavoris().includes(query);
  }

};
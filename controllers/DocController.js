/**
 * Contrôleur de la page documentation.
 * Gère les interactions utilisateur : navigation par catégorie,
 * recherche textuelle et gestion des favoris.
 */
const DocController = {

  /**
   * Initialise la page documentation.
   * Remplit la sidebar, branche les événements de recherche et affiche les favoris.
   */
  init() {
    this._buildSidebar();
    this._bindSearch();
    this._renderFavoris();
  },

  /**
   * Affiche le GIF de chargement et vide la zone de contenu.
   */
  _showLoading() {
    document.getElementById('doc-loading').style.display = 'block';
    document.getElementById('doc-content').innerHTML = '';
  },

  /**
   * Cache le GIF de chargement.
   */
  _hideLoading() {
    document.getElementById('doc-loading').style.display = 'none';
  },

  /**
   * Remet le placeholder par défaut dans la zone de contenu.
   */
  _showPlaceholder() {
    document.getElementById('doc-content').innerHTML = `
      <div class="doc-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <p>SELECT A CATEGORY OR SEARCH</p>
      </div>
    `;
  },

  /**
   * Génère les boutons de catégorie dans la sidebar à partir du modèle.
   * Un clic sur une catégorie inactive la sélectionne et charge ses éléments.
   * Un clic sur la catégorie active la désélectionne et remet le placeholder.
   */
  _buildSidebar() {
    EldenModel.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.dataset.cat = cat;
      btn.textContent = cat;
      document.querySelector('.sidebar').appendChild(btn);

      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');

        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));

        if (isActive) {
          this._showPlaceholder();
          return;
        }

        btn.classList.add('active');
        this._showLoading();

        EldenModel.fetchCategory(cat).then(data => {
          this._renderItems(data, cat, '');
        });
      });
    });
  },

  /**
   * Branche les événements sur la barre de recherche et le bouton favori.
   */
  _bindSearch() {
    const input = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const starBtn = document.getElementById('fav-star-btn');

    /**
     * Met à jour l'état des boutons selon le contenu du champ de saisie.
     */
    const updateButtons = () => {
      const query = input.value.trim();
      const isEmpty = query === '';

      searchBtn.disabled = isEmpty;
      starBtn.disabled = isEmpty;

      if (!isEmpty) {
        starBtn.textContent = EldenModel.isFavori(query) ? '★' : '☆';
      } else {
        starBtn.textContent = '☆';
      }
    };

    input.addEventListener('input', updateButtons);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        this._lanceRecherche();
      }
    });

    searchBtn.addEventListener('click', () => this._lanceRecherche());

    starBtn.addEventListener('click', () => {
      const query = input.value.trim();
      if (query === '') return;

      if (EldenModel.isFavori(query)) {
        const confirmed = confirm(`Remove "${query}" from favorites?`);
        if (confirmed) {
          EldenModel.removeFavori(query);
        }
      } else {
        EldenModel.addFavori(query);
      }

      updateButtons();
      this._renderFavoris();
    });
  },

  /**
   * Lance une recherche.
   * Si une catégorie est active, cherche dans celle-ci uniquement.
   * Sinon, cherche dans toutes les catégories en parallèle.
   */
  _lanceRecherche() {
    const query = document.getElementById('search-input').value.trim();
    const catActive = document.querySelector('.cat-btn.active');

    this._showLoading();

    if (catActive) {
      const cat = catActive.dataset.cat;
      EldenModel.searchCategory(cat, query).then(data => {
        this._renderItems(data, cat, query);
      });
    } else {
      EldenModel.searchAll(query).then(resultats => {
        this._renderAllResults(resultats, query);
      });
    }
  },

  /**
   * Affiche les éléments retournés par l'API dans la zone de contenu.
   * @param {Object[]} data Liste des éléments à afficher.
   * @param {string} cat Catégorie concernée.
   * @param {string} query Recherche effectuée (vide si affichage de catégorie entière).
   */
  _renderItems(data, cat, query) {
    this._hideLoading();

    if (!data || data.length === 0) {
      document.getElementById('doc-content').innerHTML = `<p class="doc-empty">(No results found)</p>`;
      return;
    }

    const titre = query !== ''
      ? `${cat.toUpperCase()} - "${query}"`
      : cat.toUpperCase();

    const items = data.map(item => `
      <li class="doc-item">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}">`
          : `<div class="doc-no-img"></div>`
        }
        <div>
          <strong>${item.name}</strong>
          <p>${item.description ?? ''}</p>
        </div>
      </li>
    `).join('');

    document.getElementById('doc-content').innerHTML = `
      <h2 class="cat-title">${titre}</h2>
      <ul class="doc-list">${items}</ul>
    `;
  },

  /**
   * Affiche les résultats d'une recherche globale, groupés par catégorie.
   * N'affiche que les catégories qui ont au moins un résultat.
   * @param {{cat: string, items: Object[]}[]} resultats Résultats groupés par catégorie.
   * @param {string} query Recherche effectuée.
   */
  _renderAllResults(resultats, query) {
    this._hideLoading();

    const avecResultats = resultats.filter(r => r.items && r.items.length > 0);

    if (avecResultats.length === 0) {
      document.getElementById('doc-content').innerHTML = `<p class="doc-empty">(No results found)</p>`;
      return;
    }

    const html = avecResultats.map(({ cat, items }) => {
      const lignes = items.map(item => `
        <li class="doc-item">
          ${item.image
            ? `<img src="${item.image}" alt="${item.name}">`
            : `<div class="doc-no-img"></div>`
          }
          <div>
            <strong>${item.name}</strong>
            <p>${item.description ?? ''}</p>
          </div>
        </li>
      `).join('');

      return `
        <h2 class="cat-title">${cat.toUpperCase()}</h2>
        <ul class="doc-list">${lignes}</ul>
      `;
    }).join('');

    document.getElementById('doc-content').innerHTML = html;
  },

  /**
   * Affiche la liste des recherches favorites dans la section dédiée.
   * Affiche un message si aucun favori n'est enregistré.
   */
  _renderFavoris() {
    const favoris = EldenModel.getFavoris();
    const list = document.getElementById('favorites-list');

    if (favoris.length === 0) {
      list.innerHTML = `<p class="favorites-empty">(No favorite searches)</p>`;
      return;
    }

    list.innerHTML = favoris.map(fav => `
      <li class="fav-item">
        <span class="fav-label">${fav}</span>
        <button class="fav-remove" title="Remove">⨷</button>
      </li>
    `).join('');

    list.querySelectorAll('.fav-label').forEach((label, i) => {
      label.addEventListener('click', () => {
        const input = document.getElementById('search-input');
        input.value = favoris[i];
        input.dispatchEvent(new Event('input'));
        this._lanceRecherche();
      });
    });

    list.querySelectorAll('.fav-remove').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const confirmed = confirm(`Remove "${favoris[i]}" from favorites?`);
        if (confirmed) {
          EldenModel.removeFavori(favoris[i]);
          this._renderFavoris();
        }
      });
    });
  }

};
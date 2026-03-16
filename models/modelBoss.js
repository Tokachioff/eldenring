/**
 * Classe Boss.
 * (Modèle représentant un boss du jeu Elden Ring)
 */
export class Boss {

  /**
   * Identifiant unique du boss.
   * @type {string}
   */
  #id;

  /**
   * Nom du boss.
   * @type {string|null}
   */
  #name;

  /**
   * Lien de l'image du boss.
   * @type {string|null}
   */
  #image;

  /**
   * Description du boss.
   * @type {string|null}
   */
  #description;

  /**
   * Localisation du boss dans le jeu.
   * @type {string|null}
   */
  #location;

  /**
   * Points de vie du boss.
   * @type {number|string|null}
   */
  #healthPoints;


  /**
   * Constructeur de la classe Boss.
   * @param {Object} bossInformations Informations provenant de l'API Elden Ring.
   */
  constructor(bossInformations) {

    this.#id = bossInformations.id;
    this.#name = bossInformations.name;
    this.#image = bossInformations.image;
    this.#description = bossInformations.description;
    this.#location = bossInformations.location;
    this.#healthPoints = bossInformations.healthPoints;

  }


  /**
   * Retourne l'identifiant du boss.
   * @returns {string}
   */
  get id() {
    return this.#id;
  }


  /**
   * Retourne le nom du boss.
   * @returns {string|null}
   */
  get name() {
    return this.#name;
  }


  /**
   * Retourne l'image du boss.
   * @returns {string|null}
   */
  get image() {
    return this.#image;
  }


  /**
   * Retourne la description du boss.
   * @returns {string|null}
   */
  get description() {
    return this.#description;
  }


  /**
   * Retourne la localisation du boss.
   * @returns {string|null}
   */
  get location() {
    return this.#location;
  }


  /**
   * Retourne les points de vie du boss.
   * @returns {number|string|null}
   */
  get healthPoints() {
    return this.#healthPoints;
  }

}
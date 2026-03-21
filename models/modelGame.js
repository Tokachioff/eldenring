/**
 * Classe Game.
 * (Modèle représentant le fonctionnement global du jeu)
 */
export class Game {

  /**
   * Expression actuelle saisie dans la barre de recherche.
   * @type {string}
   */
  #input;

  /**
   * Boss actuellement sélectionné ou trouvé.
   * @type {Object|null}
   */
  #boss;

  /**
   * Liste des boss retournés par l'API.
   * @type {Object[]}
   */
  #bossList;

  /**
   * Liste des boss retournés par l'API.
   * @type {Object[]}
   */
  #score;


  /**
   * Constructeur de la classe Game.
   */
  constructor() {

    this.#input = "";
    this.#boss = null;
    this.#bossList = [];
    this.#score = 0;

  }


  /**
   * Définit la valeur de la recherche actuelle.
   * @param {string} value Texte saisi par l'utilisateur.
   */
  setInput(value) {
    this.#input = value;
  }


  /**
   * Retourne la valeur actuelle de la recherche.
   * @returns {string}
   */
  getInput() {
    return this.#input;
  }


  /**
   * Définit le boss sélectionné.
   * @param {Object} boss Boss sélectionné.
   */
  setBoss(boss) {
    this.#boss = boss;
  }


  /**
   * Retourne le boss sélectionné.
   * @returns {Object|null}
   */
  getBoss() {
    return this.#boss;
  }


  /**
   * Définit la liste des boss récupérés depuis l'API.
   * @param {Object[]} list Liste des boss.
   */
  setBossList(list) {
    this.#bossList = list;
  }


  /**
   * Retourne la liste des boss.
   * @returns {Object[]}
   */
  getBossList() {
    return this.#bossList;
  }

    /**
   * Retourne le score du jeu.
   * @returns {int}
   */
  getScore() {
    return this.#score;
  }

      /**
   * Augmente le score du jeu.
   * @returns {int}
   */
  addScore() {
    this.#score += 1;
  }

}
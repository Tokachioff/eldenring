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
   * Score du joueur.
   * @type {int}
   */
  #score;

    /**
   * Nombre de tentative du joueur.
   * @type {int}
   */
  #nbTentative;


  /**
   * Constructeur de la classe Game.
   */
  constructor() {

    this.#input = "";
    this.#boss = null;
    this.#bossList = [];
    this.#score = 0;
    this.#nbTentative = 0;

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
   * Renvoie le score du boss actuelle selon le nombre de tentative et ajoute ce score au jeu
   * @returns {int}
   */
  addScore() {
    let $score = 0;
    if (this.#nbTentative == 1) {
      $score = 25;
    } else if (this.#nbTentative > 1 && this.#nbTentative <= 5) {
      $score = 10;
    } else if (this.#nbTentative > 5 && this.#nbTentative <= 10) {
      $score = 5;
    } else {
      $score = 1;
    }
    this.#score += $score;
    return $score;
  }

      /**
   * Retourne le nombre de tentative du joueur.
   * @returns {int}
   */
  getNbTentative() {
    return this.#nbTentative;
  }

      /**
   * Augmente le nombre de tentative effectuer par le joueur.
   * 
   */
  addNbTentative() {
    this.#nbTentative += 1;
  }

        /**
   * Reset le nombre de tentative effectuer par le joueur.
   * 
   */
  resetNbTentative() {
    this.#nbTentative = 0;
  }

}
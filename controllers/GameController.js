import { Boss } from "../models/modelBoss.js";
import { Game } from "../models/modelGame.js";

/**
 * Classe GameController.
 * (Contrôleur gérant les interactions entre la vue, le modèle et l'API)
 */
export class GameController {

  /**
   * Modèle principal du jeu.
   * @type {Game}
   */
  #game;


  /**
   * Constructeur du contrôleur.
   */
  constructor() {

    this.#game = new Game();

    this.initEvents();

  }


  /**
   * Initialise les événements de la page.
   */
  initEvents() {

    const button = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const img = document.getElementById("frame-bg");

    //charger les données depuis l'api

    button.addEventListener("click", () => {
      this.searchBoss();
    });

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.searchBoss();
      }
    });

  }


  /**
   * Lance la recherche d'un boss via l'API.
   */
  async searchBoss() {

    const input = document.getElementById("search-input").value;

    const img = document.getElementById("frame-bg");

    if (input === "") return;

    this.#game.setInput(input);

    const url = `https://eldenring.fanapis.com/api/bosses?name=${input}`;

    try {

      const response = await fetch(url);

      const data = await response.json();

      const bossList = data.data.map(boss => new Boss(boss));

      this.#game.setBossList(bossList);

      this.displayResults(bossList);

    } catch (error) {

      console.error("Erreur API :", error);

    }

  }


  /**
   * Affiche les résultats dans la page.
   * @param {Boss[]} bossList
   */
  displayResults(bossList) {

    const container = document.getElementById("results");

    container.innerHTML = "";

    if (bossList.length === 0) {

      container.innerHTML = "<p>(Aucun résultat trouvé)</p>";
      return;

    }

    bossList.forEach(boss => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h2>${boss.name}</h2>
        <img src="${boss.image}" width="200">
        <p>${boss.description}</p>
        <p><strong>Location :</strong> ${boss.location}</p>
        <p><strong>HP :</strong> ${boss.healthPoints}</p>
      `;

      container.appendChild(div);

    });

    }
}
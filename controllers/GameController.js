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

    this.configureBoss();

    this.initEvents();

  }


  /**
   * Initialise les événements de la page.
   */
  initEvents() {

    const button = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const score = document.getElementById("score");

    score.textContent = this.#game.getScore();

    button.addEventListener("click", () => {
      //this.searchBoss();
      this.#game.AddScore();
      score.textContent = this.#game.getScore();
    });

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        //this.searchBoss();
      }
    });

  }

  async configureBoss() {
    const img = document.getElementById("frame-bg");

    const response = await fetch(`https://eldenring.fanapis.com/api/bosses`);
    const data = await response.json();
    const bossList = data.data.map(boss => new Boss(boss));
    this.#game.setBossList(bossList);

    const randomIndex = Math.floor(Math.random() * bossList.length);
    const randomBoss = bossList[randomIndex];
    this.#game.setBoss(randomBoss);

    img.src = this.#game.getBoss().image;

    const desc = document.getElementById("result-desc");
    desc.textContent = this.#game.getBoss().description;
  }





  
  /**
   * Lance la recherche d'un boss via l'API.
   */
  async searchBoss() {

    const input = document.getElementById("search-input").value;

    const img = document.getElementById("frame-bg");

    if (input === "") return;

    this.#game.setInput(input);

    try {

      const response = await fetch(`https://eldenring.fanapis.com/api/bosses?name=${input}`);

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
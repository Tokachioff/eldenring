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
      this.searchBoss();
    });

    input.addEventListener("input", () => {
      this.searchBoss();
    });
  }

    /**
   * configure le jeu via l'API.
   */
  async configureBoss() {
    const response = await fetch(`https://eldenring.fanapis.com/api/bosses?limit=1000000000`);
    const data = await response.json();
    const bossList = data.data.map(boss => new Boss(boss));
    this.#game.setBossList(bossList);
    this.chooseBoss();
  }

    /**
   * Choisi un boss dans la liste.
   */
  chooseBoss() {
      const img = document.getElementById("frame-bg");

      let bossList = this.#game.getBossList();

      const randomIndex = Math.floor(Math.random() * bossList.length);
      const randomBoss = bossList[randomIndex];

      this.#game.setBoss(randomBoss);

      img.src = this.#game.getBoss().image;

      const desc = document.getElementById("result-desc");
      desc.textContent = this.#game.getBoss().description;

      console.log(this.#game.getBoss().name);
    }

  /**
   * Lance la recherche d'un boss via l'API.
   */
  async searchBoss() {

    const input = document.getElementById("search-input").value.toLowerCase();
    const container = document.getElementById("suggestions");

    //si rien a été saisi, ne rien faire
    if (input === "") {
      container.innerHTML = "";
      return;
    }

    this.#game.setInput(input);

    // récupérer la liste déjà chargée
    const allBosses = this.#game.getBossList();

    // filtrer localement
    const filteredBosses = allBosses.filter(boss =>
      boss.name.toLowerCase().includes(input)
    );

    // affichage
    container.innerHTML = "";

    filteredBosses.forEach(boss => {

      const div = document.createElement("div");
      div.textContent = boss.name;
      div.classList.add("suggestion-item");

      // interaction
      div.addEventListener("click", () => {

        document.getElementById("search-input").value = boss.name;
        container.innerHTML = "";

        // vérifier si c'est le bon boss
        if (this.checkAnswer(boss)){
          document.getElementById("search-input").value = "";
        } 
      });

      container.appendChild(div);
    });
  }

  checkAnswer(selectedBoss) {

    const scoreElement = document.getElementById("score");
    const feedback = document.getElementById("feedback");

    // boss à deviner
    const targetBoss = this.#game.getBoss();

    if (selectedBoss.name === targetBoss.name) {
      
      this.#game.addScore();
      scoreElement.textContent = this.#game.getScore();

      feedback.textContent = "CORRECT";
      feedback.classList.add("success", "visible");

      // nouveau boss à deviner
      this.chooseBoss();

      return true;
    } else {

      // Mauvaise réponse
      feedback.textContent = "INCORRECT";
      feedback.classList.add("error", "visible");

      return false;
    }
  }
  
}

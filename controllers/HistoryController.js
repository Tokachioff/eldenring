    const container = document.getElementById("history-list");

    const history = JSON.parse(localStorage.getItem("bossHistory")) || [];

    if (history.length === 0) {
      container.innerHTML = "<p class='empty'>(No boss found yet)</p>";
    }

    history.reverse().forEach(boss => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${boss.image}" alt="${boss.name}">
        <div class="card-content">
          <h2>${boss.name}</h2>
          <p class="desc">${boss.description}</p>
          <div class="infos">
            <span>Date : ${boss.date}</span>
            <span>Attempts : ${boss.tentative}</span>
            <span>Points : ${boss.points}</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
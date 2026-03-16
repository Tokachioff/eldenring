// EldenController.js
const DocController = {
    init() {
        EldenModel.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'cat-btn';
            btn.dataset.cat = cat;
            btn.textContent = cat;
            document.querySelector('.sidebar').appendChild(btn);

            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');


                EldenModel.fetchCategory(cat).then(data => {

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
                        <h2 class="cat-title">${cat.toUpperCase()}</h2>
                        <ul class="doc-list">${items}</ul>
                    `;
                });
            });
        });
    }
};
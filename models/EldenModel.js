const EldenModel = {
    categories: [
        'armors', 'ashes', 'bosses', 'classes', 'creatures',
        'incantations', 'items', 'locations', 'npcs',
        'shields', 'sorceries', 'spirits', 'talismans', 'weapons'
    ],

    fetchCategory(cat) {
        return fetch(`https://eldenring.fanapis.com/api/${cat}?limit=1000000000`)
            .then(res => res.json())
            .then(json => json.data);
    }
};
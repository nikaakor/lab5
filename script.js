class Hero {
    constructor(id, name, power, description, image) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.description = description;
        this.image = image;
    }
}

const showroomList = [];

// Завантаження  з сервера при ініціалізації
const loadHeros = async () => {
    try {
        const response = await fetch('http://localhost:3000/heros');
        if (!response.ok) throw new Error('Failed to fetch heros');

        const heros = await response.json();
        heros.forEach(hero => {
            showroomList.push(new Hero(hero.id, hero.name, hero.power, hero.description, hero.image));
        });
        drawList(showroomList);
    } catch (error) {
        console.error('Error loading heros:', error);
    }
};

// Малювання списку на сторінці
const drawList = (list) => {
    const showroom = document.getElementById('showroom');
    showroom.innerHTML = ''; // Очистка попереднього вмісту
    let totalPowers = 0;

    list.forEach((el) => {
        showroom.innerHTML += `
            <div id="showroom-${el.id}" class="hero-card">
                <img src="${el.image}" alt="${el.name}">
                <h3>${el.name}</h3>
                <p>Power: $${el.power}</p>
                <p>${el.description}</p>
                <button onClick="deleteCard(${el.id})">Delete</button>
            </div>
        `;
        totalPowers += parseFloat(el.power);
    });

    document.getElementById('total-powers').innerText = totalPowers.toFixed(2);
};

// Видалення картки
const deleteCard = (heroId) => {
    deleteHero(heroId);
};

// Ініціалізація завантаження при відкритті сторінки
document.addEventListener('DOMContentLoaded', loadHeros);

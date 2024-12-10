// // Завантаження героїв у випадаючий список для редагування
// const loadHerosForEdit = () => {
//     fetch('http://localhost:3000/heros')
//         .then(response => response.json())
//         .then(heros => {
//             const heroSelect = document.getElementById('hero-select');
//             heroSelect.innerHTML = ''; // Очищаємо список

//             // Додаємо перший елемент для вибору
//             const defaultOption = document.createElement('option');
//             defaultOption.value = '';
//             defaultOption.text = 'Select Hero to Edit';
//             heroSelect.appendChild(defaultOption);

//             // Додаємо героїв до випадаючого списку
//             heros.forEach(hero => {
//                 const option = document.createElement('option');
//                 option.value = hero.id;
//                 option.text = hero.name;
//                 heroSelect.appendChild(option);
//             });
//         })
//         .catch(error => console.error('Error loading heros:', error));
// };

// // Завантажуємо героїв при ініціалізації
// loadHerosForEdit();

// // Обробка вибору героя для редагування
// document.getElementById('hero-select').addEventListener('change', function () {
//     const selectedId = this.value;

//     if (selectedId !== '') {
//         fetch(`http://localhost:3000/heros/${selectedId}`)
//             .then(response => response.json())
//             .then(selectedHero => {
//                 document.getElementById('name').value = selectedHero.name;
//                 document.getElementById('power').value = selectedHero.power;
//                 document.getElementById('description').value = selectedHero.description;
//                 document.getElementById('image').value = selectedHero.image;
//             })
//             .catch(error => console.error('Error loading selected hero:', error));
//     }
// });

// // Обробка форми редагування
// document.getElementById('edit-hero-form').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const selectedId = document.getElementById('hero-select').value;
//     if (!selectedId) {
//         alert('Please select a hero to edit.');
//         return;
//     }

//     const updatedHero = {
//         name: document.getElementById('name').value,
//         power: parseFloat(document.getElementById('power').value),
//         description: document.getElementById('description').value,
//         image: document.getElementById('image').value
//     };

//     fetch(`http://localhost:3000/heros/${selectedId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedHero)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to update hero');
//         }
//         return response.json();
//     })
//     .then(data => {
//         document.getElementById('message').textContent = 'Hero updated successfully!';
//         // Оновлення списку героїв після успішного редагування
//         loadHerosForEdit();
//     })
//     .catch((error) => {
//         document.getElementById('message').textContent = 'Error updating hero: ' + error.message;
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    loadHerosForEdit();

    document.getElementById('hero-select').addEventListener('change', function () {
        const selectedId = this.value;
        if (selectedId !== '') {
            fetch(`http://localhost:3000/heros/${selectedId}`)
                .then(response => response.json())
                .then(selectedHero => {
                    document.getElementById('name').value = selectedHero.name;
                    document.getElementById('power').value = selectedHero.power;
                    document.getElementById('description').value = selectedHero.description;
                    document.getElementById('image').value = selectedHero.image;
                })
                .catch(error => console.error('Error loading selected hero:', error));
        }
    });

    document.getElementById('edit-hero-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedId = document.getElementById('hero-select').value;
        if (!selectedId) {
            alert('Please select a hero to edit.');
            return;
        }

        const updatedHero = {
            name: document.getElementById('name').value,
            power: parseFloat(document.getElementById('power').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value
        };

        fetch(`http://localhost:3000/heros/${selectedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedHero)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update hero');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('message').textContent = 'Hero updated successfully!';
            loadHerosForEdit();
        })
        .catch((error) => {
            document.getElementById('message').textContent = 'Error updating hero: ' + error.message;
        });
    });
});
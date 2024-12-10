// document.getElementById('create-hero-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const power = parseFloat(document.getElementById('power').value);
//     const description = document.getElementById('description').value; // Додано для опису
//     const image = document.getElementById('image').value; // Додано для зображення

//     const newSuperHero = { name, power, description, image };

//     fetch('http://localhost:3000/heros', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newSuperHero)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Hero added:', data);
//         window.location.href = 'index.html';
//     })
//     .catch((error) => {
//         console.error('Error adding hero:', error);
//     });
// });

document.getElementById('create-hero-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const power = parseFloat(document.getElementById('power').value);
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    // Validate power input (ensure it's a valid number)
    if (isNaN(power)) {
        alert('Power must be a valid number');
        return; // Prevent the form submission if power is invalid
    }

    const newSuperHero = { name, power, description, image };

    fetch('http://localhost:3000/heros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSuperHero)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Hero added:', data);
        window.location.href = 'index.html';  
    })
    .catch((error) => {
        console.error('Error adding hero:', error);
    });
});

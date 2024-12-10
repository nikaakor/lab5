import mysql from 'mysql2/promise'; // Використовуємо обіцянки для роботи з MySQL

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'veronika17',
    database: 'heros',
});

// Додати нов
// export const addHero = async (hero) => {
//     const { name, power, description, image } = hero; // Видалено color
//     const query = 'INSERT INTO hero (name, power, description, image) VALUES (?, ?, ?, ?)'; // Видалено color
//     const [result] = await db.query(query, [name, power, description, image]); // Видалено color
//     return { id: result.insertId, name, power, description, image }; // Видалено color
// };
export const addHero = async (hero) => {
    const { name, power, description, image } = hero;
    const query = 'INSERT INTO hero (name, power, description, image) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.query(query, [name, power, description, image]);
        console.log('Insert result:', result); // Log the result
        return { id: result.insertId, name, power, description, image };
    } catch (error) {
        console.error('Error adding hero:', error); // Log any error
        throw error; // Throw the error so it gets caught in the route handler
    }
};

// Отримати всі 
export const getAllHeros = async () => {
    const query = 'SELECT * FROM hero';
    const [results] = await db.query(query);
    return results;
};

// Оновити за ID
export const updateHero = async (id, hero) => {
    const { name, power, description, image } = hero; // Видалено color
    const query = 'UPDATE hero SET name = ?, power = ?, description = ?, image = ? WHERE id = ?'; // Видалено color
    const [result] = await db.query(query, [name, power, description, image, id]); // Видалено color
    return result.affectedRows > 0;
};

// Видалити за ID
export const deleteHero = async (id) => {
    const query = 'DELETE FROM hero WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
};

// Отримати за ID
export const getHeroById = async (id) => {
    const query = 'SELECT * FROM hero WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
};

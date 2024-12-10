import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addHero, deleteHero, updateHero, getAllHeros, getHeroById } from './database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// CREATE - POST hero
app.post('/heros', async (req, res) => {
    try {
        const hero = req.body;
        console.log('Received hero:', hero); // Log the incoming data for debugging
        const result = await addHero(hero);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error adding hero:', error); // Log the error to the console
        res.status(500).send({ error: 'Error adding hero' });
    }
});

// READ - GET all heros
app.get('/heros', async (req, res) => {
    try {
        const heros = await getAllHeros();
        res.status(200).send(heros);
    } catch (error) {
        console.error('Error fetching heros:', error);
        res.status(500).send({ error: 'Error fetching heros' });
    }
});

// READ - GET hero by ID
app.get('/heros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const hero = await getHeroById(id);
        if (hero) {
            res.status(200).send(hero);
        } else {
            res.status(404).send({ error: 'Hero not found' });
        }
    } catch (error) {
        console.error('Error fetching hero by ID:', error);
        res.status(500).send({ error: 'Error fetching hero' });
    }
});

// UPDATE - PUT hero by ID
app.put('/heros/:id', async (req, res) => {
    const { id } = req.params;
    const hero = req.body;

    // Перевірка наявності мінімум необхідних полів
    if (!hero.name || !hero.power) {
        return res.status(400).send({ error: 'Name and power are required' });
    }

    // Перевірка, чи коректний id
    const heroId = parseInt(id);
    if (isNaN(heroId)) {
        return res.status(400).send({ error: 'Invalid hero ID' });
    }

    try {
        const success = await updateHero(heroId, hero); // оновлення героя
        if (success) {
            res.status(200).send(hero);
        } else {
            res.status(404).send({ error: 'Hero not found' });
        }
    } catch (error) {
        console.error('Error updating hero:', error);
        res.status(500).send({ error: 'Error updating hero' });
    }
});

// DELETE - delete hero by ID
app.delete('/heros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const success = await deleteHero(parseInt(id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send({ error: 'Hero not found' });
        }
    } catch (error) {
        console.error('Error deleting hero:', error);
        res.status(500).send({ error: 'Error deleting hero' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
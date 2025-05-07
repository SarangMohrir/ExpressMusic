import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let idCounter = 1;
let newSongs = [];

// CREATE
app.post('/songs', (req, res) => {
    const { title, artist } = req.body;
    if (!title || !artist) {
        return res.status(400).send("Artist name and Title are required");
    }
    const song = { id: idCounter++, title, artist };
    newSongs.push(song);
    res.status(201).json(song);
});

// READ all
app.get('/songs', (req, res) => {
    res.json(newSongs);
});

// READ one
app.get('/songs/:id', (req, res) => {
    const song = newSongs.find(s => s.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).json({ message: "Song not present" });
    }
    res.json(song);
});

// UPDATE
app.put('/songs/:id', (req, res) => {
    const song = newSongs.find(s => s.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).json({ message: "Song not present" });
    }
    const { title, artist } = req.body;
    if (title) song.title = title;
    if (artist) song.artist = artist;
    res.json(song);
});

// DELETE
app.delete('/songs/:id', (req, res) => {
    const index = newSongs.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Song not present" });
    }
    const deletedSong = newSongs.splice(index, 1);
    res.json(deletedSong[0]);
});

app.listen(port, () => {
    console.log(`🎶 Server running on http://localhost:${port}`);
});


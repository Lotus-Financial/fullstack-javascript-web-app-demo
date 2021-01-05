import express from 'express';

const app = express()

app.get('/', (req, res) => res.send('Blue Skies Core is UP!'))

app.listen(3000, () => console.log('Server running on port 3000!'));

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { initDb } from './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', routes);

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    initDb().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }).catch(err => console.error('Failed to init DB', err));
}

export default app;

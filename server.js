import express from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

config({
  path: resolve(__dirname, '.env'),
});

app.use(cors());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));
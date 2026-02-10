import { Pool } from 'pg';

const host = process.env.DB_HOST || 'localhost';
if (!host) {
  throw new Error('Database host is required');
}

const pool = new Pool({
    user: 'user',
    host,
    database: 'comments_db',
    password: 'password',
    port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      parent_id INTEGER REFERENCES comments(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const closeDb = () => pool.end();

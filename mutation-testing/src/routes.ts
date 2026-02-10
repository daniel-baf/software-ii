import { Router } from 'express';
import { query } from './database';
import { Comment, CreateCommentDto } from './types';

const router = Router();

router.get('/comments', async (req, res) => {
    try {
        const result = await query('SELECT * FROM comments ORDER BY created_at DESC');
        const comments: Comment[] = result.rows;

        const buildTree = (parentId: number | null = null): any[] => {
            return comments
                .filter(c => c.parent_id === parentId)
                .map(c => ({
                    ...c,
                    children: buildTree(c.id)
                }));
        };

        res.json(buildTree(null));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/comments', async (req, res) => {
    const { content, parent_id }: CreateCommentDto = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const result = await query(
            'INSERT INTO comments (content, parent_id) VALUES ($1, $2) RETURNING *',
            [content, parent_id || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

import request from 'supertest';
import app from '../src/server';
import { closeDb, initDb, query } from '../src/database';

describe('Comments API', () => {
    beforeAll(async () => {
        // Ensure DB is ready and clean
        await initDb();
        await query('DELETE FROM comments');
    });

    afterAll(async () => {
        await closeDb();
    });

    it('should create a new comment', async () => {
        const res = await request(app)
            .post('/api/comments')
            .send({ content: 'Hello World' });

        expect(res.status).toBe(201);
        expect(res.body.content).toBe('Hello World');
        expect(res.body.id).toBeDefined();
    });

    it('should fetch comments tree', async () => {
        // Create root comment
        const rootRes = await request(app)
            .post('/api/comments')
            .send({ content: 'Root Comment' });
        const rootId = rootRes.body.id;

        // Create child comment
        await request(app)
            .post('/api/comments')
            .send({ content: 'Child Comment', parent_id: rootId });

        const res = await request(app).get('/api/comments');

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);

        // Find the root comment we just added (there might be others from previous tests if we didn't clear)
        // Actually we cleared in beforeAll, but executed one test before.
        const root = res.body.find((c: any) => c.id === rootId);
        expect(root).toBeDefined();
        expect(root.children.length).toBe(1);
        expect(root.children[0].content).toBe('Child Comment');
    });
});

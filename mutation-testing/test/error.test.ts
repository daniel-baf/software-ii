import request from 'supertest';
import app from '../src/server';
import * as db from '../src/database';

// Mock the database module
jest.mock('../src/database', () => {
    const originalModule = jest.requireActual('../src/database');
    return {
        __esModule: true,
        ...originalModule,
        query: jest.fn(), // We will override this mock implementation in tests
        initDb: jest.fn(), // Mock initDb to do nothing during error tests
        closeDb: jest.fn(), // Mock closeDb
    };
});

describe('API Error Handling', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        // Silence console.error during these tests (the app logs the expected DB errors)
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy?.mockRestore();
    });

    it('should return 500 when database query fails during GET /comments', async () => {
        // Mock query to throw an error
        (db.query as jest.Mock).mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app).get('/api/comments');

        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Internal Server Error');
    });

    it('should return 500 when database query fails during POST /api/comments', async () => {
        // Mock query to throw an error
        (db.query as jest.Mock).mockRejectedValueOnce(new Error('Database insert failed'));

        const res = await request(app)
            .post('/api/comments')
            .send({ content: 'Test Comment' });

        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Internal Server Error');
    });
});

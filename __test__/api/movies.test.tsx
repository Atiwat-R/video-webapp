import handler from '@/pages/api/movies/index'; // Update this import with the correct path to your API endpoint
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prismadb from "@/lib/prismadb";
import redis from '@/lib/redis';


// Mock the serverAuth function
jest.mock('../../lib/serverAuth', () => jest.fn()); 

// Mock the prismadb module
jest.mock('../../lib/prismadb', () => ({
    movie: {
        findMany: jest.fn(),
    },
}));

// Mock the redis module
jest.mock('../../lib/redis', () => ({
    get: jest.fn(),
    set: jest.fn(),
}));

describe('API endpoint handler', () => {
    let req: Partial<NextApiRequest>;
    let res: Partial<NextApiResponse>;

    beforeEach(() => {
        req = {
            method: 'GET',
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            end: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 405 if method is not GET', async () => {
        req.method = 'POST';

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return 400 if serverAuth throws an error', async () => {
        (serverAuth as jest.Mock).mockRejectedValue(new Error('Authentication failed'));

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return data from MongoDB if not available in Redis cache', async () => {
        const moviesData = [{ id: 1, title: 'Movie 1' }];
        (prismadb.movie.findMany as jest.Mock).mockResolvedValue(moviesData);
        (redis.get as jest.Mock).mockResolvedValue(null);

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(moviesData);
        expect(redis.set).toHaveBeenCalledWith('movies', JSON.stringify(moviesData), 'EX', 600);
    });

    it('should return data from Redis cache if available', async () => {
        const cachedData = [{ id: 1, title: 'Movie 1' }];
        (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedData));

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(cachedData);
        expect(prismadb.movie.findMany).not.toHaveBeenCalled();
        expect(redis.set).not.toHaveBeenCalled();
    });

    it('should return 400 if an error occurs', async () => {
        (prismadb.movie.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalled();
    });
});




// // Mock the serverAuth function
// // jest.mock('../../lib/serverAuth', () => jest.fn()); 
// jest.mock('../../lib/serverAuth', () => require('../../__mocks__/serverAuth'));

// // Mock the prismadb module
// jest.mock('../../lib/prismadb', () => ({
//     movie: {
//         findMany: jest.fn(),
//     },
// }));
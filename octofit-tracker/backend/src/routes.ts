import { Router, type Request, type Response, type NextFunction } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models';

type SortSpec = Record<string, 1 | -1>;

interface CollectionRouteOptions {
  sort?: SortSpec;
  populate?: string | string[];
}

function createCollectionRouter(model: Model<unknown>, options: CollectionRouteOptions = {}): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      let query = model.find().sort(options.sort || { createdAt: -1 });
      if (options.populate) {
        query = query.populate(options.populate);
      }
      const documents = await query.exec();
      res.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await model.create(req.body);
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export function createApiRouter(apiBaseUrl: string): Router {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
  });

  router.get('/', (_req, res) => {
    res.json({
      apiBaseUrl,
      routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
    });
  });

  router.use('/users', createCollectionRouter(User));
  router.use('/teams', createCollectionRouter(Team));
  router.use('/activities', createCollectionRouter(Activity, { populate: 'user' }));
  router.use('/leaderboard', createCollectionRouter(Leaderboard, { sort: { rank: 1, score: -1 }, populate: 'user' }));
  router.use('/workouts', createCollectionRouter(Workout));

  return router;
}
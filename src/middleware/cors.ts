import cors from 'cors';
import { Express, Request, Response, NextFunction } from 'express';

function middlewareCors(app: Express) {
  const allowedOrigins = ['http://localhost:3000'];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) == -1) {
        // Em prd = if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS bloqueou o acesso!'));
      }
    },
  };

  app.use(cors(corsOptions));

  app.use(
    async (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.message) {
        // if (req.headers.authorization) return next();
        if (req.path.split('/')[2] === 'autenticacao') return next();
        return res.status(403).send({ message: err.message });
      }
    }
  );
}

export default middlewareCors;

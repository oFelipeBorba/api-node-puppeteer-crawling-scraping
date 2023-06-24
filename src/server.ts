/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import routes from './routes';
import express from 'express';
import middlewareCors from './middleware/cors';
const trabalho = () => {
  const app = express();

  middlewareCors(app);
  routes(app);

  app.listen(process.env.PORT_SERVER, () =>
    console.log(`Servidor iniciado na porta: ${process.env.PORT_SERVER}`)
  );
};

export default trabalho;

import cluster from 'cluster';
import trabalho from './server';

const timeOut = 3000;

const executarAdmin = () => {
  cluster.fork();
  cluster.on('exit', (trabalho, code) => {
    if (code !== 0 && !trabalho.exitedAfterDisconnect) {
      console.log(
        `Trabalhador ${trabalho.process.pid} parou de funcionar. Subindo novo trabalhador...`
      );
      const trabalhador = cluster.fork();
      trabalhador.isConnected
        ? null
        : setTimeout(() => {
            console.log(
              `Trabalhador ${trabalhador.id} demorou para iniciar. Finalizando o processo.`
            );
            trabalhador.isConnected ? null : trabalhador.kill(),
              executarAdmin();
          }, timeOut);
    }
  });
};

const executarTrabalhadores = async () => {
  process.on('uncaughtException', (err) => {
    console.log(`Erro não tratado no trabalhador ${process.pid}:`, err);
    process.exit(1);
  });
  trabalho();
};

cluster.isPrimary ? executarAdmin() : executarTrabalhadores();

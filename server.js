import chalk from 'chalk';

import app from './src/app.js';

const PORT = 5000;

app.listen(PORT, err => {
    // Mon serveur est maintenant en mode écoute
    console.log(chalk.blue(`Mon serveur est démarré et écoute sur le port ${PORT}`));
});

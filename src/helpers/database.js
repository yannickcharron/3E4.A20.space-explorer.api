import mongoose from 'mongoose';
import chalk from 'chalk';

export default app => {

    const url = '';
    console.log(url);
    console.log(chalk.green(`[MONGO] - Establish new connection with url: ${url}`));
    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(url).then(
        () => { console.log(chalk.green(`[MONGO] - Connected to: ${url}`)); },
        err => { /*TODO:*/ }
    );
}

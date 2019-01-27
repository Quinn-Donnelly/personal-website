const shelljs = require('shelljs');
const animateProgress = require('./helpers/progress');
const chalk = require('chalk');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

shelljs.env['NODE_ENV'] = 'production';

// Generate stats.json file with webpack
shelljs.exec(
  'node_modules\\.bin\\webpack --config ./node_modules/react-scripts/config/webpack.config.prod.js --profile --json > stats.json',
  addCheckMark.bind(null, callback), // Output a checkmark on completion
);

// Called after webpack has finished generating the stats.json file
function callback() {
  clearInterval(progress);
  process.stdout.write(
    '\n\nOpen ' +
      chalk.magenta('http://webpack.github.io/analyse/') +
      ' in your browser and upload the stats.json file!' +
      chalk.blue(
        '\n(Tip: ' + chalk.italic('CMD + double-click') + ' the link!)\n\n',
      ),
  );
}
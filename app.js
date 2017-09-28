const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${ chalk.blue('Server running on port')} ${ chalk.red(port) }`);
})
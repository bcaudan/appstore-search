'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const data = require('./z_data.json');

const results = [];

function updateImagefromLink(app) {
  console.log('process', app.link);
  const result = execSync(`./retrieve-new-image.sh ${app.link}`).toString();
  console.log('result', result);
  if (result) {
    app.image = result;
  }
  results.push(app);
  fs.writeFileSync('./data.json', JSON.stringify(results, null, 2));
}

data.forEach(app => updateImagefromLink(app));

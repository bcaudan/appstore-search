const index = require('../backend/database/initIndex');

async function clearIndex() {
  await index.clearIndex()
             .then(({taskID}) => index.waitTask(taskID));
}

clearIndex();

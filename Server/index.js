const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const routes = require('./src/Routes/index.js')
const { firstload } = require('./src/Utils/Utils.js'); // descomentar para primera carga */

server.use('/', routes);

conn.sync({ force: true }).then(() => { /* cambiar a true en primera carga */
  firstload(); // descomentar para primera carga 
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
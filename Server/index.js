const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;
const routes = require('./src/Routes/index.js');
const cron = require('node-cron');
const { scheduledDeletion, delInactiveAcc } = require('./src/Utils/cronJobs');
// const { firstload } = require('./src/Utils/Utils.js'); // descomentar para primera carga */

server.use("/", routes);
cron.schedule("0 0 * * *", async () => {
  scheduledDeletion();
});
cron.schedule("0 */1 * * *", async () => {
  delInactiveAcc();
});

conn
	.sync({ force: false })
	.then(() => {
		/* cambiar a true en primera carga */

		//firstload(); // descomentar para primera carga

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

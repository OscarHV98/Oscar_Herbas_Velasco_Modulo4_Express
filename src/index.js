import { app } from "./app.js";
import { sequelize } from "./database/database.js";
import 'dotenv/config'
import logger from "./logs/logger.js";

const main = async () => {
    await sequelize.sync();
    const port = process.env.PORT;
    app.listen(port);
    console.log("server listening on port 3000");
    logger.info(`Server started on port${port}`);
}

main();
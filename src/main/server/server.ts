import app from "../config/app";
import singletonLogger from "../config/Logger";

app.listen(process.env.SERVER_PORT, () => {
  singletonLogger.log({
    level: "info",
    message: `Your server was setup successfull in port: ${process.env.SERVER_PORT}`,
  });
});

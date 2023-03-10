import Express from "Lib/Infra/Internal/Express";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { expressConfig } from "Config/index";
import { SERVER_STARTED } from "Helpers/Messages/SystemMessages";
import { DependencyContainer } from "tsyringe";
import "Lib/Events/index";

class Application {
  server: any;
  express: Express;
  container: DependencyContainer;

  constructor(container: DependencyContainer) {
    console.clear();
    this.container = container;
    const dbContext: DbContext = this.container.resolve(DbContext);
    this.express = new Express(dbContext);
    const port = expressConfig.port;
    this.server = this.express.app.listen(port, () => {
      this.express.loggingProvider.info(`${SERVER_STARTED} PORT: ${port}`);
      this.express.loggingProvider.info(`HEALTH: ${port}/ping`);
    });
  }
}

export default Application;

import app from "./app";
import { PORT } from "./config/index";

const port = PORT;
app.listen(port, () => {
  console.log(`=================================`);
  console.log(`🚀 App listening on the port ${port}`);
  console.log(`=================================`);
});

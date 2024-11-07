import { app } from "./app";
import { swagger } from "@elysiajs/swagger";

app.use(swagger()).listen(3000);

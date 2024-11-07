import * as sqlService from "./sql/bun.adapter";
import { App } from "./app";

App.create({
	db: sqlService,
}).listen(3000);

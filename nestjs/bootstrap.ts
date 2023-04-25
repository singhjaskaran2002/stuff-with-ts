import { app } from "./src/server";

export function bootstrap() {
	app.listen(8000, () => console.log('Server started at http://localhost:8000'));
}

bootstrap();
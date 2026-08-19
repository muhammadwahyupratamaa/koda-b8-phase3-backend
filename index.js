import express from "express";
import "dotenv/config";
import router from "./src/routes/index.js";
import corsMiddleware from "./src/middlewares/cors.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

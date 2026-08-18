import express from "express";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

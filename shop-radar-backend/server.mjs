import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

const PORT = process.env.PORT || 5051;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", records);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

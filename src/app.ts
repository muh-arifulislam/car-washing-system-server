import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

//PARSER
app.use(express.json());
app.use(cors());

//ROUTES
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "App is successfully running!!" });
});

app.use("/api", router);

export default app;

import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

//PARSER
app.use(express.json());
app.use(cors());

//ROUTES
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "App is successfully running!!" });
});

app.use("/api", router);

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;

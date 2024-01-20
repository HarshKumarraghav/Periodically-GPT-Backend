import express, { Application, Request, Response } from "express";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to bezkoder application." });
}
const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.get("/", welcome);
app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

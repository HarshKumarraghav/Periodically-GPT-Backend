import express, { Application, Request, Response } from "express";

import { openai } from "../lib/openai";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to bezkoder application." });
}
const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.get("/", welcome);
const SendMessageHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    const userId = process.env.USER_ID || "user_2W84NAgbyRlQMaMN7c1sq0IV3yr";
    if (!userId) return res.status(401).send("Unauthorized");

    // const { fileId, message } = SendMessageValidator.parse(body);
    const fileId = "clrmgydhc0001i8081ztqm3fz";
    const message = "Hydrogren atomic number";

    if (!fileId) return res.status(404).send("not found!");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages: [
        {
          role: "system",
          content:
            "You the chatbot for periodic table only give response about periodic table related stuff you are not allowed to give response outside the periodic table. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer. Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
        },
        {
          role: "user",
          content: `You the chatbot for periodic table only give response about periodic table related stuff you are not allowed to give response outside the periodic table. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer. Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            \n----------------\n 
            CONTEXT:
            You the chatbot for periodic table only give response about periodic table related stuff you are not allowed to give response outside the periodic table. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            USER INPUT: ${message}`,
        },
      ],
    });

    return res.json({ data: response });
    // stream.on("data", (chunk: Buffer) => {
    //   const payloads = chunk.toString().split("\n\n");
    //   for (const payload of payloads) {
    //     if (payload.includes("[DONE]")) return;
    //     if (payload.startsWith("data:")) {
    //       const data = JSON.parse(payload.replace("data: ", ""));
    //       try {
    //         const chunk: undefined | string = data.choices[0].delta?.content;
    //         if (chunk) {
    //           console.log(chunk);
    //         }
    //       } catch (error) {
    //         console.log(`Error with JSON.parse and ${payload}.\n${error}`);
    //       }
    //     }
    //   }
    // });

    // stream.on("end", () => {
    //   setTimeout(() => {
    //     console.log("\nStream done");
    //     res.send({ message: "Stream done" });
    //   }, 10);
    // });

    // stream.on("error", (err: Error) => {
    //   console.log(err);
    //   res.send(err);
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
app.post("/api/message", SendMessageHandler);
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

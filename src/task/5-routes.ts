import { namespaceWrapper, app } from "@_koii/namespace-wrapper";

export async function routes() {
  // Get all stored gameplay data
  app.get("/game-data", async (_req, res) => {
    try {
      const gameData = JSON.parse((await namespaceWrapper.storeGet("gameData")) || "[]");
      console.log("Retrieved game data:", gameData);
      res.status(200).json({ data: gameData });
    } catch (error) {
      console.error("ERROR FETCHING GAME DATA:", error);
      res.status(500).send("Error fetching game data.");
    }
  });

  // Clear gameplay data
  app.post("/clear-data", async (_req, res) => {
    try {
      await namespaceWrapper.storeSet("gameData", JSON.stringify([]));
      console.log("Gameplay data cleared.");
      res.status(200).send("Gameplay data cleared successfully.");
    } catch (error) {
      console.error("ERROR CLEARING DATA:", error);
      res.status(500).send("Error clearing game data.");
    }
  });
}

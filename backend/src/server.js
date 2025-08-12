import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm"; // ✅ Import these

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// Get all favorites
app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await db.select().from(favoritesTable);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete favorite
app.delete("/api/favorites/:userId/:jobId", async (req, res) => {
  try {
    const { userId, jobId } = req.params;

    const result = await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.jobId, parseInt(jobId))
        )
      )
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add a favorite
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, jobId, title, image, jobDate, positions } = req.body;

    if (!userId || !jobId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        jobId,
        title,
        image,
        jobDate,
        positions,
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));
    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching the favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js"; 
import * as schema from "../db/schema.js"; // make sure schema is exported properly

// Initialize Neon client
const sql = neon(ENV.DATABASE_URL);

// Create Drizzle instance with schema
export const db = drizzle(sql, { schema });

import { TProduct } from "@/types";
import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";

dotenv.config();

export const db = new Index<TProduct>();

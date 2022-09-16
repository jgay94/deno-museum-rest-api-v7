import { number, Schema, string } from "computed-types";

export const NewMuseumSchema = Schema({
  name: string.trim().normalize().between(3, 40).optional(),
  description: string.trim().normalize().between(10, 255).optional(),
  location: {
    lat: number,
    lng: number,
  },
});

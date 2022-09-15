import { RouterContext } from "oak";

export type Museum = {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt?: string;
};

export type NewMuseum = Partial<Museum>;

export interface IMuseumController {
  findAll(ctx: RouterContext<string>): Promise<void>;
}

export interface IMuseumService {
  findAll(): Promise<Museum[]>;
}

export interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
  create(museum: NewMuseum): Promise<Museum>;
}

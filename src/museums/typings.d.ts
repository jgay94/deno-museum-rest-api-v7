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

export type NewMuseumPayload = {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};

export interface IMuseumController {
  findAll(ctx: RouterContext<string>): Promise<void>;
  create(ctx: RouterContext<string>): Promise<void>;
}

export interface IMuseumService {
  findAll(): Promise<Museum[]>;
  create(museum: NewMuseumPayload): Promise<Museum>;
}

export interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
  create(museum: NewMuseum): Promise<Museum>;
}

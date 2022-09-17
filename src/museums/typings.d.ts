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
  getById(ctx: RouterContext<string>): Promise<void>;
  update(ctx: RouterContext<string>): Promise<void>;
}

export interface IMuseumService {
  findAll(): Promise<Museum[]>;
  create(museum: NewMuseumPayload): Promise<Museum>;
  getById(id: string): Promise<Museum | null>;
  update(id: string, museum: Museum): Promise<Museum | null>;
  delete(id: string): Promise<void | null>;
}

export interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
  create(museum: NewMuseum): Promise<Museum>;
  getById(id: string): Promise<Museum | null>;
  update(id: string, museum: Museum): Promise<Museum | null>;
  delete(id: string): Promise<void | null>;
}

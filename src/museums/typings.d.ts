export type Museum = {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};

export interface IMuseumService {
  findAll(): Promise<Museum[]>;
}

export interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
}

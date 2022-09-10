export type Museum = {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};

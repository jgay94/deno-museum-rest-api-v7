export type {
  IMuseumController,
  IMuseumRepository,
  IMuseumService,
  Museum,
  NewMuseum,
  NewMuseumPayload,
} from "./typings.d.ts";

export { Controller } from "./controller.ts";
export { Service } from "./service.ts";
export { Repository } from "./repository.ts";

import { Controller } from "./controller.ts";
import { Service } from "./service.ts";
import { Repository } from "./repository.ts";

const museumRepository = new Repository();
const museumService = new Service({ museumRepository });
export const museumsController = new Controller({ museumService });

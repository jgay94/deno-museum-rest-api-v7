// types
export type {
  IMuseumController,
  IMuseumRepository,
  IMuseumService,
  Museum,
  NewMuseum,
  NewMuseumInput,
  NewMuseumPayload,
} from "./typings.d.ts";

// classes
export { Controller } from "./controller.ts";
export { Service } from "./service.ts";
export { Repository } from "./repository.ts";

// validations
export { NewMuseumSchema } from "./validations.ts";

// imports for manual dependency injection
import { Controller } from "./controller.ts";
import { Service } from "./service.ts";
import { Repository } from "./repository.ts";

// manual dep injection
const museumRepository = new Repository();
const museumService = new Service({ museumRepository });
export const museumsController = new Controller({ museumService });

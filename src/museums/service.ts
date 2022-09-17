import {
  IMuseumRepository,
  IMuseumService,
  Museum,
  NewMuseumPayload,
} from "./mod.ts";
import * as log from "std/log/mod.ts";

interface IServiceDependencies {
  museumRepository: IMuseumRepository;
}

export class Service implements IMuseumService {
  private museumRepository: IMuseumRepository;

  constructor({ museumRepository }: IServiceDependencies) {
    this.museumRepository = museumRepository;
  }

  public async findAll(): Promise<Museum[]> {
    const museumList = await this.museumRepository.findAll();
    log.info(
      `[${new Date().toISOString()}] Found ${museumList.length} museums...`,
    );

    return museumList;
  }

  public async create(museum: NewMuseumPayload): Promise<Museum> {
    const newMuseum = await this.museumRepository.create(museum);
    log.info(`[${new Date().toISOString()}] Museum created: ${newMuseum.name}`);

    return newMuseum;
  }

  public async getById(id: string): Promise<Museum | null> {
    const museum = await this.museumRepository.getById(id);

    if (!museum) {
      log.warning(`[${new Date().toISOString()}] Museum not found: ${id}`);
      return null;
    } else {
      log.info(`[${new Date().toISOString()}] Museum found: ${museum.name}`);
      return museum;
    }
  }

  public async update(id: string, museum: Museum): Promise<Museum | null> {
    const updatedMuseum = await this.museumRepository.update(id, museum);

    if (!updatedMuseum) {
      log.warning(`[${new Date().toISOString()}] Museum not found: ${id}`);
      return null;
    } else {
      log.info(`[${new Date().toISOString()}] Museum updated: ${id}`);
      return updatedMuseum;
    }
  }
}

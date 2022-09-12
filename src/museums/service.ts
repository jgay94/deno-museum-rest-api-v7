import { IMuseumRepository, IMuseumService, Museum } from "./mod.ts";
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
    log.info(`Found ${museumList.length} museums...`);

    return museumList;
  }
}

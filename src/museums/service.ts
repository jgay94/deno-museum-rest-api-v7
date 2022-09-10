import { Museum } from "./typings.d.ts";
import { Repository as MuseumRepository } from "./repository.ts";

interface IMuseumService {
  findAll(): Promise<Museum[]>;
}

interface IServiceDependencies {
  museumRepository: MuseumRepository;
}

export class Service implements IMuseumService {
  private museumRepository: MuseumRepository;

  constructor({ museumRepository }: IServiceDependencies) {
    this.museumRepository = museumRepository;
  }

  public async findAll(): Promise<Museum[]> {
    return await this.museumRepository.findAll();
  }
}

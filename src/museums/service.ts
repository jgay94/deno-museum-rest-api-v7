import { IMuseumRepository, IMuseumService, Museum } from "./typings.d.ts";

interface IServiceDependencies {
  museumRepository: IMuseumRepository;
}

export class Service implements IMuseumService {
  private museumRepository: IMuseumRepository;

  constructor({ museumRepository }: IServiceDependencies) {
    this.museumRepository = museumRepository;
  }

  public async findAll(): Promise<Museum[]> {
    return await this.museumRepository.findAll();
  }
}

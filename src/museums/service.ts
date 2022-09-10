import { Museum } from "./typings.d.ts";

interface IMuseumService {
  findAll(): Promise<Museum[]>;
}

interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
}

interface IServiceDependencies {
  museumRepository: IMuseumRepository;
}

export class Service implements IMuseumService {
  private museumRepository: IMuseumRepository;

  constructor({ museumRepository }: IServiceDependencies) {
    this.museumRepository = museumRepository;
  }

  // deno-lint-ignore require-await
  public async findAll(): Promise<Museum[]> {
    return this.museumRepository.findAll();
  }
}

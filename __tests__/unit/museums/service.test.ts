// deno-lint-ignore-file require-await
import { beforeEach, describe, it } from "std/testing/bdd.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
} from "std/testing/asserts.ts";
import {
  Museum,
  Repository as MuseumRepository,
  Service as MuseumService,
} from "/src/museums/mod.ts";

describe("MuseumService.findAll", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    // reset the museum repository before each test
    museumRepository = new MuseumRepository();
  });

  it("should return an empty list upon initialization", async () => {
    const museumService = new MuseumService({ museumRepository });
    const museumList = await museumService.findAll();

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 0);
    assertArrayIncludes(museumList, []);
  });

  it("should return a list of museums", async () => {
    const museumService = new MuseumService({
      museumRepository: {
        findAll: async () => [{
          id: "1",
          name: "Museum 1",
          description: "Description 1",
          location: {
            lat: 1,
            lng: 1,
          },
          createdAt: "2022-09-15T11:04:02.445Z",
        }],
        create: async () => {
          throw new Error("Not implemented");
        },
      },
    });
    const museumList = await museumService.findAll();
    const museum = museumList[0];

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 1);
    assertArrayIncludes(museumList, [museum]);

    assertEquals(museum.id, "1");
    assertEquals(museum.name, "Museum 1");
    assertEquals(museum.description, "Description 1");
    assertEquals(museum.location.lat, 1);
    assertEquals(museum.location.lng, 1);
    assertEquals(museum.createdAt, "2022-09-15T11:04:02.445Z");
  });
});

describe("MuseumService.create", () => {
  let museumService: MuseumService;

  beforeEach(() => {
    museumService = new MuseumService({
      museumRepository: {
        findAll: async () => [],
        create: async (museum: Museum) => museum,
      },
    });
  });

  it("should create a new museum", async () => {
    const newMuseum = await museumService.create({
      name: "Museum 1",
      description: "Description 1",
      location: {
        lat: 1,
        lng: 1,
      },
    });

    assertEquals(newMuseum.name, "Museum 1");
    assertEquals(newMuseum.description, "Description 1");
    assertEquals(newMuseum.location.lat, 1);
    assertEquals(newMuseum.location.lng, 1);
  });
});

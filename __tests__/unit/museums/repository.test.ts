import { beforeEach, describe, it } from "std/testing/bdd.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
} from "std/testing/asserts.ts";
import { Repository as MuseumRepository } from "/src/museums/mod.ts";

describe("MuseumRepository.findAll", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    // reset the museum repository before each test
    museumRepository = new MuseumRepository();
  });

  it("should return an empty list upon initialization", async () => {
    const museumList = await museumRepository.findAll();

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 0);
    assertArrayIncludes(museumList, []);
  });

  it("should return a list of museums", async () => {
    museumRepository.loadFixtures([
      {
        id: "763bc1ff-b4da-4247-93a1-90fe4b7c947d",
        name: "Museum 1",
        description: "Description 1",
        location: {
          lat: 1,
          lng: 1,
        },
        createdAt: "2022-09-15T10:27:46.093Z",
      },
    ]);

    const museumList = await museumRepository.findAll();
    const museum = museumList[0];

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 1);
    assertArrayIncludes(museumList, [museum]);

    assertEquals(museum.id, "763bc1ff-b4da-4247-93a1-90fe4b7c947d");
    assertEquals(museum.name, "Museum 1");
    assertEquals(museum.description, "Description 1");
    assertEquals(museum.location.lat, 1);
    assertEquals(museum.location.lng, 1);
    assertEquals(museum.createdAt, "2022-09-15T10:27:46.093Z");
  });
});

describe("MuseumRepository.create", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    museumRepository = new MuseumRepository();
  });

  it("should create a new museum", async () => {
    const museum = await museumRepository.create({
      name: "Museum 1",
      description: "Description 1",
      location: {
        lat: 1,
        lng: 1,
      },
    });

    assertEquals(museum.name, "Museum 1");
    assertEquals(museum.description, "Description 1");
    assertEquals(museum.location.lat, 1);
    assertEquals(museum.location.lng, 1);
  });
});

describe("MuseumRepository.getById", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    museumRepository = new MuseumRepository();
    museumRepository.loadFixtures([
      {
        id: "3504fac6-4a4d-491c-962e-2af3ed6d94b4",
        name: "Museum 1",
        description: "Description 1",
        location: {
          lat: 1,
          lng: 1,
        },
        createdAt: "2022-09-16T09:36:52.356Z",
      },
    ]);
  });

  it("should return a museum by id", async () => {
    const museum = await museumRepository.getById(
      "3504fac6-4a4d-491c-962e-2af3ed6d94b4",
    );

    assertEquals(museum?.name, "Museum 1");
    assertEquals(museum?.description, "Description 1");
    assertEquals(museum?.location.lat, 1);
    assertEquals(museum?.location.lng, 1);
  });

  it("should return null if id not found", async () => {
    const museum = await museumRepository.getById(
      "",
    );

    assertEquals(museum, null);
  });
});

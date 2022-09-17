import { beforeEach, describe, it } from "std/testing/bdd.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
} from "std/testing/asserts.ts";
import { Museum, Repository as MuseumRepository } from "/src/museums/mod.ts";

describe("MuseumRepository.findAll", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
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
    assertEquals(museum?.createdAt, "2022-09-16T09:36:52.356Z");
  });

  it("should return null if id not found", async () => {
    const museum = await museumRepository.getById(
      "",
    );

    assertEquals(museum, null);
  });
});

describe("MuseumRepository.update", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    museumRepository = new MuseumRepository();
    museumRepository.loadFixtures([
      {
        id: "d183bb6a-a7ed-4d5b-a78e-101d5ab29afc",
        name: "Museum 1",
        description: "Description 1",
        location: {
          lat: 1,
          lng: 1,
        },
        createdAt: "2022-09-17T10:32:49.453Z",
      },
    ]);
  });

  it("should update a museum", async () => {
    const museum = await museumRepository.update(
      "d183bb6a-a7ed-4d5b-a78e-101d5ab29afc",
      {
        name: "Museum 2",
        description: "Description 2",
        location: {
          lat: 2,
          lng: 2,
        },
        createdAt: "2022-09-17T10:32:49.453Z",
      } as Museum,
    );

    assertEquals(museum?.id, "d183bb6a-a7ed-4d5b-a78e-101d5ab29afc");
    assertEquals(museum?.name, "Museum 2");
    assertEquals(museum?.description, "Description 2");
    assertEquals(museum?.location.lat, 2);
    assertEquals(museum?.location.lng, 2);
    assertEquals(museum?.createdAt, "2022-09-17T10:32:49.453Z");
  });

  it("should return null if museum to update not found", async () => {
    const museum = await museumRepository.update(
      "",
      {
        name: "Museum 2",
        description: "Description 2",
        location: {
          lat: 2,
          lng: 2,
        },
        createdAt: "2022-09-17T10:32:49.453Z",
      } as Museum,
    );

    assertEquals(museum, null);
  });
});

describe("MuseumRepository.delete", () => {
  let museumRepository: MuseumRepository;

  beforeEach(() => {
    museumRepository = new MuseumRepository();
    museumRepository.loadFixtures([
      {
        id: "d183bb6a-a7ed-4d5b-a78e-101d5ab29afc",
        name: "Museum 1",
        description: "Description 1",
        location: {
          lat: 1,
          lng: 1,
        },
        createdAt: "2022-09-17T10:32:49.453Z",
      },
    ]);
  });

  it("should delete a museum", async () => {
    await museumRepository.delete(
      "d183bb6a-a7ed-4d5b-a78e-101d5ab29afc",
    );

    const museumList = await museumRepository.findAll();

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 0);
    assertArrayIncludes(museumList, []);
  });

  it("should return null if museum to delete not found", async () => {
    const museum = await museumRepository.delete("");

    assertEquals(museum, null);
  });
});

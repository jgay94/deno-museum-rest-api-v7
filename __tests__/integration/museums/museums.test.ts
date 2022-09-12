import { beforeEach, describe, it } from "std/testing/bdd.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
} from "std/testing/asserts.ts";
import { Repository as MuseumRepository } from "/src/museums/mod.ts";
import { Service as MuseumService } from "/src/museums/mod.ts";

describe("Find all museums", () => {
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
    console.log(museumList);
  });

  it("should return a list of museums", async () => {
    museumRepository.loadFixtures([
      {
        id: "1",
        name: "Museum 1",
        description: "Description 1",
        location: {
          lat: 1,
          lng: 1,
        },
      },
    ]);
    const museumService = new MuseumService({ museumRepository });
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
    console.log(museumList);
  });
});

import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
  describe,
  it,
} from "../../../dev_deps.ts";
import { Repository as MuseumRepository } from "../../../src/museums/repository.ts";

describe("MuseumRepository.findAll", () => {
  it("should return a list of museums from memory", async () => {
    const museumRepository = new MuseumRepository();
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
    const museumList = await museumRepository.findAll();
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

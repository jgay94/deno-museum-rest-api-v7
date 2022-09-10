import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
  describe,
  it,
} from "../../../dev_deps.ts";
import { Service as MuseumService } from "../../../src/museums/service.ts";

describe("MuseumService.findAll", () => {
  it("should return a list of museums", async () => {
    const museumService = new MuseumService({
      museumRepository: {
        // deno-lint-ignore require-await
        findAll: async () => [{
          id: "1",
          name: "Museum 1",
          description: "Description 1",
          location: {
            lat: 1,
            lng: 1,
          },
        }],
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
    console.log(museumList);
  });
});

import {
  assertEquals,
  assertInstanceOf,
  describe,
  it,
} from "../../../dev_deps.ts";
import { Service as MuseumService } from "../../../src/museums/service.ts";

describe("MuseumService.findAll", () => {
  it("should return a list of museums", async () => {
    const museumService = new MuseumService();
    const museumList = await museumService.findAll();

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 0);
    console.log(museumList);
  });
});

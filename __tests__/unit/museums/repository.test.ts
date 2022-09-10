import {
  assertEquals,
  assertInstanceOf,
  describe,
  it,
} from "../../../dev_deps.ts";
import { Repository as MuseumRepository } from "../../../src/museums/repository.ts";

describe("MuseumRepository.findAll", () => {
  it("should return a list of museums from memory", async () => {
    const museumRepository = new MuseumRepository();
    const museumList = await museumRepository.findAll();

    assertInstanceOf(museumList, Array);
    assertEquals(museumList.length, 0);
    console.log(museumList);
  });
});

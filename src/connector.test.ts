import * as zip from "./connector";

describe("Zip", () => {
  describe("getAddress", () => {
    describe("when zip=7830060", () => {
      it("returns object with JSON and HTML", () => {
        const response = zip.getAddress("7830060");
        expect(response.hasOwnProperty("json")).toBe(true);
        expect(response.hasOwnProperty("html")).toBe(true);
      });
      it("returns ZipResponse as JSON with Kochi Prefecture", () => {
        const response = zip.getAddress("7830060");
        expect(JSON.parse(response.json)).toEqual({
          message: null,
          results: [
            {
              address1: "高知県",
              address2: "南国市",
              address3: "蛍が丘",
              kana1: "ｺｳﾁｹﾝ",
              kana2: "ﾅﾝｺｸｼ",
              kana3: "ﾎﾀﾙｶﾞｵｶ",
              prefcode: "39",
              zipcode: "7830060"
            }
          ],
          status: 200
        });
      });
    });
  });
});

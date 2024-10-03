import * as zip from "./connector";

describe("Zip", () => {
  describe("getAddress", () => {
    describe("when zip=7830060", () => {
      it("returns ZipResponse as JSON with Kochi Prefecture", async () => {
        const response = await zip.getAddress("7830060");
        expect(response).toEqual({
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

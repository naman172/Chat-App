var expect = require("expect");
var isRealString = require("./isRealString.js");

describe("is Real String", () => {
    it("should reject non-string values", ()=>{
        let res = isRealString(123);
        expect(res).toBe(false);
    });

    it("should reject strings with only spaces", ()=>{
        let res = isRealString("   ");
        expect(res).toBe(false);
    });
    it("should allow strings with non-space chars", ()=>{
        let res = isRealString("    Mixed Media   ");
        expect(res).toBe(true);
    });
});
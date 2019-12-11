let expect = require("expect");

var {generateMessage, generateLocationTag} = require("./message.js");

describe("Generate Message", () => {
    it("should generate correct message object", () => {
        let from = "user",
            text = "random message",
            message = generateMessage(from, text);

        expect(typeof(message.createdAt)).toBe("number");
        expect(message).toMatchObject({from, text});
    });
});

describe("Generate Location Tag", () => {
    it("should generate correct location object", () =>{
        let from = "user",
            lat = 123,
            long = 123,
            message = generateLocationTag(from, lat, long);
        
        expect(typeof(message.createdAt)).toBe("number");
        expect(message).toMatchObject({from, url: `https://google.com/maps?q=${lat},${long}`});    
    });
});
var expect = require("expect");

var Users = require("./user.js");

describe("Users", ()=>{

    let Connections;
    beforeEach( ()=> {
        Connections = new Users;
        Connections.users = [
            {
                id: "1",
                name: "Faraday",
                room: "alphas"
            },
            {
                id: "2",
                name: "Witlock",
                room: "alphas"
            },
            {
                id: "3",
                name: "Citra",
                room: "gammas"
            }
        ];
    });

    it("should add new user", ()=>{
        let user = {
            id: "hfhgchdjdgj",
            name: "Colt",
            room: "alphas"
        };
        
        let reUser = Connections.addUser(user.id, user.name, user.room);

        expect(Connections.users[Connections.users.length-1]).toEqual(user);
    });

    it("should return names for alphas", ()=>{

        let reArray = Connections.getUserList("alphas");
        expect(reArray).toEqual(['Faraday', 'Witlock']);
    });

    it("should find user", ()=>{
        let reUser = Connections.getUser("1");
        expect(reUser).toMatchObject({
            id: "1",
            name: "Faraday",
            room: "alphas"
        });
        
        let reAbsentUser = Connections.getUser("4");
        expect(reAbsentUser).toEqual(undefined);
    });

    it("should remove a user", ()=> {
        let user = Connections.removeUser("1");
        expect(user.id).toEqual("1");
        expect(Connections.users.length).toBe(2);
    })
});
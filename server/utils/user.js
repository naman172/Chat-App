class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let user = { id, name, room};
        this.users.push(user);
        return user;
    }

    getUserList(room){
        let list = this.users.filter((user)=>{
            return user.room === room;

        });
        let nameArray = list.map((user)=>{
            return user.name;
        });
        return nameArray;
    }

    getUser(id){
        return this.users.filter((user)=>user.id === id)[0];
    }

    removeUser(id){
        let user = this.getUser(id);

        if(user){
            this.users = this.users.filter((user)=> user.id!==id);
        }

        return user;
    }
};

module.exports = Users;
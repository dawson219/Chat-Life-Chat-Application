const users = [];

const addUser = ({id , name , room})=>{
    try{
        name = name?.trim()?.toLowerCase();
        room = room?.trim()?.toLowerCase();

        const existingUser = users.find((user)=> user.room === room && user.username === name);
        
        if(existingUser){
            return {error: "Username is Taken"};
        }

        const user = {id , name , room}
        users.push(user);

        return {user};
    }
    catch(err){
        console.log(err)
    }
}

const removeUser = (id)=>{
    try{
        const index = users.findIndex((user)=> user.id === id);

        if(index != -1){
            return users.splice(index , 1)[0];
        }
    }
    catch(err){
        console.log(err)
    }
}

const getUser = (id) => users.find((user)=> user.id === id);

const getUsersInRoom = (room)=> users.filter((user)=> user.room === room)

module.exports = {addUser , removeUser , getUser , getUsersInRoom}
import {createServer} from "http"
import {Server, Socket} from "socket.io";
const httpServer = createServer()
const io = new Server(httpServer,{
    cors:{
        origin: "*"
    }
})

io.on("connection",socket => {
    console.log("Хтось підключився з id = "+socket.id)

    socket.on("disconnect",()=>{
        console.log("Клієнт з id = "+socket.id+" від'єднався")
    })
        
    socket.on("canal2",(dataFromClient)=>{
        console.log(dataFromClient+" це дані від серверу")
        io.emit("canal2",dataFromClient+" серверна приставка")
    })    
})


    try {
        httpServer.listen(3030,()=>{
            console.log("Сервер запущено на порті 3030")
        })
    }
    catch (err) {
        console.log("Помилка на сервері")
        console.log(err)
    }

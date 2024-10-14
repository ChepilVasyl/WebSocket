import {createServer} from "http"
import {Server, Socket} from "socket.io";
const httpServer = createServer()
const io = new Server(httpServer,{
    cors:{
        origin: "*"
    }
})
let counter = 1
io.on("connection",socket => {
    const date = new Date().toLocaleTimeString()
    console.log("Дата = " + date)
    let nameClient = "ім'я клієнта-"+counter
    console.log("Ім'я = " + nameClient)
    socket.name = nameClient
    socket.date = date
    const obj = {
        nameClient:socket.name,
        dateClient:socket.date
    }
    io.emit("welcomeMessage",obj)
    counter++

    socket.on("disconnect",()=>{
        console.log("Клієнт з id = "+socket.id+" від'єднався")
    })
        
    socket.on("canal2",(dataFromClient)=>{
        console.log(dataFromClient+" це повідомлення від серверу")
            //Те що видається всім клієнтам
        const data = {
            message:dataFromClient,
            date:date,
            name:socket.name
        }
        io.emit("canal2",data)
    })
    socket.on("changeName",(data)=>{
        const newData = {
            newName:data.newName,
            message: `Користувач ${data.oldName} змінив ім'я на ${data.newName}`
        }
        socket.name = data.newName
        console.log("socketName = "+socket.name)
        io.emit("changeName",newData)
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
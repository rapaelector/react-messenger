const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const UserGroup = require('./models/UserGroup')
const io = require('./components/socket/socket')
const sequelize = require('./db/db')
const db = require('./db/db')
const Message = require('./models/Message')


io.on('connection', (socket) => {
    socket.on('message', ({name, message}) => {
        socket.emit('message', ({name, memssage}))
    }
    )
});






const PORT = 5000;

const app = express();
app.use(express.json()) // for parsing application/json

db.authenticate().then(
    ()=> {
        console.log('db is connected')
    }
).catch((e) => {
    console.log(`Error : ${e}`)
})

async function synchronisation() {
    await Message.sync({ force: true });
    console.log('all tables was updated')
}

// to update the database
// synchronisation();


app.get('/', (request, response) => response.send('index'))
app.use('/users', require('./components/users/list'))

// create Message

app.post('/create_messages', (req, res) => {
    const {content , GroupId, UserId} = req.body;
    Message.create({
        content: content,
        GroupId: GroupId,
        UserId: UserId
    }).then(
        Message => {
            io.emit('messageadd', (Message))
            res.sendStatus(201)
        }
    ).catch(e => console.log(e))
}
);

app.listen(PORT, console.log(`server started on ${PORT}`))
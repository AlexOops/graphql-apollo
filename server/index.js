const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const users = [{id: 1, name: 'Vasya', age: 20}]; //эмитация данных с бд

const app = express();

const createUser = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
}

const root = { // Резолвер
    getAllUsers: () => {
        return users
    },

    getUser: ({id}) => {
        return users.find((user) => user.id === id);
    },

    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user);
        return user;
    }
}

app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true, // графический интерфейс
    schema,
    rootValue: root // подкл резолвер
}))

app.listen('5000', () => console.log('Sever started on port 5000'));



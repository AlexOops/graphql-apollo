import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from '@apollo/client';
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutations/createUser";

function App() {
    const {loading, error, data, refetch} = useQuery(GET_ALL_USERS);

    const {loading: loadingOneUser, data: oneUser,} = useQuery(GET_ONE_USER, { // для теста захаркодил
        variables: {
            id: 1
        }
    });

    const [newUser] = useMutation(CREATE_USER); // создание - возвращается кортеж

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    console.log(oneUser)
    const addUser = (e) => {
        e.preventDefault();

        newUser({
            variables: {
                input: { // переменная для мутации
                    name, age
                }
            }
        }).then(({data}) => {
                console.log(data)
                setName('') // очистка
                setAge(0)
            }
        );
    }

    const getAll = (e) => {
        e.preventDefault();
        refetch().then(r => console.log(r));
    }

    useEffect(() => {

        if (!loading) setUsers(data.getAllUsers);

    }, [data, loading]);

    return (
        <div className="App">

            <form className={'form'}>
                <input className={'input'} value={name} onChange={(e) => setName(e.target.value)} type="text"
                       placeholder={'Name'}/>
                <input className={'input'} value={age} onChange={(e) => setAge(e.target.value)} type="text"
                       placeholder={'age'}/>

                <div className={'buttons'}>
                    <button onClick={(e) => addUser(e)} className={'button'}>Create</button>
                    <button onClick={(e) => getAll(e)} className={'button'}>Get</button>
                </div>
            </form>

            <div className={'users'}>
                {
                    !loading ?

                        users.map(user =>
                            <div className={user} key={user.id}>
                                {user.id}. {user.name} {user.post}
                            </div>)

                        : 'Loading...'
                }
            </div>
        </div>
    );
}

export default App;

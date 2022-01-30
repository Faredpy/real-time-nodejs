import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";

const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    function connect() {
        socket.current = new WebSocket('ws://localhost:3001');

        socket.current.onopen = () => {
            setConnected(true);
            console.log('Подключение установлено');
        }
        socket.current.onmessage = () => {

        }
        socket.current.onclose = () => {
            console.log('Socket закрыт');
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка');
        }
    }

    const sendMessage = async () => {
        const response = await axios.post('http://localhost:3001/new-messages', {
            message: value,
            id: nanoid()
        })
        setValue('');
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={prev => setValue(prev.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebSock;
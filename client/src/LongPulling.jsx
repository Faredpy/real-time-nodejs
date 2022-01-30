import React, {useEffect, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:3001/get-messages')
            setMessages(prev => [data, ...prev]);
            await subscribe();
        } catch (er) {
            setTimeout(() => {
                subscribe();
            }, 500)
        }
    }

    const sendMessage = async () => {
        const response = await axios.post('http://localhost:3001/new-messages', {
            message: value,
            id: nanoid()
        })
        setValue('');
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

export default LongPulling;
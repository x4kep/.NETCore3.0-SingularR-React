import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as signalR from "@microsoft/signalr";


const SignalR: React.FC = () => {

    const hubConnection = new signalR.HubConnectionBuilder().withUrl("/bookstorebooks").build();
    
    hubConnection.on('EstablishConnection', (text) => {
        console.log("EstablishConnection: " + text);
    });

    hubConnection.on('sendToReact', (text) => {
        console.log("sendToReact" + text);
    });

    hubConnection.on('notifyBookstoreChanges', (text) => {
        console.log("notifyBookstoreChanges: " + text);
    });

    hubConnection.start();

    var list: string[] = [];

    interface MessageProps {
        HubConnection: signalR.HubConnection
    }

    const Messages: React.FC<MessageProps> = (messageProps) => {

        const [date, setDate] = useState<Date>();

        useEffect(() => {
            messageProps.HubConnection.on("sendToReact", message => {
                list.push(message);
                setDate(new Date());
            })
        }, []);

        return <>{list.map((message, index) => <p key={`message${index}`}>{message}</p>)}</>
    }

    const SendMessage: React.FC = () => {

        const [message, setMessage] = useState("");

        const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event && event.target) {
                setMessage(event.target.value);
            }
        }

        const messageSubmit = (event: React.MouseEvent) => {
            if (event) {
                fetch("api/Utility/SignalR", {
                    "method": "POST",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: message
                    })

                });

                setMessage("");
            }
        }

        return <><label>Enter your Message</label><input type="text" onChange={messageChange} value={message} /><button onClick={messageSubmit}>Add Message</button></>;

    }


    return <><SendMessage /><Messages HubConnection={hubConnection}></Messages></>
}

export default SignalR;


'use client';
import React, { useState, useEffect, useRef} from 'react';
import styles from './page.module.css';

// popup schedule 

// const schedule1 = [
//     { day: "Monday", title: "Wash Dishes", time: "30min" },
//     { day: "Tuesday", title: "Go Running", time: "1hr" },
//     { day: "Wednesday", title: "Study React", time: "2hr" },
//     { day: "Thursday", title: "Grocery Shopping", time: "45min" },
//     { day: "Friday", title: "Clean Room", time: "1hr" },
//     { day: "Saturday", title: "Laundry", time: "1.5hr" },
//     { day: "Sunday", title: "Meal Prep", time: "2hr" },
// ];

export default function Page() {

    type AIresponse = {
        message: string,
        schedule?: Schedule[]
    };

    type Schedule = {
        day: string;
        title: string;
        time: string;
    };

    type Message = {
        role: string;
        content: string | AIresponse;
    };
    const [schedule, setSchedule] = useState<Schedule[]>()

    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: { message: "Hello how can I help you?"}}
    ]);
    const [input, setInput] = useState("");
    const [popup, setPopup] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function fetchMessages(messages: Message[]): Promise<string | undefined> {
        try {
            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages }),
            });
            const data = await response.json();
            return data.assistantMessage;
        } catch (err) {
            console.log(err);
        }
    }

    async function openAIquery(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newMessages = [...messages, { role: "user", content: input }];
        setInput("");
        setMessages(newMessages);

        const assistantMessage = await fetchMessages(newMessages);
        if (assistantMessage) {
            const parsedMessage = JSON.parse(assistantMessage);
    
            if (assistantMessage !== undefined) {
                setMessages([...newMessages, { role: "assistant", content: parsedMessage }]);
            }
        }
    }

    const openPopup = (schedule?: Schedule[]) => {
        if (schedule) {
            setSchedule(schedule);
            setPopup(true);
        }
    };


    function isAIResponse(content: string | AIresponse): content is AIresponse {
        return typeof content !== "string" && 'message' in content;
    }
    
    console.log(messages);
    return (
        <>
        {popup && 
            <div className={styles.behindPopup} onClick={() => setPopup(false)}>
                <div className={styles.popup} onClick={e => e.stopPropagation()}>
                    <h1> Goal Name</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                            <th>Day</th>
                            <th>Habit</th>
                            <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule!.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.day}</td>
                                    <td>{row.title}</td>
                                    <td>{row.time}</td>
                                </tr>))}
                        </tbody>
                    </table>
                    <button> Add to schedule </button>
                </div>
            </div>
        }
        <div className={styles.container}>
            <h1 className={styles.title}>Chatbot</h1>
            <div className={styles.messagesContainer}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={msg.role === "user" ? styles.userMessages : styles.botMessages}
                    >
                        {msg.role === "user" && typeof msg.content === "string" && (<p>{msg.content}</p>)}

                        {msg.role === "assistant" && isAIResponse(msg.content) &&(
                            <> 
                                <p>{msg.content.message}</p>
                            {msg.content.schedule && (<button onClick={() => openPopup((msg.content as AIresponse).schedule)}>See Plan</button>)}
                        </>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} /> {/* invisible scroll anchor */}
            </div>

            <div className={styles.sendMessage}>
                <form onSubmit={openAIquery}>
                    <input
                        className={styles.input}
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className={styles.submit}>submit</button>
                </form>
            </div>
        </div>
        </>
    );
}

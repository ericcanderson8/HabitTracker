'use client';
import React, { useState, useEffect, useRef} from 'react';
import styles from './page.module.css';

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello how can I help you?" },
        { role: "user", content: "I would like to plan out a habit" }
    ]);
    const [input, setInput] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    type Message = {
        role: string;
        content: string;
    };

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
        if (assistantMessage !== undefined) {
            setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
        }
    }

    return (
        <>
        <div className={styles.popup}>

        </div>

        <div className={styles.container}>
            <h1 className={styles.title}>Chatbot</h1>
            <div className={styles.messagesContainer}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={msg.role === "user" ? styles.userMessages : styles.botMessages}
                    >
                        {msg.content}
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

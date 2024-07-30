import React, { useState } from 'react';
import './Quotes.css';

export const Quotes = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Which do you feel like today? Joy, Sadness, Disgust, Fear, Anger, or Love?', sender: 'bot' }
    ]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: 'user' }];
            setMessages(newMessages);
            generatePoem(input, newMessages);
            setInput('');
        }
    };

    const happyPoems = [
        { text: `I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;`, author: 'William Wordsworth' },
        { text: `Happiness, not in another place but this place...not for another hour, but this hour.`, author: 'Walt Whitman' }
    ];

    const sadPoems = [
        { text: `Do not stand at my grave and weep,\nI am not there; I do not sleep.\nI am a thousand winds that blow,\nI am the diamond glints on snow.`, author: 'Mary Elizabeth Frye' },
        { text: `When you are sorrowful look again in your heart, and you shall see that in truth you are weeping for that which has been your delight.`, author: 'Kahlil Gibran' }
    ];

    const lovePoems = [
        { text: `How do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height\nMy soul can reach, when feeling out of sight\nFor the ends of being and ideal grace.`, author: 'Elizabeth Barrett Browning' },
        { text: `Love is patient, love is kind. It does not envy, it does not boast, it is not proud.`, author: '1 Corinthians 13:4-5' }
    ];

    const fearPoems = [
        { text: `I must go down to the seas again, to the lonely sea and the sky,\nAnd all I ask is a tall ship and a star to steer her by,\nAnd the wheel's kick and the wind's song and the white sail's shaking,\nAnd a grey mist on the sea's face, and a grey dawn breaking.`, author: 'John Masefield' },
        { text: `Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.`, author: 'Marianne Williamson' }
    ];

    const angerPoems = [
        { text: `Anger is a wind which blows out the lamp of the mind.`, author: 'Robert Green Ingersoll' },
        { text: `In anger, we should refrain both from speech and action.`, author: 'Pythagoras' }
    ];

    const disgustPoems = [
        { text: `Disgust is often more deeply buried than anger.`, author: 'Mason Cooley' },
        { text: `There is a soul of truth in error; there is a soul of good in evil.`, author: 'Richard Whately' }
    ];

    const getRandomPoem = (poems) => {
        const randomIndex = Math.floor(Math.random() * poems.length);
        return poems[randomIndex];
    };

    const generatePoem = (input, newMessages) => {
        let selectedPoem;

        if (input.toLowerCase().includes('joy') || input.toLowerCase().includes('happy')) {
            selectedPoem = getRandomPoem(happyPoems);
        } else if (input.toLowerCase().includes('sadness') || input.toLowerCase().includes('sad')) {
            selectedPoem = getRandomPoem(sadPoems);
        } else if (input.toLowerCase().includes('love')) {
            selectedPoem = getRandomPoem(lovePoems);
        } else if (input.toLowerCase().includes('fear')) {
            selectedPoem = getRandomPoem(fearPoems);
        } else if (input.toLowerCase().includes('anger')) {
            selectedPoem = getRandomPoem(angerPoems);
        } else if (input.toLowerCase().includes('disgust')) {
            selectedPoem = getRandomPoem(disgustPoems);
        }

        if (selectedPoem) {
            const fullPoem = `${selectedPoem.author} once wrote:\n"${selectedPoem.text}"`;
            setTimeout(() => {
                setMessages([...newMessages, { text: fullPoem, sender: 'bot' }]);
            }, 1000); // Simulate a delay in response
        } else {
            setTimeout(() => {
                setMessages([...newMessages, { text: 'I hope you have a great day!', sender: 'bot' }]);
            }, 1000); // Simulate a delay in response
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="quotes-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className={`bubble ${msg.sender}`}>{msg.text}</div>
                    </div>
                ))}
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Write about your day..."
                    />
                    <button onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
};

import { useState } from "react";
import "../styles.css";

export default function SavedMeme(props) {
    // is there a way to not use state here, but put it in the parent component?
    const [newMeme, setNewMeme] = useState({
        ...props.savedMeme
    })

    function handleMemeChange(event) {
        const { name, value } = event.target
        setNewMeme(prevNewMeme => ({
            ...prevNewMeme,
            [name]: value
        }))
    }

    function handleMemeEdit() {
        props.savedMeme.topText = newMeme.topText
        props.savedMeme.bottomText = newMeme.bottomText
        props.handleEdit(props.id)
        newMeme.isEditMode = !newMeme.isEditMode

    }

    return (

        <div>
            {
                props.isToEdit ?
                    <div className="meme saved">
                        <input
                            type="text"
                            // placeholder={props.savedMeme.topText}
                            className="form-input edit-mode top"
                            name="topText"
                            value={newMeme.topText}
                            onChange={handleMemeChange}
                        />
                        <input
                            type="text"
                            // placeholder={props.savedMeme.bottomText}
                            className="form-input edit-mode bottom"
                            name="bottomText"
                            value={newMeme.bottomText}
                            onChange={handleMemeChange}
                        />
                        <img src={props.savedMeme.randomImage} alt={props.savedMeme.altText} className="meme-image" />
                        <div className="save-button-container">
                            <button onClick={handleMemeEdit} className="meme-button">Save</button>
                        </div>

                    </div> :
                    <div className="meme-plus-buttons saved">
                        <div className="meme">
                            <img src={props.savedMeme.randomImage} alt={props.savedMeme.altText} className="meme-image" />
                            <p className="meme-text meme-top-text">{props.savedMeme.topText}</p>
                            <p className="meme-text meme-bottom-text">{props.savedMeme.bottomText}</p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => props.handleEdit(props.id)} className="meme-button">Edit</button>
                            <button onClick={() => props.handleRemove(props.id)} className="meme-button">Delete</button>
                        </div>
                    </div>
            }
        </div>
    )
}

/* example from scrimba (set state of editMode in parent, then pass state to this component?):
    const [messages, setMessages] = React.useState(["a", "b"])
    return (
        <div>
            {
                messages.length === 0 ?
                <h1>You're all caught up!</h1> :
                <h1>
                    You have {messages.length} unread {messages.length > 1 ? "messages" : "message"}
                </h1>
            }
        </div>
    )
*/
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import "../styles.css";
import SavedMeme from "./SavedMeme";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/23ls.jpg",
        altText: "",
        memeId: "",
        isEditMode: false
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => setAllMemes(res.data.data.memes))
            .catch(err => console.log(err))
    }, [])

    function refreshMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const alt = allMemes[randomNumber].name
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            altText: alt
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    const [memeList, setMemeList] = useState([])

    function addMeme() {
        setMemeList(prevMemeList => [...prevMemeList, {
            ...meme,
            memeId: uuidv4()
        }])
    }

    function removeMeme(id) {
        const newMemeList = memeList.filter((meme) => meme.memeId !== id)

        setMemeList(newMemeList)
    }

    function editMeme(id) {
        setMemeList(prevMemeList => {
            return prevMemeList.map((currentMeme) => {
                console.log(currentMeme.memeId)
                return currentMeme.memeId === id ? {
                    ...currentMeme,
                    isEditMode: !currentMeme.isEditMode
                } :
                    currentMeme
            })
        })
    }

    const memeListElements = memeList.map(function (savedMeme) {
        return (
            <SavedMeme
                key={savedMeme.memeId}
                id={savedMeme.memeId}
                savedMeme={savedMeme}
                handleRemove={removeMeme}
                handleEdit={editMeme}
                isToEdit={savedMeme.isEditMode}
            />
        )
    })

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form-button"
                    onClick={refreshMemeImage}
                >
                    Refresh Meme Image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt={meme.altText} className="meme-image" />
                <h3 className="meme-text meme-top-text">{meme.topText}</h3>
                <h3 className="meme-text meme-bottom-text">{meme.bottomText}</h3>
            </div>
            <button
                onClick={addMeme}
            >
                Add Meme to List
            </button>
            <div>{memeListElements}</div>
        </main>
    )
}
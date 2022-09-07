import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.css";
import SavedMeme from "./SavedMeme";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/23ls.jpg",
        altText: "",
        memeId: ""
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
        const id = allMemes[randomNumber].id
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            altText: alt,
            memeId: id
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
        setMemeList(prevMemeList => [...prevMemeList, meme])
    }

    const memeListElements = memeList.map(function (savedMeme) {
        return (
            <SavedMeme
                key={meme.memeId}
                savedMeme={savedMeme}
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
                <h3>{meme.topText}</h3>
                <h3>{meme.bottomText}</h3>
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
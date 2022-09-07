import "../styles.css";

export default function SavedMeme(props) {
    return (
        <div>
            <p>{props.savedMeme.topText}</p>
            <p>{props.savedMeme.bottomText}</p>
            <img src={props.savedMeme.randomImage} alt={props.savedMeme.altText} />
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}
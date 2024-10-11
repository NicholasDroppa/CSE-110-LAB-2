import './App.css';
import { Note } from "./types"; // Import the Label type from the appropriate module
import { useState } from "react";

function App()
{
    const [notes, setNotes] = useState(new Array<Note>()); 
    const initialNote = {
       id: -1,
       title: "",
       content: "",
       label: "Personal",
    };

    const [favorites, setFavorites] = useState(new Array<Number>());
    const [createNote, setCreateNote] = useState(initialNote);
    const [inputTitle, setInputTitle] = useState(initialNote.title);
    const [inputContent, setInputContent] = useState(initialNote.content);
    const [inputLabel, setInputLabel] = useState(initialNote.label);
    const [noteCount, setNoteCount] = useState(notes.length + 1);

    const createNoteHandler = (event: React.FormEvent) => {
       event.preventDefault();
       console.log("title: ", createNote.title);
       console.log("content: ", createNote.content);
       setNoteCount(noteCount + 1);
       createNote.id = noteCount;
       setNotes([createNote, ...notes]);
       setCreateNote(initialNote);
       setInputTitle(initialNote.title);
       setInputContent(initialNote.content);
       setInputLabel(initialNote.label);
    };

    const [currTheme, setCurrTheme] = useState('light');
    const [theme, setTheme] = useState(['#ffffff','#222222','#ffffff']);

    return (
        <div className='app-container'
        style={{
            background: theme[0],
            color: theme[1],
            padding: "20px"
        }}>
        <form className="note-form" onSubmit={createNoteHandler}
            style={{
                padding: "0 0 40px 0"
            }}>
            <div>
                <input
                    placeholder="Note Title"
                    value={inputTitle}
                    onChange={(event) => {
                    setCreateNote({ ...createNote, title: event.target.value });
                    setInputTitle(event.target.value);}}
                    required>
                </input>
            </div>
            <div>
                <textarea
                    value={inputContent}
                    onChange={(event) => {
                    setCreateNote({ ...createNote, content: event.target.value });
                    setInputContent(event.target.value);}}
                    required>
                </textarea>
            </div>
            <div>
                <select
                    value={inputLabel}
                    onChange={(event) => {
                    setCreateNote({ ...createNote, label: event.target.value });
                    setInputLabel(event.target.value);}}
                    required>
                    <option value={"Personal"}>Personal</option>
                    <option value={"Study"}>Study</option>
                    <option value={"Work"}>Work</option>
                    <option value={"Other"}>Other</option>
                </select>
            </div>
            <div><button type="submit">Create Note</button></div>
        </form>
            <div className="notes-grid">
                {
                notes.map((note) => (
                <div
                    style={{
                        background: theme[2],
                    }}
                    key={note.id}
                    className="note-item">
                    <div className="notes-header">
                        <button
                            style={{
                                display: favorites.indexOf(note.id) === -1 ? 'inline' : 'none'
                            }}
                            onClick={() => {
                                var newArr = favorites.slice();
                                newArr.push(note.id);
                                setFavorites(newArr);}}>
                            ♡</button>
                        <button
                            style={{
                                display: favorites.indexOf(note.id) === -1 ? 'none' : 'inline'
                            }}
                            onClick={() =>
                            setFavorites(favorites.filter((id) => id !== note.id))}>
                            ♥</button>
                        <button
                            onClick={() => {
                            setNotes(notes.filter((n) => n.id !== note.id));
                            setFavorites(favorites.filter((id) => id !== note.id));}}>
                            x</button>

                    </div>
                    <h2 contentEditable="true"> {note.title} </h2>
                    <p contentEditable="true"> {note.content} </p>
                    <p contentEditable="true"> {note.label} </p>
                </div>))
                }
            </div>
            <figure className="favorites">
                <figcaption>List of favorites:</figcaption>
                <ul>
                    {
                    favorites.map((id) => (
                    <li>
                        {notes.filter((n) => n.id === id)[0].title}
                    </li>))
                    }
                </ul>
            </figure>
            <div>
                <button
                    onClick={() => {
                    setTheme(currTheme === 'light' ? ['#000000','#eeeeee','#222222'] : ['#ffffff','#222222','#ffffff']);
                    setCurrTheme(currTheme === 'light' ? 'dark' : 'light');}}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
}

export default App;
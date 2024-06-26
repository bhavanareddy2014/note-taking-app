import React, { useMemo } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./components/useLocalStorage";
import NoteList from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./components/Note";
import EditNote from "./components/EditNote";


export type RawNote = {
  id:string;

} & RawNoteData

export type RawNoteData ={
  title:string;
  markdown:string;
  tagIds: string []
}

export type Note ={
  id: string;
} & NoteData

export type NoteData ={
  title:string;
  markdown:string;
  tags: Tag[]
}

export type Tag = {
  id: string;
  label:string;
}

function App() {
  const [notes,setNotes] =  useLocalStorage<RawNote[]>("NOTES",[]);
  const [tags,setTags] =  useLocalStorage<Tag[]>("TAGS",[]);

  const notesWithTags =  useMemo (() => {
    return notes.map(note => {
      return  {...note,tags:tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[notes,tags])

  function onCreateNote({tags,...data}: NoteData){
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {...data , id :uniqueId, tagIds:tags.map((tag) => tag.id)}
      ]
    })
  }

  function onUpdateNote (id:string,{tags,...data}:NoteData) {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id){
          return   { ...note,...data ,tagIds:tags.map((tag) => tag.id)}
        }
        else {
          return note
        }
      })

    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }


  function addTag(tag:Tag){
    setTags(prev => [...prev,tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }




  return (
    <Container className="my-4">
      <Router>
        <Routes>
          <Route path="/" element={ <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />}></Route>
          <Route path="/new" element={<NewNote  notes ={notes}onSubmit={onCreateNote}  onAddTag={addTag} availableTags={tags}/>}></Route>
          <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
            <Route index element={<Note onDelete={onDeleteNote}/>}></Route>
            <Route path="edit" element={<EditNote notes ={notes} onSubmit={onUpdateNote}  onAddTag={addTag} availableTags={tags}/>}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

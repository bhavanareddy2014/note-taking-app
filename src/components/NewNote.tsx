import React from 'react'
import NoteForm from './NoteForm';
import { NoteData, RawNote, Tag } from '../App';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag:(tag:Tag) => void;
    availableTags: Tag[];
    notes:RawNote[]
}

const NewNote = ({onSubmit,onAddTag,availableTags,notes}:NewNoteProps) => {
  
  return (
    <>
    <h1 className='m-4'>New Note</h1>
      <NoteForm notes={notes} onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
     
  )
}

export default NewNote
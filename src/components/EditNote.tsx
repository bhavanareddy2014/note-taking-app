import React from 'react'
import NoteForm from './NoteForm';
import { NoteData, RawNote, Tag } from '../App';
import { useNote } from './NoteLayout';

type EditNoteProps = {
    onSubmit: (id:string, data: NoteData) => void;
    onAddTag:(tag:Tag) => void;
    availableTags: Tag[];
    notes: RawNote[]
}

const EditNote = ({onSubmit,onAddTag,availableTags,notes}:EditNoteProps) => {
   const note = useNote()
    return (
    <>
    <h1 className='m-4'>Edit Note</h1>
      <NoteForm notes={notes} title={note.title}  markdown ={note.markdown}  tags={note.tags} onSubmit={ data => onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
     
  )
}

export default EditNote
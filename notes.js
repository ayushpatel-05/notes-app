const fs = require('fs');
const chalk = require('chalk');


//ADD NOTES
const addNote = (title,body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter( (note) => note.title === title );

    //debugger;

    if(duplicateNotes.length === 0)
    {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('New note added'));
    }
    else
    {
        console.log(chalk.red('Note title taken!'));
    }
}



//REMOVE NOTES
const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter( (note) => note.title !== title );
    if(notes.length === updatedNotes.length)
    {
        console.log(chalk.red('No note found!!'));
    }
    else
    {
        saveNotes(updatedNotes);
        console.log(chalk.green('Notes Successfully removed!!'));
    }
    
}



//LIST NOTES
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.white('Your Notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
}



//READ NOTE
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(!note)
    {
        console.log(chalk.red("Note not found!"));
    }
    else
    {
        console.log(chalk.bold(note.title));
        console.log(note.body);
    }
}






//SAVE AND LOAD NOTES
const saveNotes = (notes) => {
    const jsonNotes = JSON.stringify(notes);
    fs.writeFileSync('notes.json',jsonNotes);
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const jsonNotes = dataBuffer.toString();
        return JSON.parse(jsonNotes);
    }
    catch (e) {
        return [];
    }
    
}




//EXPORT FUNCTIONS
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}
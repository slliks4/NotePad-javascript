const Home = () => {
    BuildNotes();
    return (
        `
            <div class="home-page">
                <div class="add_notes" onclick="SwitchPage({page:'manipulate'})">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
                <div class="hidden-options">
                    <button class="select-all" onclick="">select all</button>
                    <button class="delete-selected" onclick="">delete selected</button>
                </div>
                <ul class="notes-container">
                </ul>   
            </div>
        `
    );
}

function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text; // Return the original text if it's already shorter than or equal to maxLength
    } else {
      const shortened = text.substring(0, maxLength - 3) + "..."; // Use substring and add ellipsis
      return shortened;
    }
}

const BuildNotes = async() => {
    const notes = await LoadNotes();
    const notes_container = document.querySelector('.notes-container');
    if(notes){
        let html = '';
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            html += `
                <li class="note">
                    <div class="content" onclick="SwitchPage({page:'manipulate',slug:'${note.slug}', id:${note.id}})">
                        <h1 class="view_note">
                            ${note.heading}
                        </h1>
                        <p class="view_note">
                            ${shortenText(note.body, 100)} ....
                        </p>
                    </div>
                    <div class="options">
                        <i class="fa fa-trash-o delete_note" aria-hidden="true" onclick="deleteNote(event,${note.id},'${note.slug}')"></i>
                        <div class="checkbox">
                            <input type="checkbox" name="select" id="">
                        </div>
                    </div>
                </li>
            `;
        }
        notes_container.innerHTML = html;
    }
};

const deleteNote = async(event,note_id, slug) => {
    const response = await DeleteNote(note_id, slug);
    
    if(response){
        event.target.closest('.note').remove();
    }
}
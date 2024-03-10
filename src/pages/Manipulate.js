const Manipulate = () => {
    // Get slug and note id from local storage
    const slug = localStorage.getItem('slug');
    const note_id = localStorage.getItem('note_id');
    let form_method = null;

    // Determine form method
    if (slug && note_id) {
        form_method = 'PUT';
        // Load note data if available
        loadNoteData(slug, note_id);
    } else {
        form_method = 'POST';
        // Clear local storage
        localStorage.removeItem('slug');
        localStorage.removeItem('note_id');
        localStorage.removeItem('initialNoteData');
    }

    return `
        <div class="manipulate">
            <form action="" method='${form_method}' class="notes_form">
                <input type="text" name="heading" placeholder="heading">
                <input type="text" name="sub_heading" placeholder="sub_heading">
                <textarea name="body" cols="30" rows="21"></textarea>
                <div class="button">
                    <button type="button" onclick="FormLogic('${form_method}')">save</button>
                    <button type="button" onclick="SwitchPage({page:'home'})">discard</button>
                </div>
            </form>
        </div>`;
};

const loadNoteData = async (slug, note_id) => {
    const note = await GetNote(slug, note_id);

    if (note) {
        // Populate form fields with note data
        document.querySelector('.manipulate input[name="heading"]').value = note.heading;
        document.querySelector('.manipulate input[name="sub_heading"]').value = note.sub_heading;
        document.querySelector('.manipulate textarea[name="body"]').value = note.body;

        // Store the initial note data in local storage
        const initialNoteData = {
            heading: note.heading,
            sub_heading: note.sub_heading,
            body: note.body
        };
        localStorage.setItem('initialNoteData', JSON.stringify(initialNoteData));
    }
};


const FormLogic = async(form_method) => {
    try {
        // Get slug and note_id from local storage
        const slug = localStorage.getItem('slug');
        const note_id = localStorage.getItem('note_id');

        // Get the current form data
        const currentHeading = document.querySelector('.manipulate input[name="heading"]').value;
        const currentSubHeading = document.querySelector('.manipulate input[name="sub_heading"]').value;
        const currentBody = document.querySelector('.manipulate textarea[name="body"]').value;

        if (currentHeading === '') {
            throw new Error('Empty heading');
        }

        const note_data = {
            'heading': currentHeading,
            'sub_heading': currentSubHeading,
            'body': currentBody,
            'status': 'published'
        };

        let response = null;

        // Check if the form method is POST or PUT
        if (form_method === 'POST') {
            response = await CreateNote(note_data);
        } else if (form_method === 'PUT') {
            const initialNoteData = JSON.parse(localStorage.getItem('initialNoteData'));
            if (initialNoteData.heading === currentHeading && initialNoteData.sub_heading === currentSubHeading && initialNoteData.body === currentBody) {
                throw new Error('Oops No changes made');
            } else {
                response = await EditNote(note_id, slug, note_data);
            }
        } else {
            throw new Error('Invalid form method');
        }

        // Check if the response is valid
        if (response) {
            SwitchPage({page:'home'});
            localStorage.removeItem('slug');
            localStorage.removeItem('note_id');
        }
    } catch (error) {
        console.error('Error: ', error.message);
    }
};

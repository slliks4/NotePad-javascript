const CreateNote = async(note_data) => {
    const access_token = localStorage.getItem('access_token');

    const url = 'http://127.0.0.1:8000/notes/';

    try {
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(note_data)
        })

        if (response.status === 401) {
            Logout();
            throw new Error('Access Denied');
        }
        
        if (!response.ok) {
            const errorMessage = await response.text(); // Get error message from response body
            throw new Error(`Server responded with status ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Response Data:', data);

        return data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

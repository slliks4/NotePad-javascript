
const GetNote = async (slug, note_id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const main_url = await Config();
        const url = main_url+`note_detail/${note_id}/${slug}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
        });

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
};

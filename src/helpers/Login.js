const Login = async(login_data) => {
    const url = 'http://127.0.0.1:8000/token/';

    try {
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login_data)
        })

        if (!response.ok) {
            const errorMessage = await response.text(); // Get error message from response body
            throw new Error(`Server responded with status ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error : ',error.message);
    }
}

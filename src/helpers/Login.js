const Login = async(login_data) => {
    const main_url = await Config();
    const url = main_url+'token/';

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

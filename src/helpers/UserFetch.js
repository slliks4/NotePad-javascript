async function UserFetch() { 
    const main_url = await Config();
    const url = main_url+'user_detail/';
    const access_token = localStorage.getItem('access_token');
    
    try {
        const response = await fetch(url, {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            }
        });
        
        if (response.status !== 200){
            throw new Error ('could not fetch data');
        }
        
        const data = await response.json();
        
        return data;
        
    } catch (error) {
        console.error('Error : ' , error);
    }
}
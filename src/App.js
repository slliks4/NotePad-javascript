const App = () => {
    let func = null;
    const page = localStorage.getItem('currentPage');
    const access_token = localStorage.getItem('access_token');

    if(page == 'home' && access_token){
        localStorage.setItem('currentPage', 'home');
        func = Home;
    }else if(page == 'manipulate' && access_token){
        localStorage.setItem('currentPage','manipulate');
        func = Manipulate;
    }else if(page == 'authentication' && access_token){
        localStorage.setItem('currentPage', 'home');
        func = Home;
    }else if(page == 'authentication' && !access_token){
        localStorage.setItem('currentPage', 'authentication');
        func = Authentication;
        Root();
    }
    else{
        localStorage.removeItem('access_token');
        localStorage.setItem('currentPage', 'authentication');
        func = Authentication;
        Root();
    }
    document.getElementById('inherited').innerHTML = ` 
        ${func()}
    `
};
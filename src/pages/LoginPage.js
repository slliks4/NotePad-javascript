const LoginPage = () => {
    return `
        <img src="/public/static/img/logo" alt="" class="logo">
        <form action="" method = 'POST' >
            <input type="text" name="username" id="username" placeholder="Username or email"  autocomplete="off">
            <input type="password" name="password" id="password" placeholder="Password" autocomplete="off">
            <button type="button" onclick="loggingIn(event)">log in</button>
            <a href="#password reset" class="auth_btn">forgot passowrd?</a>
        </form>
        <div>
            <button type="button" class="other" onclick="SwitchPage({page:'authentication',authPage:'signup_page'})">sign up</button>
            <p> skillz </p>
        </div>
    `;
}

const loggingIn = async(event) => {
    try {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (!username ||!password) {
            throw new Error('Please enter username and password');
        }

        event.target.disabled = true;

        const login_data = {
            'username': username,
            'password': password
        }
    
        const login_response = await Login(login_data);
    
        if (login_response) {
            localStorage.setItem('access_token', login_response.access);           
            event.target.disabled = false; 
            getUser();
            SwitchPage({page:'home'});
        }else{
            throw new Error('Invalid username or password');
        }
        
    } catch (error) {
        console.error(error.message);
        event.target.disabled = false;
    }
};
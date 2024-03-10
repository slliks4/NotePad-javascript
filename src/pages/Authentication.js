const Authentication = () => {
    let func = null;
    const authPage = localStorage.getItem('authPage');
    if (authPage === "signup_page") {
        func = SignupPage;
    }else if (authPage === "login_page") {
        func = LoginPage;
    }else{
        func = LoginPage;
    }

    return `
        <div class="auth-page">
            ${func()}
        </div>
    `
}
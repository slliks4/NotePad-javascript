const SignupPage = () => {
    return `
        <img src="/public/static/img/logo" alt="" class="logo">
        <form action="" method = 'POST' >
            <input type="text" name="username" placeholder="enter your username" autocomplete="off">
            <input type="email" name="email" placeholder="enter your email" autocomplete="off">
            <input type="password" name="password" placeholder="enter your password" autocomplete="off">
            <input type="password" name="confirm_password" placeholder="confirm password" autocomplete="off">
            <button type="button" >create account</button>
        </form>
        <div>
            <button type="button" class="other" onclick="SwitchPage({page:'authentication', authPage:'login_page'})">Log in</button>
            <p> skillz </p>
        </div>
    `;
}

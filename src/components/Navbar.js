const Navbar = () => {
    if (localStorage.getItem('access_token')) {
        getUser();
    }
    
    return (
        `
        <div class="nav">
            <div class="required">
                <div>
                    <h1 onclick="SwitchPage({page:'home'})">welcome </h1>
                </div>
            </div>
            <div class="dropdown-menu">
                <ul>
                    <li onlclick="Trash()">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                        <span>Trash</span>
                    </li>
                    <li onclick="Settings()">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                        <span>Settings</span>
                    </li>
                    <li onclick="Logout()">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
        `
    );
}
const menubar = () => {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
};

const getUser = async() => {
    let img_path = ``;
    const user = await UserFetch();
    if (user){
        if (!user.profile.profile_pic){
            img_path = '/static/img/avatar.jpg';
        }else{
            img_path = `http://127.0.0.1:8000/${user.profile.profile_pic}`;
        }
        const required = document.querySelector('.required');
        required.innerHTML = `
            <div>
                <img src="${img_path}" alt="">
                <h1>welcome ${user.username}</h1>
            </div>
            <i class="fa fa-bars" aria-hidden="true" onclick="menubar()"></i>
        `;
    }else{
        Logout();
    }
};
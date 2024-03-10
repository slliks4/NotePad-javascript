const Logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    SwitchPage({page:'authentication'});
}
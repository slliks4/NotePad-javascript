const SwitchPage = ({ page, slug = null, id=null, authPage = null }) => {
    if (slug && id){
        localStorage.setItem('slug', slug);
        localStorage.setItem('note_id', id);
    }else{
        localStorage.removeItem('slug');
        localStorage.removeItem('note_id');
        localStorage.removeItem('initialNoteData');
    }
    if(authPage != null){
        localStorage.setItem('authPage', authPage);
    }else{
        localStorage.removeItem('authPage');
    }
    localStorage.setItem('currentPage', page);
    console.log(page, slug, id, authPage);
    App();
}
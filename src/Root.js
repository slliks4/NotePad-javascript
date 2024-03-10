const Root = () => {
    // Get the root element
    const root = document.getElementById("root");

    if (root) {
        let html = `
            ${Navbar()}
            <div id="inherited">
            </div>
        `;
        root.innerHTML = html;
    } else {
        console.error("Root element not found.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Code to execute after DOM content is fully loaded
    Root(); // Call the Root function to create the initial HTML structure
    App(); // Call the AppLogic function to load the appropriate page
});
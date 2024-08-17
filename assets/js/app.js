import Main from './script.js';
import Header from  './header.js';
const main = new Main();
const header = new Header();

$(document).ready(function() {
    main.init();
    header.init();
});


// scroll to top when page loads
window.onbeforeunload = function () {
    $('body').hide();
    window.scrollTo(0, 0);
};
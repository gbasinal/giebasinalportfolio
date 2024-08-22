import Main from './script.js';
import Header from  './header.js';
import Animation from './animation.js';

const main = new Main();
const header = new Header();
const animation = new Animation();

$(document).ready(function() {
    main.init();
    header.init();
    animation.init();
});


// scroll to top when page loads
window.onbeforeunload = function () {
    $('body').hide();
    window.scrollTo(0, 0);
};
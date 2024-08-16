import Main, { $ } from './script.js';
const main = new Main();

$(document).ready(function() {
    main.init();
});


// scroll to top when page loads
window.onbeforeunload = function () {
    $('body').hide();
    window.scrollTo(0, 0);
};1
import $ from 'jquery';

class Main {
    constructor() {
        console.log("Main module initialized");
    }
    init = ()=>{
        console.log("initialize here")
    }
}

export default Main;
export { $ };
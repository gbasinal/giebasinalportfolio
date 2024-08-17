class Header {
    constructor() {
        console.log("Header module initialized");
    }
    init = ()=>{
        console.log("initialize here")
        this.onMenuClick();
    }

    onMenuClick = ()=>{
        const self = this;
        $(".menu-button").on("click", (e)=>{
            console.log("onMenuClick")
            $(e.currentTarget).toggleClass("active");
            $(".menu").toggleClass("active");
        })
    }

}

export default Header;

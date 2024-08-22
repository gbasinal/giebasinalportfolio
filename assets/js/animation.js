class Animation {
    constructor() {
        console.log("Animation module initialized");
    }
    init = ()=>{
        console.log("initialize here")
        this.introAnimation();
        this.initializeSmoothScrolling();
        this.handleIntersectionObserver();
    }

    introAnimation = ()=>{
        const introTextArr = [
            "Strategic coder by day, playful game-master by night. Let's build something clever.",
            "Balancing code and creativity with a side of corny jokes – welcome to my world.",
            "Planning, coding, and a little mischief – making the web fun one project at a time.",
            "From epic game nights to epic websites, I bring strategy and fun to the digital realm.",
            "Web developer with a plan – and a few clever tricks up my sleeve.",
            "Building practical solutions with a playful twist – because work should be fun too.",
            "Master of code and games, delivering projects that are as fun as they are functional.",
            "Turning challenges into clever solutions – with a bit of fun along the way."
        ]
       
        window.onload = ()=> {
            const container = document.querySelector(".intro__text");
            const text = introTextArr[Math.floor(Math.random() * introTextArr.length)];
            const maxDelay = 1.25;
            const words = text.split(' ');
            this.fadeAnimation(words, maxDelay, container);
        }
    }

    initializeSmoothScrolling = ()=>{
        const lenis = new Lenis({
            duration : 1.5
        })        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)
    }

    handleIntersectionObserver = () =>{
        const handleVisibilityChange = (entries, observer) => {
            entries.forEach(entry => {
                const childElements = entry.target.querySelectorAll('.animate-fadein');
                console.log(entry.intersectionRatio)
                if (entry.intersectionRatio >= 0.5) {
                    childElements.forEach(child => {
                        if (!child.classList.contains('animated')) {  
                            child.classList.add('animate-faster', 'animated'); 
                            let text = child.dataset.text;
                            this.fadeAnimation(text.split(' '), 1.25, child);
                            
                        }
                    });
                } else {
                    childElements.forEach(child => {
                        console.log("leaving")
                        child.classList.remove('animate-faster');
                    });
                }
            });
        }
        

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .5
          };
        

        let observer = new IntersectionObserver(handleVisibilityChange, options);
        const targets = document.querySelectorAll('.observer');
        targets.forEach(target => observer.observe(target));
  
    }

    fadeAnimation = (words, maxDelay, container) => {
        for (let word of words) {
            let span = document.createElement('span');
            span.innerHTML = word + '&nbsp;';
            span.style.opacity = 0;
            let randomDelay = Math.random() * maxDelay;
            span.style.animationDelay = `${randomDelay}s`;
            span.classList.add('animate');
            container.appendChild(span);
        }
    }

}

export default Animation;

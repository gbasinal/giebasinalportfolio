class Animation {
    constructor() {
        console.log("Animation module initialized");
        this.lenis = null;
    }
    init = ()=>{
        console.log("initialize here")
        this.introAnimation();
        this.initializeSmoothScrolling();
        this.handleIntersectionObserver();
        this.smoothMenuNavigation();
        this.workPopUpReveal();
        this.sampleWorkRevealOnClick();
        this.closeWorkPopup();
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
            this.fadeAnimation(words, maxDelay, container, true);
        }
    }

    initializeSmoothScrolling = ()=>{
        this.lenis = new Lenis({
            duration : 1.5
        }) 
        function raf(time) {
          this.lenis.raf(time)
          requestAnimationFrame(raf.bind(this))
        }
        
        requestAnimationFrame(raf.bind(this))
    }

    handleIntersectionObserver = () =>{
        const handleVisibilityChange = (entries, observer) => {
            entries.forEach(entry => {
                const sectionChildrenElements = entry.target.querySelectorAll('.animate-fadein');
                const workIcon = entry.target.querySelector('.animate-icon');
                let section = entry.target.dataset.section;
                const menuItems = document.querySelectorAll(".menu__item")

                if (entry.intersectionRatio >= 0.5) {          
                    
                    menuItems.forEach(item => {
                        if(item.dataset.menu === section) {
                            item.classList.add('menu__item--active');
                        } else {
                            item.classList.remove('menu__item--active');
                        }
                    })

                    sectionChildrenElements.forEach(child => {
                        if (!child.classList.contains('animated')) {  
                            
                            child.classList.add('animate-faster', 'animated'); 
                            let text = child.dataset.text;
                            this.fadeAnimation(text.split(' '), 1.25, child, true);
                            if (workIcon !== null) workIcon.classList.add('icon-down--visible', 'animated'); 
                            
                            
                        }
                    });
                    
                } else {
                    sectionChildrenElements.forEach(child => {
                        // child.classList.remove('animate-faster', 'animated');
                        // let text = child.dataset.text;
                        // this.fadeAnimation(text.split(' '), 1.25, child, false);
                        // if (workIcon !== null) workIcon.classList.remove('icon-down--visible', 'animated');
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

    fadeAnimation = (words, maxDelay, container, isFadeIn) => {
        if (isFadeIn) {
            for (let word of words) {
                let span = document.createElement('span');
                span.innerHTML = word + '&nbsp;';
                span.style.opacity = 0;
                let randomDelay = Math.random() * maxDelay;
                span.style.animationDelay = `${randomDelay}s`;
                span.classList.add('animate');
                container.appendChild(span);
            }
        } else {
            console.log(container.event)
            // console.log(container.target.querySelector("span"));
            // for (let word of words) {
            //     console.log(word)
                
            //     let span = document.createElement('span');
            //     span.innerHTML = word + '&nbsp;';
            //     span.style.opacity = 0;
            //     let randomDelay = Math.random() * maxDelay;
            //     span.style.animationDelay = `${randomDelay}s`;
            //     span.classList.add('animate');
            //     container.appendChild(span);
            // }
        }

    }

    smoothMenuNavigation = () => {
        const menuItem = document.querySelectorAll('.menu__item');
        const sections = document.querySelectorAll('.section');
        const menu = document.querySelector('.menu');
        const menuBtn = document.querySelector('.menu-button');
        const filteredSections = [...sections].filter(section => section.dataset.section !== undefined);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (menu.classList.contains('active') && menuBtn.classList.contains('active')) {
                        menu.classList.remove('active');
                        menuBtn.classList.remove('active');
                    }
                }
            });
        }, { threshold: .5 }); 
    
        filteredSections.forEach(section => observer.observe(section));

        menuItem.forEach( item =>{
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const menuListParentEl = event.target.parentElement;
                const menuListEl = menuListParentEl.dataset.menu;
                let targetSectionEl =  filteredSections.filter(section => section.dataset.section === menuListEl)
                const targetSectionTop = targetSectionEl[0].offsetTop;      
                console.log(targetSectionTop, window.scrollY)          
                window.scrollTo({top: targetSectionTop, behavior:'smooth'});
            })
        })

    }

    workPopUpReveal = () => {
        const workPopupContainer = document.querySelector('.work-popups');
        const workSamplesItem = document.querySelectorAll(".work-samples__item");
        const body = document.querySelector('body');
        const menu = document.querySelector('header');
        let isModalOpen = false;

        workSamplesItem.forEach(item => {
            item.addEventListener('click', (event) => {
                const workPopupItem = event.target.closest(".work-samples__item");
                if (!workPopupItem) return;

                const workPopupItemData = workPopupItem.dataset.target;
                const workPopupContent = document.querySelector(`.work-popup__content[data-work-popup="${workPopupItemData}"]`);
                if (!workPopupContent) return;

                workPopupContent.classList.add('work-popup__content--visible');
                workPopupContainer.classList.add('work-popups--visible');
                isModalOpen =!isModalOpen;
                console.log(isModalOpen)
                body.classList.add('scroll-disabled');
                menu.classList.add('disabled-click');
                if(isModalOpen){
                    if(this.lenis){
                        this.lenis.stop();
                    }
                }else {
                    if (this.lenis) {
                        this.lenis.start();
                    }
                }

                workPopupContent.querySelectorAll(".animate-popup").forEach( item => {
                    if (!item.classList.contains('animated')) {  
                            
                        item.classList.add('animate-faster', 'animated'); 
                        let text = item.dataset.text;
                        this.fadeAnimation(text.split(' '), 1.25, item, true);          
                        
                    }
                })

            })
        })
    }

    sampleWorkRevealOnClick = () => {
        const btn = document.querySelector('.icon-down');
        const sampleWorkContainer = document.querySelector(".work-content");
        btn.addEventListener('click', () => {
            window.scrollTo({top: sampleWorkContainer.offsetTop, behavior : 'smooth'})
        });
    }

    closeWorkPopup = () => {
        const workPopupContainer = document.querySelector('.work-popups');
        const btn = document.querySelector('.close-popup');
        const workPopUpTexts = document.querySelectorAll(".animate-popup");
        const body = document.querySelector('body');
        const menu = document.querySelector('header');



        btn.addEventListener('click', () => {
            workPopupContainer.classList.remove('work-popups--visible');
            document.querySelectorAll('.work-popup__content').forEach(item => {
                item.classList.remove('work-popup__content--visible');
            });
            workPopUpTexts.forEach( item => {
                item.classList.remove('animated');
                item.classList.remove('animate-faster');
                item.innerHTML = " ";
            })
            if(this.lenis){
                this.lenis.start();
                body.classList.remove('scroll-disabled');
                menu.classList.remove('disabled-click');
            }
        });
        
    }

}

export default Animation;

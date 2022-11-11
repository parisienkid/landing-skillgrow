window.addEventListener('DOMContentLoaded', () => {

    // format-tabs

    const formatClasses = document.querySelectorAll('.format__class'),
          formatDescr = document.querySelectorAll('.format__descr');

    formatClasses.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (formatDescr[i].classList.contains('format__descr_active')) {
                formatDescr[i].classList.toggle('format__descr_active');
                formatClasses[i].querySelector('svg').style.transform = "rotate(0deg)";
                formatClasses[i].querySelector('path').style.fill = "#fff";
            } else {
                formatDescr.forEach(item => {
                    item.classList.remove('format__descr_active');
                });
                formatClasses.forEach(item => {
                    item.querySelector('svg').style.transform = "rotate(0deg)";
                    item.querySelector('path').style.fill = "#fff";
                });
                formatDescr[i].classList.toggle('format__descr_active');
                formatClasses[i].querySelector('svg').style.transform = "rotate(45deg)";
                formatClasses[i].querySelector('path').style.fill = "#4485FA";
            }
        });
    });

    //specialists-tabs 

    const specialistsMoreBtns = document.querySelectorAll('.specialists__more'),
          specialistsDescr = document.querySelectorAll('.specialists__descr');
    
    specialistsMoreBtns.forEach((item, i) => {
        item.addEventListener('click',() => {
            specialistsDescr[i].classList.toggle('specialists__descr_active');
        });
    });

    // slider

    const slider = tns({
        container: '.my-slider',
        items: 3,
        slideBy: 1,
        autoplay: false,
        nav: false,
        controlsContainer: "#custom-control",
        responsive: {
            768: {
                items: 3
            },
            576: {
                items: 2
            },
            320: {
                items: 1
            }
          }
    });

    // burger-menu

    const burger = document.querySelector('.header__burger'),
    burgerItems = burger.querySelectorAll('div'),
    mobileMenu = document.querySelector('.mobile');
  

    burger.addEventListener('click', toggleMenu);

    function toggleMenu() {
        burgerItems[2].classList.toggle('header__burger-item_third-active');
        burgerItems[1].classList.toggle('header__burger-item_second-active');
        burgerItems[0].classList.toggle('header__burger-item_first-active');
        mobileMenu.classList.toggle('mobile_active');
    }
    
    // menu-scroll

    const topMenu = document.querySelectorAll('#top-menu ul li'),
          bottomMenu = document.querySelectorAll('#bottom-menu ul li'),
          mobileMenuItems = document.querySelectorAll('.mobile ul li');
    
    const blocksForScroll = [
        document.querySelector('.specialists'),
        document.querySelector('.format'),
        document.querySelector('.price'),
        document.querySelector('.partners'),
        document.querySelector('.footer')
    ]

    function addScrollToLink(link, objectForScroll) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.documentElement.scrollWidth < 769) {
                toggleMenu();
                objectForScroll.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
            } else {
                objectForScroll.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            }
        });
    }

    topMenu.forEach((item, i) => {
        addScrollToLink(item, blocksForScroll[i]);
    });

    bottomMenu.forEach((item, i) => {
        addScrollToLink(item, blocksForScroll[i]);
    });

    mobileMenuItems.forEach((item, i) => {
        addScrollToLink(item, blocksForScroll[i]);
    }); 

    // form 

    const form = document.querySelector('form');

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let formData = new FormData(form);
        let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            form.style.display = "none";
            modal.querySelector('.title').innerHTML = 'Ваши данные успешно отправлены! Ожидайте!';
            form.reset();
        } else {
            form.style.display = "none";
            modal.querySelector('.title').innerHTML = 'Упс, что-то пошло не так! Попробуйте еще раз!';
        }
    }


    const modalBtns = document.querySelectorAll('[data-btn]'),
          overlay = document.querySelector('.overlay'),
          modal = document.querySelector('.modal'),
          closeModalBtn = modal.querySelector('.modal__close');


    openModal(modalBtns);

    overlay.addEventListener('click', () => {
        closeModal();
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    function closeModal() {
        document.body.style.overflow = "visible";
        overlay.classList.remove('overlay_active');
        modal.classList.remove('modal_active');
    }

    function openModal(btns) {
        btns.forEach(btn => {
            btn.addEventListener('click', () =>{
                modal.querySelector('.title').innerHTML = 'ЗАПИСАТЬСЯ НА ОБУЧЕНИЕ';
                form.style.display = "block";
                document.body.style.overflow = "hidden";
                overlay.classList.add('overlay_active');
                modal.classList.add('modal_active');
            });
        });
    }
    
});
(function () {
    // Бургер

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        // const burgerNavLink = e.target.closest('.nav__link')

        // if (!burgerIcon && !burgerNavLink) return
        if (!burgerIcon) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    };

    // Слайдер-галерея

    let mySwiper = new Swiper('.product__slider-main', {
        slidesPerView: 1,
        pagination: {
            el: '.product__pagination',
            type: 'bullets',
        },
    })

    const maxItems = 5;
    const sliderNavItems = document.querySelectorAll('.product__slide-nav');
    const sliderNav = document.querySelector('.product__slider-nav');

    sliderNavItems.forEach((el, index) => {
        el.setAttribute('data-index', index);

        el.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            console.log(index)
            mySwiper.slideTo(index);
        });
    });

    // Добавить в избранное

    document.addEventListener('click', fav)

    function fav(e) {
        const favIcon = e.target.closest('.favorite')

        if (!favIcon) return

        if (!favIcon.classList.contains('product__fav--active')) {
            favIcon.classList.add('product__fav--active')
        } else {
            favIcon.classList.remove('product__fav--active')
        }
    }

    // Выделение слайдов галереи

    const productSlide = document.querySelector('.product__slider-nav')

    productSlide.addEventListener('click', toggleProduct)

    function toggleProduct(e) {

        const productSlideNav = e.target.closest('.product__slide-nav')

        if (!productSlideNav) return
        e.preventDefault()
        if (productSlideNav.classList.contains('product__slide-nav--active')) return

        const activeSlide = document.querySelector('.product__slide-nav--active')

        if (activeSlide) {
            activeSlide.classList.remove('product__slide-nav--active')
        }

        productSlideNav.classList.add('product__slide-nav--active')
    }

    // Счетчик с минус-плюсом

    const counters = document.querySelectorAll('.counter__controls');

    counters.forEach(counter => {
        let up = counter.querySelector('.counter__up'),
            down = counter.querySelector('.counter__down'),
            input = counter.querySelector('.counter__input'),
            intervalId;

        let startUp = () => {
            input.stepUp() // bir kere başta artırsın
            intervalId = setInterval(() => input.stepUp(), input.dataset.speed);
        }
        let startDown = () => {
            input.stepDown() // bir kere başta azaltsın
            intervalId = setInterval(() => input.stepDown(), input.dataset.speed);
        }
        let stopInterval = () => {
            clearInterval(intervalId)
        }

        up.addEventListener('mousedown', startUp)
        up.addEventListener('mouseup', stopInterval)
        up.addEventListener('mouseleave', stopInterval)
        down.addEventListener('mousedown', startDown)
        down.addEventListener('mouseup', stopInterval)
        down.addEventListener('mouseleave', stopInterval)

        // up.addEventListener('click', () => input.stepUp())
        // down.addEventListener('click', () => input.stepDown())

    });

    // Табуляция

    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e) {

        const tabControlsItem = e.target.closest('.tab-controls__item')
        const tabControlsLink = e.target.closest('.tab-controls__link')

        if (!tabControlsItem) return
        e.preventDefault()
        if (tabControlsItem.classList.contains('tab-controls__item--active')) return

        if (!tabControlsItem) return
        e.preventDefault()
        if (tabControlsLink.classList.contains('tab-controls__link--active')) return

        console.log('asd')

        const tabContentID = tabControlsLink.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__item--active')
        const activeControls = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')

        if (activeContent) {
            activeContent.classList.remove('tab-content--show')
        }

        if (activeControl) {
            activeControl.classList.remove('tab-controls__item--active')
        }

        if (activeControls) {
            activeControls.classList.remove('tab-controls__link--active')
        }

        tabContent.classList.add('tab-content--show')
        tabControlsItem.classList.add('tab-controls__item--active')
        tabControlsLink.classList.add('tab-controls__link--active')
    }

    // Аккордеон

    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach(el => {

        // document.querySelector('.accordion-list__item--opened .accordion-list__content').style.maxHeight = document.querySelector('.accordion-list__item--opened .accordion-list__content').scrollHeight+'px';
        // Строка для того чтобы аккордион был открытым изначально.
        // Нужно ещё добавить модификатор .accordion-list__item--opened в лист.

        el.addEventListener('click', (e) => {


            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control');
            if (!accordionControl) return
            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }
            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

        })

    })
})()
(() => {
    "use strict";
    function animOnScroll() {
        const animItems = document.querySelectorAll("._anim-item");
        if (animItems.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let i = 0; i < animItems.length; i++) {
                    const animItem = animItems[i], animItemHeight = animItem.offsetHeight, animItemOffset = offset(animItem).top, animStart = 4;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_anim"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_anim");
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect();
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            }
            animOnScroll();
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (document.querySelector(".header")) {
        const burger = document.querySelector(".header__burger");
        const menu = document.querySelector(".menu");
        burger.addEventListener("click", (() => {
            menu.classList.toggle("_active");
            burger.classList.toggle("_active");
            document.body.classList.toggle("lock");
        }));
    }
    if (document.querySelector(".home")) {
        const angle = 20;
        window;
        const lerp = (start, end, amount) => (1 - amount) * start + amount * end;
        const remap = (value, oldMax, newMax) => {
            const newValue = (value + oldMax) * (newMax * 2) / (oldMax * 2) - newMax;
            return Math.min(Math.max(newValue, -newMax), newMax);
        };
        window.addEventListener("DOMContentLoaded", (event => {
            const cards = document.querySelectorAll(".volumetric-effect");
            cards.forEach((e => {
                e.addEventListener("mousemove", (event => {
                    const rect = e.getBoundingClientRect();
                    const centerX = (rect.left + rect.right) / 2;
                    const centerY = (rect.top + rect.bottom) / 2;
                    const posX = event.pageX - centerX;
                    const posY = event.pageY - centerY;
                    const x = remap(posX, rect.width / 2, angle);
                    const y = remap(posY, rect.height / 2, angle);
                    e.dataset.rotateX = x;
                    e.dataset.rotateY = -y;
                }));
                e.addEventListener("mouseout", (event => {
                    e.dataset.rotateX = 0;
                    e.dataset.rotateY = 0;
                }));
            }));
            const update = () => {
                cards.forEach((e => {
                    let currentX = parseFloat(e.style.getPropertyValue("--rotateY").slice(0, -1));
                    let currentY = parseFloat(e.style.getPropertyValue("--rotateX").slice(0, -1));
                    if (isNaN(currentX)) currentX = 0;
                    if (isNaN(currentY)) currentY = 0;
                    const x = lerp(currentX, e.dataset.rotateX, .05);
                    const y = lerp(currentY, e.dataset.rotateY, .05);
                    e.style.setProperty("--rotateY", x + "deg");
                    e.style.setProperty("--rotateX", y + "deg");
                }));
            };
            setInterval(update, 1e3 / 60);
        }));
    }
    animOnScroll();
})();
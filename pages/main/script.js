let first_card = document.getElementsByClassName("card")[0];
let cards = document.getElementsByClassName("card");
let testimonialsSlider = document.getElementById("testimonials-slider");
let testimonials_query_1000 = window.matchMedia("screen and (min-width: 1000px) and (max-width: 1200px)");
let testimonials_query_max_999 = window.matchMedia("screen and (max-width: 999px)");

function openBurger() {
    let x = document.getElementById("myTopnav");
    x.classList.toggle("responsive")
}

function read(evtType) {
    testimonialsSlider.addEventListener(evtType, function () {
        window.requestAnimationFrame(function () {

            if (testimonials_query_1000.matches) { // If media query matches
                first_card.style.marginLeft = `${(-testimonialsSlider.value * 323)}px`;
            } else {
                first_card.style.marginLeft = `${(-testimonialsSlider.value * 296)}px`;
            }
        });
    });
}

function prepareModal(card) {
    let baseModal = document.getElementsByClassName("base-modal")[0];

    let cloned = baseModal.cloneNode(true);
    let clonedCard = card.cloneNode(true);

    clonedCard.classList.remove("card");
    clonedCard.classList.add("card-modal")

    cloned.getElementsByClassName("modal-content")[0].append(clonedCard);

    let span = cloned.querySelector(".close");
    document.getElementsByTagName("body")[0].append(cloned)


    card.onclick = function () {
        if (testimonials_query_max_999.matches) {
            cloned.classList.add("show");
        }
    }
    span.onclick = function () {
        cloned.classList.remove("show");
    }

    return cloned;
}

function showModal(card, createdModal) {
    window.onclick = function (event) {
        if (event.target === createdModal) {
            createdModal.classList.remove("show");
        }
    }

}



function start() {
    if (testimonials_query_1000.matches) {
        testimonialsSlider.max = "8";
    }

    window.addEventListener("resize", (event) => {
        document.getElementsByClassName("card")[0].style = "";
        testimonialsSlider.value = "0"

        if (testimonials_query_1000.matches) {
            testimonialsSlider.max = "8";
        } else if (testimonials_query_max_999.matches) {
            // document.getElementsByClassName("card")[0].style = "";
        } else{
            testimonialsSlider.max = "7";
        }
    });

    read("mousedown");
    read("mousemove");
    read("keydown");

    Array.from(cards).forEach(card => {
        let createdModal = prepareModal(card);
        card.addEventListener("click", event => {
            showModal(card, createdModal);
        })
    });

}

start();
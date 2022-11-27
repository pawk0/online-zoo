let first_card = document.getElementsByClassName("card")[0];
let cards = document.getElementsByClassName("card");
let slider = document.getElementById("testimonials-slider");
let testimonials_query_1000 = window.matchMedia("screen and (min-width: 1000px) and (max-width: 1200px)");
let testimonials_query_max_999 = window.matchMedia("screen and (max-width: 999px)");
let carousel = document.getElementsByClassName("carousel")[0];

let animals = [
    {
        name: "Giant Pandas",
        image: "../../assets/images/panda push.png",
        description: "Native to Southwest China",
        icon: "../../assets/icons/banana-bamboo_icon.svg",
    },
    {
        name: "Eagles",
        image: "../../assets/images/eagle.png",
        description: "Native to South America",
        icon: "../../assets/icons/meet-fish_icon.svg",
    },
    {
        name: "Gorillas",
        image: "../../assets/images/gorilla.png",
        description: "Native to Congo",
        icon: "../../assets/icons/banana-bamboo_icon.svg",
    },
    {
        name: "Two-toed Sloth",
        image: "../../assets/images/sloth.png",
        description: "Mesoamerica, South America",
        icon: "../../assets/icons/banana-bamboo_icon.svg",
    },
    {
        name: "cheetahs",
        image: "../../assets/images/cheetah.png",
        description: "Native to Africa",
        icon: "../../assets/icons/meet-fish_icon.svg",
    },
    {
        name: "Penguins",
        image: "../../assets/images/penguin.png",
        description: "Native to Antarctica",
        icon: "../../assets/icons/meet-fish_icon.svg",
    },
    {
        name: "Alligators",
        image: "../../assets/images/aligator.png",
        description: "Native to Southeastern United States",
        icon: "../../assets/icons/meet-fish_icon.svg",
    },
]

function getNElementsFromArray(array, n) {
    return array.sort(() => .5 - Math.random()).slice(0, n)
}

function createCard(animal) {
    let fragment = new DocumentFragment();

    let outerDiv = document.createElement("div");
    outerDiv.classList.add("petcard");


    let image1 = document.createElement("img");


    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("pet-description");


    let descriptionInnerDiv = document.createElement("div");

    let foodIcon = document.createElement("img");


    fragment.append(outerDiv);

    outerDiv.append(image1);
    outerDiv.append(descriptionDiv);

    descriptionDiv.append(descriptionInnerDiv);
    descriptionDiv.append(foodIcon);

    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    span1.classList.add("btn");
    span2.classList.add("smallParagraph");

    descriptionInnerDiv.append(span1)
    descriptionInnerDiv.append(span2)

    image1.src = animal.image;
    foodIcon.src = animal.icon;
    span1.innerText = animal.name;
    span2.innerText = animal.description;

    return fragment
}

function createCards(animals) {
    return animals.map(createCard)
}

function openBurger() {
    let x = document.getElementById("myTopnav");
    x.classList.toggle("responsive")
}

function read(evtType) {
    slider.addEventListener(evtType, function () {
        window.requestAnimationFrame(function () {

            if (testimonials_query_1000.matches) { // If media query matches
                first_card.style.marginLeft = `${(-slider.value * 323)}px`;
            } else {
                first_card.style.marginLeft = `${(-slider.value * 296)}px`;
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

function generateNewAnimalsTable(animalsCards) {
    // let fragment = new DocumentFragment();

    let newTable = document.createElement('div')
    newTable.classList.add("carousel-table");
    newTable.classList.add("animated");
    // fragment.append(newTable);

    getNElementsFromArray(animalsCards, 6).forEach(e => {
        newTable.append(e.cloneNode(true));
    })

    return newTable;

}

function generateNewAnimalsInTable(animalsTable, animalsCards){
    animalsTable.innerHTML = '';
    let fragment = new DocumentFragment();
    getNElementsFromArray(animalsCards, 6).forEach(e => {
        fragment.append(e.cloneNode(true));
    })
    animalsTable.append(fragment);
}

function start() {
    let animalsCards = createCards(animals);

    let current = generateNewAnimalsTable(animalsCards);

    let canChange = true;
    carousel.append(current)

    document.getElementsByClassName("arrow-left")[0].addEventListener("click", event => {
        if (canChange) {
            generateNewAnimalsInTable(current, animalsCards);
        }
    })
    document.getElementsByClassName("arrow-right")[0].addEventListener("click", event => {
            if (canChange) {
                generateNewAnimalsInTable(current, animalsCards);
            }
        }
    )


    if (testimonials_query_1000.matches) {
        slider.max = "8";
    }

    window.addEventListener("resize", (event) => {
        if (testimonials_query_1000.matches) {
            slider.max = "8";
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
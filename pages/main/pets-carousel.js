const slider = document.getElementById('slider');

let sliderItems = document.getElementById('slides');

const ALLANIMALS = [
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
        description: "Native to Southeastern U. S.",
        icon: "../../assets/icons/meet-fish_icon.svg",
    },
]
const ALLANIMALSCARDS = createCards();
const buttonLeft = document.getElementById("arrow-left");
const buttonRight = document.getElementById("arrow-right");

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

function createCards() {
    return ALLANIMALS.map(createCard)
}

function generateNewAnimalsTable() {
    let newTable = document.createElement('div')
    newTable.classList.add("carousel-table");
    getNElementsFromArray(ALLANIMALSCARDS, 6).forEach(e => {
        newTable.append(e.cloneNode(true));
    })
    return newTable;

}

function generateNewAnimalsInTable(animalsTable) {
    animalsTable.innerHTML = '';
    let fragment = new DocumentFragment();
    getNElementsFromArray(ALLANIMALSCARDS, 6).forEach(e => {
        fragment.append(e.cloneNode(true));
    })
    animalsTable.append(fragment);
}

function initPetsCarousel() {
    sliderItems.append(
        generateNewAnimalsTable(),
        generateNewAnimalsTable(),
        generateNewAnimalsTable(),
    )

}

function regenerateAll(currentIndex) {
    let tables = Array.from(sliderItems.children);

    let fragment = new DocumentFragment();

    console.log(currentIndex);

    switch (currentIndex) {
        case 0:
            let a1 = generateNewAnimalsTable();
            let b1 = generateNewAnimalsTable();

            tables[0].replaceWith(a1.cloneNode(true));
            tables[3].replaceWith(a1.cloneNode(true));

            tables[2].replaceWith(b1.cloneNode(true));
            break;
        case 1:
            let a2 = generateNewAnimalsTable();
            let b2 = generateNewAnimalsTable();

            tables[0].replaceWith(a2.cloneNode(true));
            tables[3].replaceWith(a2.cloneNode(true));

            tables[1].replaceWith(b2.cloneNode(true));
            tables[4].replaceWith(b2.cloneNode(true));
            break;
        case 2:
            let a3 = generateNewAnimalsTable();
            let b3 = generateNewAnimalsTable();

            tables[1].replaceWith(a3.cloneNode(true));
            tables[4].replaceWith(a3.cloneNode(true));

            tables[2].replaceWith(b3.cloneNode(true));
            break;
    }

}

function slide(wrapper, items) {
    let posInitial,
        slides = items.children,
        slidesLength = slides.length,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);


    buttonLeft.addEventListener('click', function () {
        shiftSlide(-1)
    });
    buttonRight.addEventListener('click', function () {
        shiftSlide(1)
    });

    items.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft / slider.clientWidth * 100;
            }

            if (dir === 1) {
                items.style.left = (posInitial - 100) + "%";
                index++;
            } else if (dir === -1) {
                items.style.left = (posInitial + 100) + "%";
                index--;
            }
        }
        allowShift = false;
    }

    function checkIndex(event) {
        if (event.target !== items) {
            return
        }
        items.classList.remove('shifting');

        if (index === -1) {
            items.style.left = -(slidesLength * 100) + "%";
            index = slidesLength - 1;
        }

        if (index === slidesLength) {
            items.style.left = (-1 * 100) + "%";
            index = 0;
        }

        regenerateAll(index)
        allowShift = true;
    }
}
initPetsCarousel();
slide(slider, sliderItems);
let bar = document.getElementById("select-bar");
let amountInput = document.getElementById("amount");

amountInput.addEventListener("keydown", (event) => {
    if (amount.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
        event.preventDefault()
    }
});

function openBurger() {
    let x = document.getElementById("myTopnav");
    x.classList.toggle("responsive")
}

function operateBar() {
    let current = null;

    let selectItems = Array.from(document.getElementsByClassName("amount-select-item"));
    let amounts = new Map();

    function selectItem(price) {
        if (current != null) {
            current.classList.remove("selected");
        }

        if (amounts.has(price)) {
            current = amounts.get(price);
            current.classList.add("selected");
            amountInput.value = price;
        }


    }

    selectItems.forEach(item => {
        let price = item.getElementsByTagName("label")[0].innerText.split("$")[1]

        amounts.set(
            price,
            item
        )

        item.addEventListener("click", event => {
            selectItem(price);
        })
    })

    amountInput.addEventListener("input", event => {
        let value = event.target.value;
        selectItem(value)
    })

    selectItem("100");
}

operateBar();
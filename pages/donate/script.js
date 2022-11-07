let amount = document.querySelector('.amount');

amount.addEventListener("keydown", (event) => {
    if (amount.value.length >= 4){
        event.preventDefault()
    }
});
const checkBox = document.querySelector(".check__input"),
    checkSpan = document.querySelector(".check__span");

    
checkSpan.addEventListener('click', () => {
    if (!checkBox.hasAttribute("checked")) {
        checkBox.setAttribute("checked", '');
    } else {
        checkBox.removeAttribute("checked");   
    }
});
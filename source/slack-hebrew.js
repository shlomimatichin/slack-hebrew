document.getElementById('message-input').dir = 'auto';

function elementShouldBeRTL(element) {
    return /[א-ת]/.test(element.innerHTML);
}

function setDirections() {
    var contents = document.getElementsByClassName('message_content');
    for (var i in contents) {
        var element = contents[i];
        if (!(element.style instanceof CSSStyleDeclaration))
            continue;
        if (!elementShouldBeRTL(element))
            continue;
        element.style.textAlign = "left";
        element.style.direction = "rtl";
    }
}

function domModified() {
    document.body.removeEventListener('DOMSubtreeModified', domModified);
    setTimeout(function() { // debouce modifications
        setDirections();
        document.body.addEventListener('DOMSubtreeModified', domModified);
    }, 1000);
}

document.body.addEventListener("DOMSubtreeModified", domModified);

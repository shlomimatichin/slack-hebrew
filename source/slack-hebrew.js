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
        for (var j in element.childNodes) {
            var child = element.childNodes[j];
            if (!(child.style instanceof CSSStyleDeclaration))
                continue;
            child.style.textAlign = "initial";
            child.style.direction = "initial";
        }
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

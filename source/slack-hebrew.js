document.getElementById('message-input').dir = 'auto';

function elementShouldBeRTL(element) {
    return /[א-ת]/.test(element.innerHTML);
}

function alreadyApplied(element) {
    return element.children.length == 1 && (
            element.children[0].tagName == "P" || element.children[0].tagName == "p");
}

function applyTo(element) {
    element.innerHTML = '<p style="direction: rtl; text-align: left; margin: 0;">' + element.innerHTML + '</p>';
}

function setDirections() {
    var contents = document.getElementsByClassName('message_body');
    for (var i in contents) {
        var element = contents[i];
        if (!elementShouldBeRTL(element))
            continue;
        if (alreadyApplied(element))
            continue;
        applyTo(element);
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

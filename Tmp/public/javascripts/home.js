
var selectElement;
var skills = {};
function onSkillClick(checkbox) {
    if (!selectElement) {
        selectElement = document.getElementById('select')
    }
    var liId = "li_" + checkbox.id;
    var form = document.getElementById('form');
    if (checkbox.checked) {
        var node = document.createElement("li");
        var text = document.createTextNode(checkbox.id);
        node.appendChild(text);
        node.setAttribute("id", liId);
        selectElement.appendChild(node);
        skills[checkbox.id] = checkbox.id;
    } else {
        skills[checkbox.id] = undefined;
        selectElement.removeChild(document.getElementById(liId));
    }
    form.elements['skills'].value = JSON.stringify(skills);
}
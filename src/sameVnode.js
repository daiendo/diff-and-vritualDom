import updateChildren from './updateChildren';
export default function sameVnode(oldVnode, newVnode) {
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        if (newVnode.text != oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
        } else {
            oldVnode.elm.innerHTML = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}
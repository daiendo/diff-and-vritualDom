import vnode from './vnode';
import sameVnode from './sameVnode';
import createElement from './createElement';
import checkSameVnode from './checkSameVnode'
export default function patch(oldVnode, newVnode) {
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    if (checkSameVnode(oldVnode,newVnode)) {
        if (newVnode === oldVnode) { return; }
        sameVnode(oldVnode, newVnode);
    } else {
        let newDomNode = createElement(newVnode);
        if (oldVnode.elm.parentNode && newDomNode) {
            oldVnode.elm.parentNode.insertBefore(newDomNode, oldVnode.elm)
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}
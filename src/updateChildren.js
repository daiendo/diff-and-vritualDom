import checkSameVnode from './checkSameVnode';
import sameVnode from './sameVnode';
import createElement from './createElement';
export default function updateChildren(parentElm, oldChildren, newChildren) {
    let oldStartIndex = 0;
    let newStartIndex = 0;
    let oldEndIndex = oldChildren.length - 1;
    let newEndIndex = newChildren.length - 1;
    let oldStartVnode = oldChildren[0];
    let newStratVnode = newChildren[0];
    let oldEndVnode = oldChildren[oldEndIndex];
    let newEndVnode = newChildren[newEndIndex];
    let keyMap = null;
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (oldStartVnode == null) {
            oldStartVnode = oldChildren[++oldStartIndex];
        } else if (oldEndVnode == null) {
            oldEndVnode = oldChildren[--oldEndIndex];
        } else if (newStratVnode == null) {
            newStratVnode = newChildren[++newStartIndex];
        } else if (newEndVnode == null) {
            newEndVnode = newChildren[--newEndIndex];
        }
        if (checkSameVnode(oldStartVnode, newStratVnode)) {
            sameVnode(oldStartVnode, newStratVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStratVnode = newChildren[++newStartIndex];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            sameVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            sameVnode(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (checkSameVnode(oldEndVnode, newStratVnode)) {
            sameVnode(oldEndVnode, newStratVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStratVnode = newChildren[++newStartIndex];
        } else {
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                    const key = oldChildren[i].key;
                    if (key != undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            const newInOld = keyMap[newStratVnode.key];
            if (newInOld == undefined) {
                parentElm.insertBefore(createElement(newStratVnode), oldStartVnode.elm)
            } else {
                const eleToMove = oldChildren[newInOld];
                sameVnode(eleToMove, newStratVnode);
                oldChildren[newInOld] = undefined;
                parentElm.insertBefore(eleToMove.elm, oldStartVnode.elm)
            }
            newStratVnode = newChildren[++newStartIndex];
        }
    }
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            parentElm.insertBefore(createElement(newChildren[i]), oldChildren[oldStartIndex].elm);
        }
    } else if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parentElm.removeChild(oldChildren[i].elm)
            }
        }
    }
}
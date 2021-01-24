import vnode from './vnode'
export default function h(sel, data, c) {
    if (arguments.length != 3) {
        throw new Error('h函数必须传入3个参数！');
    }
    if (typeof c == 'string' || typeof c == 'number') {
        return vnode(sel, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        let children = [];
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('传入的数组参数有误！')
            }
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        let children = [c];
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('第3个参数不对！')
    }
}
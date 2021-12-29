export function removeEventListener(ele, eventType, fn) {
    // 判断当前浏览器是否支持removeEventListener方法
    if (ele.removeEventListener) {
        ele.removeEventListener(eventType, fn);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + eventType, fn);
    } else {
        ele['on' + eventType] = null;
    }
};
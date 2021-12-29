export default function throttle(func, delay=1000) {
    let timer = null;
    return function(e) {
        if (!timer) {
            timer = setTimeout(() => {
                func(e);
                timer = null;
            }, delay);
        }
    };
};
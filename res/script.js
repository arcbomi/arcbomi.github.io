// 定义函数来调整 body 的 margin-bottom
function adjustMarginBottom() {
    // 获取屏幕长度
    var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // 获取 body 元素
    var body = document.body;

    // 如果 body 元素存在
    if (body) {
        // 获取 body 长度
        var bodyHeight = body.clientHeight;

        // 如果屏幕长度大于 body 长度，则调整 body 的 margin-bottom
        if (screenHeight > bodyHeight) {
            var marginValue = screenHeight - bodyHeight;
            body.style.marginBottom = marginValue + "px";
        } else {
            // 如果屏幕长度小于等于 body 长度，则将 margin-bottom 重置为 0
            body.style.marginBottom = "0";
        }
    }
}

// 当 DOMContentLoaded 事件发生时调用 adjustMarginBottom
document.addEventListener("DOMContentLoaded", function(event) {
    // 调整 margin-bottom
    adjustMarginBottom();

    // 监听 resize 事件，在屏幕长度改变时重新调整 margin-bottom
    window.addEventListener('resize', adjustMarginBottom);
});

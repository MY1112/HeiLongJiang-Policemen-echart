/**
 * Created by Administrator on 2017/7/27 0027.
 */

var req_url = "";

var intervalflag = false;
var intervalspan = 11000;

function initUrl(str) {
    req_url = str;
}

function startInterval(span) {
    intervalflag = true;
    intervalspan = span || intervalspan;
    intervalRun();
}

function stopInterval() {
    intervalflag = false;
}

function intervalRun() {
    $.ajax({
        url: req_url,
        type: "get",
        success: function (data) {
            initHtml(data);
            if (intervalflag) {
                setTimeout(intervalRun, intervalspan);
            }
        }
    });
}

function initPage(options, success) {
    options.success =  function (data) {
        if (typeof success === "function") {
            success(data);
        } else {
            initHtml(data);
        }
    }
    $.ajax(options);
}
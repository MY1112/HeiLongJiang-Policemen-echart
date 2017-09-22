/**
 * Created by uinnova on 2017/9/20.
 */

var json = {
    "type": 1,
    "config": {
        "sub1": {
            "name": '主题一',
            "subjectValue": 1,
            "width": 100,
            "secondSubject": {
                "sec1": {
                    "name": '二级一',
                    "subjectValue": 21,
                    "width": 80
                },
                "sec2": {
                    "name": '二级二',
                    "subjectValue": 22,
                    "width": 80
                }
            }
        },
        "sub2": {
            "name": '主题二',
            "subjectValue": 2,
            "width": 100,
            "secondSubject": {
                "sec1": {
                    "name": '2二级一',
                    "subjectValue": 21,
                    "width": 80
                },
                "sec2": {
                    "name": '2二级二',
                    "subjectValue": 22,
                    "width": 80
                }
            }
        },
        "sub3": {
            "name": '主题三',
            "subjectValue": 3,
            "width": 100,
            "secondSubject": {}
        },
        "sub4": {
            "name": '主题四',
            "subjectValue": 4,
            "width": 100,
            "secondSubject": {}
        }
    }
};

var domList = [];
var secondDomList = [];
var secondButtonList = {};

function initHtml(obj) {
    var json = null;
    json = obj.config;


    var i = 0;
    var firstNum = Object.getOwnPropertyNames(json).length;
    var firstWidth = $("#firstSubject").width();
    var html = '';
    var html2 = '';
    for(var item in json) {
        secondButtonList[json[item].subjectValue] = json[item].secondSubject;
        if(i == 0) {
            html += '<a id="'+json[item].subjectValue+'" class="top-button active" onclick="runPage('+json[item].subjectValue+')" style="width:'+json[item].width+'px">'+json[item].name+'</a>'
        }else {
            html2 += '<a id="'+json[item].subjectValue+'" class="top-button" onclick="runPage('+json[item].subjectValue+')" style="width:'+json[item].width+'px">'+json[item].name+'</a>'
        }
        i++;
    }
    $("#firstSubject").append(html+html2);
    for(var info in json) {
        domList.push(document.getElementById(json[info].subjectValue));
    }
}

function runPage(e) {
    $('#horizontal').empty();
    var html = '';
    var idArr = [];
    for(var i = 0; i < domList.length; i ++){
        if(domList[i].id == e){
            domList[i].className = "top-button active";
            var json = secondButtonList[e];
            for(var item in json) {
//                    html += '<a id="' + json[item].subjectValue + '" class="top-button" onclick="updatePage(' + json[item].subjectValue + ')" style="width:' + json[item].width + 'px">' + json[item].name + '</a>'
                html += '<a id="' + json[item].subjectValue + '" style="width:' + json[item].width + 'px" onclick="updatePage('+json[item].subjectValue+')">'+
                    '<div id="img'+json[item].subjectValue+'" class="img top-button" style="width:' + json[item].width + 'px;margin-left:0">' + json[item].name + '</div>'+
                    '<div id="info'+json[item].subjectValue+'" class="info" style="width:' + json[item].width + 'px"></div>'+
                    '</a>'
            }
            $('#horizontal').append(html);
            for(var info in json) {
                idArr.push(json[info].subjectValue);
                secondDomList.push(document.getElementById("img"+json[info].subjectValue));
            }
            rotateAnimation(idArr);
            callbackFirst(e);
        }else{
            domList[i].className = "top-button";
        }
    }
}

function updatePage(e) {
    for(var i = 0; i < secondDomList.length; i ++){
        if(secondDomList[i].id.slice(3) == e){
            secondDomList[i].className = "img top-button active";
            callbackSecond(e)
        }else{
            secondDomList[i].className = "img top-button";
        }

    }
}

function rotateAnimation(idArr) {
    var turn = function (target, time, opts) {
        var i = 0;
        function updateAnimate() {
            if(i<idArr.length) {
                $('#' + idArr[i]).find('#img'+idArr[i]).stop().animate(opts[0], time, function () {
                    $('#img'+idArr[i]).hide();
                    $('#info'+idArr[i]).show();
                    $('#info'+idArr[i]).animate(opts[1], time, function () {
                        $('#info'+idArr[i]).animate(opts[0], time, function () {
                            $('#info'+idArr[i]).hide();
                            $('#img'+idArr[i]).show();
                            $('#img'+idArr[i]).animate(opts[1], time, function () {
                                i++;
                                updateAnimate();
                            });
                        });
                    });
                });
            }else{
                return;
            }
        }
        updateAnimate();
    };
    var horizontalOpts = [{'height': 0, 'top': '20px'}, {'height': '40px', 'top': 0}];
    turn($('#horizontal'), 50, horizontalOpts);
}



    initHtml(json);

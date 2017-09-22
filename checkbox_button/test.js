var json = {
        "data": {
            "title": "场所类型",
            "checkBoxLi": ["旅店","网吧"]
        }
    };

    var butIndex = {tab2buttonIndex: 4};

        function initHtml(obj) {
            if(obj == null && obj == undefined) {
                return false;
            }
            var json = null;
            if(typeof obj == "string") {
                json = JSON.parse(obj).data;
            } else {
                json = obj.data;
            }

            var $title = $("#siteType");
            var html = '';
            for(var i = 0; i < json.checkBoxLi.length; i++) {
                html += '<li id='+i+' onclick="clickLi(this)"><span class="check 未选"></span><span class="text">'+json.checkBoxLi[i]+'</span></li>';
            }

            $("#typeLi").append(html);
            $title.text(json.title);

            function changeLiStatue(type) {
                if(type == 'title'){
                    for(var i = 0; i < json.checkBoxLi.length; i++) {
                        $("#" + i).find(".check").removeClass("选中").addClass("未选");
                    }
                }else{
                    $("#" + type).find(".check").removeClass("未选").addClass("选中");
                    for(var i = 0; i < json.checkBoxLi.length; i++) {
                        if(i != type){
                            $("#" + i).find(".check").removeClass("选中").addClass("未选");
                        }
                    }
                }
            }

            $title.click(function () {
                butIndex.lineA = 4;
                changeLiStatue('title');
                cb();
            });

            for(var j = 0; j < json.checkBoxLi.length; j++) {
                function test(x) {
                    $("#"+ x).click(function () {
                        event.stopPropagation();
                        butIndex.tab2buttonIndex = x+1;
                        changeLiStatue(x);
                        cb();
                    });
                }
                test(j);
            }
        }

        function cb() {
            callback(butIndex.tab2buttonIndex);
        }


        //initHtml(json);
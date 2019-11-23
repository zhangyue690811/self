/*index begin*/
$(function(){
    /*获取元素*/
    var $ele = {
        "header" : $("#header"),
        'headerLi' : $("#header nav ul li"),
        'headerA' : $("#header nav ul li a"),
        'main' : $('.main'),
        'swiperSlide':$('#works .swiper-container .swiper-slide'),
        "index" :0,
        "starttime" :0,
        "endtime" :0,
        "bol":true
    };
    $ele.index = sessionStorage.getItem('change') ? sessionStorage.getItem('change') : 0;
    changeLi($ele.index);
    // winScroll();
    /*nav中a的点击事件*/
    $ele.headerA
        .click(function(){
            $ele.index = $(this).parent().index();
            changeLi($ele.index);
            winScroll();
            return false;
        });

    $(window)
    /*滑轮滚动*/
        .on('mousewheel',function(e,dir) {
            $ele.starttime = new Date().getTime(); //记录翻屏的初始时间
            if ($ele.bol && ($ele.endtime - $ele.starttime) <= -500) {
                if (dir < 0) {
                    $ele.index++;
                    if ($ele.index > $ele.headerLi.length - 1) {
                        $ele.index = 0;
                    }
                    console.log($ele.index);
                }else if(dir > 0){
                    $ele.index--;
                    if ($ele.index < 0) {
                        $ele.index = $ele.headerLi.length - 1;
                    }
                }else{
                    return ;
                }
                changeLi($ele.index);
                winScroll(function() {
                    $ele.boo = true;
                });
                $ele.boo = false;
                $ele.endtime = new Date().getTime();    //记录翻屏的结束时间
            }
        });
     /*鼠标按下抬起*/
    $ele.main.on('mousedown',function(e){
        this.y1 = e.clientY;
        console.log('按下');
    }).on('mouseup',function(e){
        console.log('抬起');
        this.y2 = e.clientY;
        if (this.y2 - this.y1 > 100) {
            console.log('向下');
            $ele.index++;
            if ($ele.index > $ele.headerLi.length - 1) {
                $ele.index = 0;
            }
            changeLi($ele.index);
        } else if (this.y1 - this.y2 > 100) {
            console.log('向上');
            $ele.index--;
            if ($ele.index < 0) {
                $ele.index = $ele.headerLi.length - 1;
            }
            changeLi($ele.index);
        }
        winScroll();
    });
    /*scroll*/
    function winScroll(fn){
        var host = $ele.headerA.eq($ele.index).attr('href');
        if($(host)){
            $('html,body').stop().animate({
                scrollTop: $(host).offset().top //距离文档的top值
            },500,fn);
            return false;
        }
    }
    /*li active样式的改变*/
    function changeLi(index){
        /*设置本地存储*/
        sessionStorage.setItem('change', index);
        $ele.headerLi.eq(index).addClass('active')
            .siblings().removeAttr('class');
    }
    /*禁止图片拖拽*/
    $('img').on('mousedown',function (e) {
        e.preventDefault()
    });
});
/*index end*/
/*banner begin*/
$(function () {
    var timer = 0;
    var oLi = $('.homePage li');
    var i = oLi.index();
    clearInterval(timer);
    let startMove = () =>{
        timer = setInterval(function () {
            i >= oLi.length ? i = 0 : i++;
            oLi.eq(i).fadeIn().siblings().fadeOut();
        },5000)
    };
    startMove();
});
/*banner end*/
/*skill begin*/
$(function(){
    if(sessionStorage.getItem('change') === '2'){
        animate();
    }else{
        $(window).scroll(function () {
            if ($(window).scrollTop() == $('#skill').offset().top) {
                animate();
            }
        })
    }
    function animate() {
        var canvas = $('.myCanvas'), //获取canvas元素
            span = $('.rowItem span'), //获取span标签
            spanText = [];
        for (var j = 0; j < span.length; j++) {
            spanText.push(360 * (parseFloat($(span[j]).html()) / 100) - 90);
            /*
                因为是从圆心的最右面开始的,所以要减去90
                360 * ( 90 / 100 ) - 90
            */
        }
        for (var i = 0; i < canvas.length; i++) {
            var canvasWidth = $(canvas[i]).width();  // 获取canvas的宽度
            circle(canvas[i], canvasWidth, spanText[i]);
        }
        function circle(obj, canvasWidth, text) {
            var ctx = obj.getContext('2d');
            /*灰色外圆绘制*/
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#aaa';
            /*arc(圆心x轴坐标,圆心y轴坐标,圆的半径,开始弧度,结束弧度)*/
            ctx.arc(canvasWidth / 2, canvasWidth / 2, canvasWidth / 2.5, 0 * Math.PI / 180, 360 * Math.PI / 180);
            ctx.stroke();
            /*绘制里面的黑圆*/
            var start = -90;
            var end = -90;
            /*(start,end) 开始绘制的点*/
            var t = setInterval(function () {
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasWidth / 2, canvasWidth / 2.5, start * Math.PI / 180, end * Math.PI / 180);
                end += 5;
                ctx.strokeStyle = '#0c0c0c';
                ctx.stroke();
                if (end >= text) {
                    clearInterval(t);
                    t = null;
                }
            }, 20)
        }
    }
});
/*skill end*/
/*production 轮播图*/
$(function () {
    //3d
    $('#slide3d').slideCarsousel({slideType: '3d', indicatorEvent: 'mouseover'});
});


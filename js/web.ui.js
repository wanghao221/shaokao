/**
 * Created by lizhenya on 2017/5/5.
 */

web.bind(window, 'scroll', function(){

    // 向下滚动到当前窗口40%，header加样式hrink-nav
    var scrollTop  = window.pageYOffset || document.scrollTop,
        winH = window.innerHeight || document.body.clientHeight;
    var header = document.getElementById('header');

    if (scrollTop > winH * 0.4) {
        if (!web.hasClass(header, 'shrink-nav')) web.addClass(header, 'shrink-nav');
    } else {
        web.removeClass(header, 'shrink-nav');
    }

});

if (web.adtabs) web.adtabs({box$:'section.carousel'});
if (web.subnav) web.subnav({box$:'nav.sub-nav'});

// 工作机会
var $jts = document.querySelectorAll('.jobs-title'),
    $jcs = document.querySelectorAll('.jobs-content');
for (var i=0; i<$jts.length; i++) {
    $jcs[i].style.display = 'block';

    web.bind($jts[i], 'click', function(event, data){
        if ($jcs[data].style.display == 'none') {

            for (var j=0;j<$jcs.length;j++) {
                if ($jcs[j].style.display != 'none' && j<data) { // 判断上一个显示内容是否在当前点击内容之前
                    var scrollTop  = window.pageYOffset || document.scrollTop,
                        offset = web.offset($jcs[j]);

                    scrollTop -= offset.height;
                    if (scrollTop > 0) scrollTo(0, scrollTop);
                }

                $jcs[j].style.display = data==j ? 'block' : 'none';
            }

        } else { //点击当前切换显示展开或收起
            $jcs[data].style.display = 'none';
        }
    }, i);
}


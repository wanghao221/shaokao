/**
 * Created by lizhenya on 2017/5/5.
 */
web.subnav = function(options) {
    var op = web.extend({box$:'nav.sub-nav', menus$:'li', activeClass:'active', headerH:115}, options);

    var body = document.body,
        jBoxs = document.querySelectorAll(op.box$),
        targetsTop = [];

    if (jBoxs) {
        for (var boxIndex=0; boxIndex<jBoxs.length; boxIndex++) {
            var jBox = jBoxs[boxIndex],
                jMenus = jBox.querySelectorAll(op.menus$);

            for (var index=0; index<jMenus.length; index++) {
                var jMenu = jMenus[index], jLink = jMenu.querySelector('a');

                web.bind(jLink, 'click', function(event, index){
                    var target$ = this.getAttribute('href'),
                        jTarget = document.querySelector(target$),
                        offset = web.offset(jTarget);

                    scrollTo(0, offset.top - op.headerH);
                    //activeMenu(jMenus, index); //使用window scroll统一控制

                    return false;
                }, index);
            }

            // 向下滚动窗口调整二级菜单active状态
            web.bind(window, 'scroll', function(){
                var scrollTop  = window.pageYOffset || document.scrollTop;
                if (!targetsTop.length) {
                    for (var i=0; i<jMenus.length; i++) {
                        var target$ = jMenus[i].querySelector('a').getAttribute('href'),
                            jTarget = document.querySelector(target$),
                            offset = web.offset(jTarget);

                        targetsTop.push(offset.top);
                    }
                }

                var minAbsIndex= 0, minAbs = 1000000;
                for (var i=0; i<targetsTop.length; i++) {
                    var targetTop = targetsTop[i] - op.headerH,
                        abs = Math.abs(targetTop-scrollTop);
                    if (minAbs > abs) {
                        minAbs = abs;
                        minAbsIndex = i;
                    }
                }

                activeMenu(jMenus, minAbsIndex);

                // 移动到 二级菜单时body添加 样式 sticky-nav, 固定到头上
                var winH = window.innerHeight || document.body.clientHeight;
                if (scrollTop > jBox.offsetTop-120 && scrollTop > winH-115) {
                    if (!web.hasClass(body, 'sticky-nav')) web.addClass(body, 'sticky-nav');
                } else {
                    web.removeClass(body, 'sticky-nav');
                }

            });
        }

    }

    function activeMenu(jMenus, index){
        for (var i=0; i<jMenus.length; i++) {
            web.removeClass(jMenus[i], op.activeClass);
        }
        web.addClass(jMenus[index], op.activeClass);
    }
}

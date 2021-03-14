web.adtabs = function(options) {
    var op = web.extend({box$:'section.carousel', nums$:'.carousel-indicators > li', items$:'.item', activeClass:'active', iCurIndex:0}, options);

    var jBoxs = document.querySelectorAll(op.box$);

    if (jBoxs) {
        for (var boxIndex=0; boxIndex<jBoxs.length; boxIndex++) {
            var jBox = jBoxs[boxIndex],
                jNums = jBox.querySelectorAll(op.nums$),
                jItems = jBox.querySelectorAll(op.items$),
                lockPlay = false;

            function switchTab(inIndex){
                op.iCurIndex = inIndex;

                for (var i=0;i<jNums.length;i++){
                    if (i == inIndex) {
                        web.addClass(jNums[i], op.activeClass);
                        jItems[i].style.display = '';
                    } else {
                        web.removeClass(jNums[i], op.activeClass);
                        jItems[i].style.display = 'none';
                    }
                }

            }
            function play(){
                op.nIntervId = setInterval(function(){
                    if (!lockPlay) op.iCurIndex < jNums.length - 1 ? switchTab(op.iCurIndex+1) : switchTab(0);
                }, 4000);
            }

            for (var i=0;i<jNums.length;i++){
                web.bind(jNums[i], 'click', function(event, data){

                    switchTab(data);
                }, i);


                web.bind(jNums[i], 'mouseover', function(){lockPlay = true;});
                web.bind(jNums[i], 'mouseout', function(){lockPlay = false;});
            }

            play();
        }

    }
}
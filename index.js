/*
* Application state
*/
    const state = {
        items: [],
        count: 0,
        isDone: false
    }

    function drawLine(box) {
        let connector = box.children[0];
        let item = document.querySelector('.item');
        let text = document.querySelector('.item .text');

        let distanceBetweenItemAndLine = (item.offsetWidth / 4) - text.offsetWidth;

        if (box.classList.contains('left')) {
        connector.style.left = text.offsetWidth  + 258 + 'px';
        } else {
        connector.style.right = text.offsetWidth + 258 + 'px';
        }

        // Adds line after transition time specified in CSS is done
        setTimeout(function () { connector.style.width = distanceBetweenItemAndLine + 100 + 'px'; }, 600);
    }

    function shouldItemAppear(item) {
        let x = item.getBoundingClientRect().top;
        if (x <= (window.innerHeight - item.offsetHeight)) {

        //Is the item a goal?
        //If so apply a different transformation
        if (item.classList.contains('skills')) {

            //Bring in the coin first
            item.children[1].style.opacity = '1'
            //Then the rest
            setTimeout(() => { item.children[2].style.opacity = '1'; }, 500);

        } 
        
        else {

            item.style.transform = 'translateX(0)'
            drawLine(item)

        }

        //Count items then call isDone
        state.count++;
        state.count == state.items.length ? state.isDone = true : null;
        }
    }

    function isScrolling() {
        //Stop firing
        if (state.isDone == true) {
        window.removeEventListener('scroll', isScrolling);
        window.cancelAnimationFrame(isScrolling);
        return;
        }

        shouldItemAppear(state.items[state.count]);
        window.requestAnimationFrame(isScrolling);
    }

    function getAllItems() {
        var scrollY = window.scrollY + window.innerHeight;
        var items = document.querySelectorAll('.roadmap .item');

        for (var x = 0; x < items.length; x++) {
        state.items.push(items[x])
        }

    }

    function checkResolution() {
        if (window.innerWidth > 850) {
        getAllItems();
        window.addEventListener('scroll', isScrolling);
        } else {
        drawLinesMobile();
        }
    }

    window.addEventListener('load', checkResolution);
    window.requestAnimationFrame(isScrolling);
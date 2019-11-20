const sizeWrapper = document.querySelector('#size'),
    btn = document.querySelector('#calc'),
    graphWrapper = document.querySelector('#graph'),
    startWrapper = document.querySelector('#start'),
    finishWrapper = document.querySelector('#finish'),
    resWrapper = document.querySelector('#res');


    btn.addEventListener('click',(e) => {
        e.preventDefault();
        let size = +sizeWrapper.value;
        let graph = graphWrapper.value.replace(/\r?\n/g, " ").split(' ');
        let start = +startWrapper.value;
        let finish = +finishWrapper.value;

        let q = [];
        q.push(start);

        let d = [];
        for(let i = 0; i < size*size; i++) {
            d[i] = Infinity;
        }
        d[start-1] = 0;

        let i = 1;
        while (q.length > 0) {
            let cur = q.shift();
            let constCur = cur;
            let count = 0;
            while(graph[cur-size-1]==1 && d[cur-size-1] == Infinity ) {
                q.push(cur-size);
                d[cur-size-1] = d[constCur-1] + 1;
                cur -= size;
                count++;
                if(cur-size < 1) {
                    break;
                }
            }
            cur += size*count;
            count = 0;
            while(graph[cur+size-1]==1 && d[cur+size-1] == Infinity ) {
                q.push(cur+size);
                d[cur+size-1] = d[constCur-1] + 1;
                cur += size;
                count++;
                if(cur+size > size*size) {
                    break;
                }
            }
            cur -= size*count;
            count = 0;
            while(graph[cur-1-1]==1 && d[cur-1-1] == Infinity ) {
                q.push(cur-1);
                d[cur-1-1] = d[constCur-1] + 1;
                cur -= 1;
                count++;
                if((cur)%size == 1) {
                    break;
                }
            }
            cur += count;
            count = 0;
            while(graph[cur+1-1]==1 && d[cur+1-1] == Infinity ) {
                q.push(cur+1);
                d[cur+1-1] = d[constCur-1] + 1;
                cur += 1;
                count++;
                if((cur)%size == 0 || (cur)%size == 1) {
                    break;
                }
            }
            cur -= count;
        }
        if (d[finish-1] ==Infinity) {
        } else {
            console.log(`answear = ${d[finish-1]}`);
        }

        resWrapper.value = d[finish - 1];
        
    });


    // content.replace(/\r?\n/g, "")


function longShadow() {
    let element = document.querySelector('.window');
    let shadow ="0px 0px #c0392b";
    for(let i = 0; i <900; i++) {
        shadow=`${shadow}, ${i*1.3}px ${i}px #c0392b`;
    }
    element.style.boxShadow = shadow;
}

longShadow();
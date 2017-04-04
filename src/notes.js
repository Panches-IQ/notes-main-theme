;(function(window) {
    let drawNotes = function(jsonInput) {
        let arrNotes = JSON.parse(jsonInput);
            vxyNotes = [],
            posNotes = {"do": 24, "re": 20, "mi": 18, "fa": 15, "sol": 12, "la": 9, "ti": 5},
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d'),
            posY = 20,
            posX = 40,
            img = new Image(),
            notesOnScreen = 0;

        img.src = 'img/note1.png';
        document.getElementById('title').innerHTML = arrNotes['title'];      
        arrNotes = arrNotes['sequence'];  
        notesOnScreen = arrNotes.length;

        for(let i=0;i<arrNotes.length;i++) {
            vxyNotes.push([true,posX,posY+posNotes[arrNotes[i][0]]]);
            posX += arrNotes[i][1];
            if(posX > canvas.width-60) {
                posY += 60;
                posX = 40;
            };
        }
        canvas.addEventListener("mousedown", onMouseDown, false);

        function onMouseDown(event) {
            for(let i=0;i<vxyNotes.length;i++) {
                if(vxyNotes[i][1]+3<event.offsetX && vxyNotes[i][1]+27>event.offsetX && vxyNotes[i][2]+3<event.offsetY && vxyNotes[i][2]+27>event.offsetY) {
                    if(vxyNotes[i][0]){
                        vxyNotes[i][0] = false;
                        notesOnScreen--;
                        }                                        
                }
            }            
        }

        setInterval(function(){            
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let i=0;i<vxyNotes.length;i++) {
                if(vxyNotes[i][0]) {
                    ctx.drawImage(img,vxyNotes[i][1],vxyNotes[i][2]);
                }
            }
            posY = 40;
            ctx.beginPath();
            while(posY < canvas.height - 60) {
                for(let i=0; i<5;i++) {                
                    ctx.moveTo(40, posY + i*6);
                    ctx.lineTo(canvas.width-40, posY + i*6);
                }
                ctx.moveTo(40, posY);
                ctx.lineTo(40, posY+84);
                ctx.moveTo(canvas.width-40, posY);
                ctx.lineTo(canvas.width-40, posY + 84);            
                posY += 60;
                for(let i=0; i<5;i++) {                
                    ctx.moveTo(40, posY + i*6);
                    ctx.lineTo(canvas.width-40, posY + i*6);
                }
                posY += 60;
            }
            ctx.stroke();
            document.getElementById("n-count").innerHTML = "Notes on screen: " + notesOnScreen;            
        }, 33); // ~30fps
        document.getElementById("n-info").innerHTML = '<br/>Canvas size: ' + canvas.width + ' x ' + canvas.height + ' px<br/>' + 'Notes count: ' + arrNotes.length; 
    }
    window.drawNotes = drawNotes;
})(window);
function Paint(canvasId){
    var cvs =  document.getElementById(canvasId);
    var paint = this;
    this.ctx = cvs.getContext("2d");
    this.isDrawing = false;
    this.options = {};

/*
    $('body').mousedown(function(e){
        e.preventDefault();
    });
*/
    //сделать что-то с таким количеством change
    //Зона листенеров
    //[1]***************************************************************************************************************
    $('#color').change(function(){
         paint.options.color = $(this).val();
    });

    $('input[type=radio]').change(function(){
        paint.options.tool =  $(this).val();
    });

    $('#line-size').change(function(e){
        paint.options.size = $(this).val();
    });

    $('#'+canvasId).bind({
        mousedown: function (e) {
            switch(paint.options.tool) {
                case 'pen':
                    paint.startPenDrawing(e);
                    break;
                case 'fill':
                    paint.startFill(e);
                    break;
                case 'eraser':
                    paint.eraser(e);
                    break;
            }
        },
        mouseup: function(e){
            paint.stopPenDrawing();
        },
        mouseout: function(e){
            paint.stopPenDrawing();
        },
        mousemove: function(e){
            switch(paint.options.tool) {
                case 'pen':
                    paint.penDraw(e);
                    break;
                case 'fill':
                    paint.startFill(e);
                    break;
                case 'eraser':
                    paint.eraser(e);
                    break;
            }
        }
    });
    $('button').click(function(e){
        switch ($(this).val().toLowerCase()){
            case 'save':
                paint.saveOnLocal();
                break;
            case 'clean':
                paint.cleanCanvas();
                break;
            case 'open':
                $('#file-input').click();
                break;
        }
    });

    $('#file-input').change(function(e){
        paint.openFile(this);
    });
    //***************************************************************************************************************[1]
    //[2]***************************************************************************************************************
    this.init = function(){
        paint.options = {
            color: $('#color').val().toLowerCase(),
            tool: $(".tool[checked='checked']").val().toLowerCase(),
            size: $('#line-size').val()
        };
    };

    this.startPenDrawing = function(e){
        paint.isPenDrawing = true;

        paint.ctx.beginPath();
        paint.ctx.strokeStyle = paint.options.color;
        paint.ctx.lineWidth = paint.options.size;
        paint.ctx.moveTo(e.clientX - cvs.offsetLeft, e.clientY - cvs.offsetTop);
    };

    this.penDraw = function(e) {
        if (paint.isPenDrawing == true)
        {
            paint.ctx.lineTo(e.clientX - cvs.offsetLeft, e.clientY - cvs.offsetTop);
            paint.ctx.stroke();
        }
    };

    this.stopPenDrawing = function() {
        paint.isPenDrawing = false;
    };

    this.startFill = function(e){
        console.log(paint.options.tool);
    };

    this.eraser = function(e){
        paint.ctx.clearRect(e.clientX - cvs.offsetLeft, e.clientY - cvs.offsetTop, paint.options.size, paint.options.size);
    };

    this.saveOnLocal = function(){
        var link = document.createElement('a');
        link.target = "_blank";
        link.download = "img.png";
        link.href = cvs.toDataURL();
        link.click();
    };

    this.cleanCanvas = function(){
        paint.ctx.clearRect(0, 0, cvs.width, cvs.height);
    };

    this.openFile = function(input){
        var reader = new FileReader();
        if (input.files && input.files[0]) {
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                paint.ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            };
            reader.onprogress = function(){
                console.log();
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    //***************************************************************************************************************[2]
}

function Paint(canvasId){
    var cvs =  document.getElementById(canvasId);
    var paint = this;
    this.ctx = cvs.getContext("2d");
    this.isDrawing = false;
    this.options = {};

    this.init = function(){
        paint.options = {
            color: $('#color').val().toLowerCase(),
            tool: $(".tool[checked='checked']").val().toLowerCase(),
            size: $('#line-size').val()
        };
    };
/*
    $('body').mousedown(function(e){
        e.preventDefault();
    });
*/
    //сделать что-то с таким количеством change
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
            }
        },
        mouseup: function(e){
            paint.stopPenDrawing();
        },
        mouseout: function(e){
            paint.stopPenDrawing();
        },
        mousemove: function(e){
            paint.penDraw(e);
        }
    });

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
    }
}
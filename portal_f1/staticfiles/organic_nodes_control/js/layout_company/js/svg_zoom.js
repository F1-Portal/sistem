var viewBox = {x:0,y:0,w:600,h:600};
const svgSize = {w:$("#svg_layout")[0].clientHeight, h:$("#svg_layout")[0].clientWidth};
var isPanning = false;
var startPoint = {x:0,y:0};
var endPoint = {x:0,y:0};
var scale = 1;

$("#reset").click(function() {
    viewBox = {x:0,y:0,w:600,h:600};
    scale = 1;
    startPoint = {x:0,y:0};
    endPoint = {x:0,y:0};
    $("#svg_layout").attr('viewBox', viewBox.x+' '+viewBox.y+' '+viewBox.w+' '+viewBox.h);
});


$("#svg_container").on('wheel', function(e) {
    e.preventDefault();
    var w = viewBox.w;
    var h = viewBox.h;
    var mx = e.offsetX;
    var my = e.offsetY;
    var dw = w*Math.sign(e.originalEvent.deltaY)*0.05;
    var dh = h*Math.sign(e.originalEvent.deltaY)*0.05;
    var dx = dw*mx/svgSize.w;
    var dy = dh*my/svgSize.h;
    viewBox = {x:viewBox.x-dx,y:viewBox.y-dy,w:viewBox.w+dw,h:viewBox.h+dh};
    scale = svgSize.w/viewBox.w;
    
    $("#svg_layout").attr('viewBox', viewBox.x+' '+viewBox.y+' '+viewBox.w+' '+viewBox.h);
});

$("#svg_container").on('mouseleave', function(e){
    isPanning = false;
});

$("#svg_container").on('mousedown', function(e){
    isPanning = true;
    startPoint = {x:e.pageX,y:e.pageY};
});

$("#svg_container").on("mousemove", function(e) {
    if (isPanning) {
        endPoint = {x:e.pageX, y:e.pageY};
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        var movedViewBox = {x:viewBox.x + dx, y:viewBox.y + dy, w:viewBox.w, h:viewBox.h};
        
        $("#svg_layout").attr('viewBox', movedViewBox.x+' '+movedViewBox.y+' '+movedViewBox.w+' '+movedViewBox.h);
    }
    });

$("#svg_container").on("mouseup", function(e) {
    if (isPanning) {
        endPoint = {x:e.pageX, y:e.pageY};
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        viewBox = {x:viewBox.x + dx, y:viewBox.y + dy, w:viewBox.w, h:viewBox.h};
        
        $("#svg_layout").attr('viewBox', viewBox.x+' '+viewBox.y+' '+viewBox.w+' '+viewBox.h);
        
        isPanning = false;
    }
});
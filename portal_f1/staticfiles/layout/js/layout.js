var endpoint = ['api/layout/logic','api/layout/physical']
var svg = document.getElementById('svg_logic');
var svg_physical = document.getElementById('svg_physical');
const svgContainer = document.getElementById("svgContainer");
var zoom = 6000;
var move = -1000;
var down = 1600;
var unit = ['Kw','kWh'];
var link = "";
var is_menu = false;
var is_border = false;
var is_physic = true;
var id_old = ""
var check_range = document.querySelector("#flexCheckDefault");

var viewBox = {x:-2000,y:1600,w:8000,h:2700};
svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = {w:svg_physical.clientWidth,h:svg_physical.clientHeight};
var isPanning = false;
var startPoint = {x:0,y:0};
var endPoint = {x:0,y:0};;
var scale = 1;


$(document).ready(function(){
    updateLayoutPhysical();
})

// Manipulação do layout

svgContainer.onmousewheel = function(e) {
   e.preventDefault();
   var w = viewBox.w;
   var h = viewBox.h;
   var mx = e.offsetX;
   var my = e.offsetY;
   var dw = w*Math.sign(e.deltaY)*0.05;
   var dh = h*Math.sign(e.deltaY)*0.05;
   var dx = dw*mx/svgSize.w;
   var dy = dh*my/svgSize.h;
   viewBox = {x:viewBox.x-dx,y:viewBox.y-dy,w:viewBox.w+dw,h:viewBox.h+dh};
   scale = svgSize.w/viewBox.w;
    if(is_physic){
           svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }else{
           svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }
}

svgContainer.onmousedown = function(e){
   isPanning = true;
   startPoint = {x:e.x,y:e.y};
}

svgContainer.onmousemove = function(e){
   if (isPanning){
  endPoint = {x:e.x,y:e.y};
  var dx = (startPoint.x - endPoint.x)/scale;
  var dy = (startPoint.y - endPoint.y)/scale;
  var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
  if(is_physic){
            svg_physical.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        }else{
            svg.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        }

   }
}

svgContainer.onmouseup = function(e){
   if (isPanning){
        endPoint = {x:e.x,y:e.y};
        var dx = (startPoint.x - endPoint.x)/scale;
        var dy = (startPoint.y - endPoint.y)/scale;
        viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
        if(is_physic){
            svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }else{
            svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }

        isPanning = false;
    }
}

svgContainer.onmouseleave = function(e){
 isPanning = false;
}

$( "#reset" ).click(function() {
    var layout_type  = $("#layout_type").val();

    if(is_physic){
        viewBox = {x:-2000,y:1600,w:8000,h:2700};
        svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        svgSize = {w:svg_physical.clientWidth,h:svg_physical.clientHeight};

    }else{
        viewBox = {x:0,y:0,w:2300,h:1700};
        svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        svgSize = {w:svg.clientWidth,h:svg.clientHeight};
    }
});

//Filtros de visualização
$("#layout_type").click(function(){
    var layout_type  = $("#layout_type").val();
    var physical = document.getElementById('svg_physical');
    var logic = document.getElementById('svg_logic');

    if(layout_type == "physical"){
        is_physic = true;
        viewBox = {x:-1000,y:1600,w:6000,h:1700};
        physical.style.display = "block";
        logic.style.display = "none";
        document.getElementById("svg_logic").innerHTML = "";
        updateLayoutPhysical();
    }else if(layout_type == "logic"){
        is_physic = false;
        id_old = "";
        viewBox = {x:0,y:0,w:2300,h:1700};
        logic.style.display = "block";
        physical.style.display = "none";
        document.getElementById("svg_physical").innerHTML = "";
        updateLayoutLogic();
    }
});
$("#update_layout").click(function(){
        var layout_type  = $("#layout_type").val();

        if(layout_type == "physical"){
            updateLayoutPhysical();
        }else if(layout_type == "logic"){
            updateLayoutLogic();
        }
        var element = document.querySelector("#tooltip_svg");
        if(element != null){
            element.parentNode.removeChild(element);
        }
});
$("#flexCheckDefault").click(function(){
   let input_range = document.getElementById("date_range");
    if(check_range.checked){
        input_range.style.display = "block";
        document.getElementById("date_lb").innerHTML = "Data Inicial:";
    }else{
        document.getElementById("date_lb").innerHTML = "Data";
        input_range.style.display = "none";
    }
});

document.querySelector("body").addEventListener("click",()=>{
    var layout_type  = $("#layout_type").val();

    if(!is_border && id_old != "" && layout_type == "physical"){
        var rect_old = document.querySelector(id_old);
        rect_old.setAttribute("stroke-opacity",0);
        var rect_old_aux = document.querySelector(id_old+"_secound");
        rect_old_aux.setAttribute("stroke-opacity",0);
    }
    if(!is_menu){
        let ele = document.getElementById('list');
        ele.style.display = "none";
    }

    is_menu = false;
    is_border = false;
})

// Montagem do layout lógico
function updateLayoutLogic() {
      $.ajax({
        method: "GET",
        url: endpoint[0]+'?date_start='+$("#date_start").val()+'&date_end='+$("#date_end").val()+'&date_range='+check_range.checked,
        success: function(data){
            var max = Math.max.apply(Math, data.module_energy.map(e => e.value))
            document.getElementById("svg_logic").innerHTML = "";
            var x = 0;
            var y = 160;
            var string_position = [];
            var module_position = [];
            var count_module = 0;

            for(var i = 0; i < data.string_data.length; i++){
                count_module = 0;
                module_position = [];
                var coordinates = {
                    inverter_id: data.string_data[i].inverter,
                    x_position: x,
                    y_position: y,
                }
                string_position.push(coordinates);
                //Criando Strings e calculando energia
                for(var s = 0; s < data.string_energy.length; s++){
                    if(data.string_energy[s].string_id == data.string_data[i].id){
                       var qtd = data.string_energy[s].value
                       var unit = "";
                       if(qtd >= 1000){
                            unit = "kWh";
                            qtd = qtd/1000;
                            qtd = qtd.toFixed(2);
                       }else{
                            unit = "Wh";;
                       }
                       createStringPanel(x,y,qtd,data.string_data[i],unit);
                       createLine(x,(y+6));
                       createLineTop(x,y);
                    }
                }
                //Criando módulos e calculando energia
                for(var n = 0; n < data.module_data.length; n++){
                    if(data.string_data[i].id == data.module_data[n].string_id){
                        var coordinates_modules = {
                            y_position: y,
                            x_position: x,
                        }
                       const res = data.module_energy.find(t => t.id_module == data.module_data[n].id);
                       var qtd = res.value;
                       var unit = "";
                       var color = colorPicker(qtd,max);
                       if(qtd >= 1000){
                            unit = "kWh";
                            qtd = res.value/1000;
                            qtd = qtd.toFixed(2);
                       }else{
                            unit = "Wh";;
                       }
                       count_module++;

                        y = y + 70;
                        createModulePanel(x,y,qtd,data.module_data[n],unit,color);
                        module_position.push(coordinates_modules);
                    }
                }

                for(var line = 0; line < count_module; line++){
                    if( line > 0){
                        createLine(module_position[line].x_position,module_position[line].y_position);
                    }
                }
                x = x + 100;
                y = 160;
            }
            var string_position_aux = [];
            var position = 0;
            var x_inverter;
            var xp = 0;
            var xs = 0;
            var y_line = 0;
            var last_x_position_string = 0;
            var first_x_position_inverter= 0;
            var last_x_position_inverter= 0;
            var y_inverter = 70;
            //Formando e centralizando inversores
            for(var inv = 0; inv < data.inverter_data.length; inv++){
                string_position_aux = [];
                for(var sp = 0; sp < string_position.length; sp++){
                    if( data.inverter_data[inv].id == string_position[sp].inverter_id){
                        string_position_aux.push(string_position[sp]);
                    }
                }

                for(var aux = 0; aux < string_position_aux.length; aux++){
                    if(aux == 0){
                        xp = string_position_aux[aux].x_position;
                        y_line = string_position_aux[aux].y_position;
                    }else if( aux == (string_position_aux.length - 1)){
                        xs = string_position_aux[aux].x_position;
                    }
                }

                createLineHorizontal(xp,xs,y_line);
                last_x_position_string = xs;
                 var qtd = data.inverter_energy[inv].value
                 var unit = "";
                   if(qtd >= 1000){
                        unit = "kWh";
                        qtd = qtd/1000;
                        qtd = qtd.toFixed(2);
                   }else{
                        unit = "Wh";;
                   }
                if(string_position_aux.length%2 == 0 ){
                // Par
                    position = (string_position_aux.length / 2);
                    x_inverter = string_position_aux[position].x_position + 60;
                    createInverterPanel(x_inverter,qtd,unit,data.inverter_data[inv]);
                    createLineBottomInverter(x_inverter,70);
                    createLineTop((x_inverter-20),70);
                }else{
                // Ímpar
                    position = (string_position_aux.length / 2) + 0.5;
                    x_inverter = string_position_aux[position-1].x_position + 20;
                    createInverterPanel(x_inverter,qtd,unit,data.inverter_data[inv]);
                    createLineBottomInverter(x_inverter,70);
                    createLineTop((x_inverter-20),70);
                }
                if(inv == 0){
                    first_x_position_inverter = x_inverter;
                }else if( inv == (data.inverter_data.length - 1)){
                    last_x_position_inverter = x_inverter;
                }
            }
            createLineHorizontal((first_x_position_inverter-20),(last_x_position_inverter-20),y_inverter);
            createTooltipSvg();
            var qtd_energy_cpid = data.cpid_energy;
            var unit_cpid = "";
                   if(qtd_energy_cpid >= 1000){
                        unit_cpid = "kWh";
                        qtd_energy_cpid = qtd_energy_cpid/1000;
                        qtd_energy_cpid = qtd_energy_cpid.toFixed(2);
                   }else{
                        unit_cpid = "Wh";
                   }
            createCpidPanel(last_x_position_string,qtd_energy_cpid,unit_cpid);

        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }
function createStringPanel(x,y,energy,string,unit){
        var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
        var g_second = document.createElementNS('http://www.w3.org/2000/svg','g');
        var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        var p = document.createElementNS('http://www.w3.org/2000/svg','polygon');

        var rec = document.createElementNS('http://www.w3.org/2000/svg','rect');
        var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        var rect_border = document.createElementNS('http://www.w3.org/2000/svg','rect');

        var text_module = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_module_id = document.createTextNode(string.description);

        var text_module_energy = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_module_energy_quantity = document.createTextNode(energy);

        var text_unit = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_energy_unit = document.createTextNode(unit);

        var string_panel_id = "s_"+ string.id;

        g_first.setAttribute("transform",'translate('+x+','+y+') rotate(0)');
        g_first.setAttribute("onmousemove",'showTooltip('+x+','+y+',"'+string.description+'",1)');
        g_first.setAttribute("onmouseout",'hideTooltip()');
        g_first.setAttribute("onclick",'showMenu(evt,"'+string.id+'","'+string_panel_id+'",false)');
        g_first.setAttribute("id",string_panel_id);

        g_second.setAttribute("w",85);
        g_second.setAttribute("pointer-events", 'all');
        g_second.setAttribute("stroke",'none');
        g_second.setAttribute("fill", 'none');

        svg.appendChild(g_first)
        g_first.appendChild(g_second);

        rec.setAttribute("x",6);
        rec.setAttribute("y",6);
        rec.setAttribute("width",79);
        rec.setAttribute("height",52);
        rec.setAttribute("fill",'#000');

        g_second.appendChild(rec);

        polygon.setAttribute("points",'82,3 5,3 4,3 3,3 3,54 5,54 5,5 82,5');
        polygon.setAttribute("fill",'#2A7296');
        g_second.appendChild(polygon);

        p.setAttribute("points",'79,0 2,0 1,0 0,0 0,51 2,51 2,2 79,2');
        p.setAttribute("fill",'#2A7296');

        g_second.appendChild(p);

        rect.setAttribute("x",6);
        rect.setAttribute("y",6);
        rect.setAttribute("width",79);
        rect.setAttribute("height",40);
        rect.setAttribute("fill",'#2A7296');

        g_second.appendChild(rect);

        text_module.setAttribute("x",8);
        text_module.setAttribute("y",55);
        text_module.setAttribute("font-size",'10px');
        text_module.setAttribute("text-anchor",'start');
        text_module.setAttribute("fill",'#FFF');
        text_module.setAttribute("font-weight",'bold');

        text_module.appendChild(text_module_id);
        g_second.appendChild(text_module);

        text_module_energy.setAttribute("x",46);
        text_module_energy.setAttribute("y",25);
        text_module_energy.setAttribute("font-size",'10px');
        text_module_energy.setAttribute("text-anchor",'middle');
        text_module_energy.setAttribute("fill",'#FFF');
        text_module_energy.setAttribute("font-weight",'bold');

        text_module_energy.appendChild(text_module_energy_quantity);

        g_second.appendChild(text_module_energy);

        text_unit.setAttribute("x",46);
        text_unit.setAttribute("y",37);
        text_unit.setAttribute("font-size",'10px');
        text_unit.setAttribute("text-anchor",'middle');
        text_unit.setAttribute("fill",'#FFF');
        text_unit.setAttribute("font-weight",'bold');

        text_unit.appendChild(text_energy_unit);

        g_second.appendChild(text_unit);

        rect_border.setAttribute("x",7);
        rect_border.setAttribute("y",7);
        rect_border.setAttribute("width",79);
        rect_border.setAttribute("height",52);
        rect_border.setAttribute("stroke",'#f7931e');
        rect_border.setAttribute("stroke-width",4);
        rect_border.setAttribute("stroke-opacity",0);
//        rect_border.setAttribute("id",string_border_id);
        g_second.appendChild(rect_border);

}
function createModulePanel(x,y,energy,module,unit,color){
        var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
        var g_second = document.createElementNS('http://www.w3.org/2000/svg','g');

        var rect_description = document.createElementNS('http://www.w3.org/2000/svg','rect');
        var rect_board = document.createElementNS('http://www.w3.org/2000/svg','rect');
        var rect_border = document.createElementNS('http://www.w3.org/2000/svg','rect');
        const rect_cell = [];

        var element_text_description = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_module_description = document.createTextNode(module.description);

        var element_text_energy = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_module_energy = document.createTextNode(energy);

        var element_text_unit = document.createElementNS('http://www.w3.org/2000/svg','text');
        var text_module_unit = document.createTextNode(unit);
        var module_description = module.description +"("+ module.serial_number +")";
        var module_panel_id = "m_"+ module.id;

        g_first.setAttribute("transform",'translate('+x+','+y+') rotate(0)');
        g_first.setAttribute("onmousemove",'showTooltip('+x+','+y+',"'+module_description+'",0)');

        g_first.setAttribute("onmouseout",'hideTooltip()');
        g_first.setAttribute("onclick",'showMenu(evt,"'+module.id+'","'+module_panel_id+'",true)');
        g_first.setAttribute("id",module_panel_id);


        svg.appendChild(g_first)

        g_second.setAttribute("w",79);
        g_second.setAttribute("pointer-events", 'all');
        g_second.setAttribute("stroke",'none');
        g_second.setAttribute("fill", 'none');
        g_first.appendChild(g_second)


        rect_description.setAttribute("x",0);
        rect_description.setAttribute("y",0);
        rect_description.setAttribute("width",79);
        rect_description.setAttribute("height",52);
        rect_description.setAttribute("fill",'#000');

        g_second.appendChild(rect_description);

        rect_board.setAttribute("x",0);
        rect_board.setAttribute("y",0);
        rect_board.setAttribute("width",79);
        rect_board.setAttribute("height",40);
        rect_board.setAttribute("fill",'#2A7296');

        g_second.appendChild(rect_board);

        var count = 0;
        var aux_x = 0;
        var ori_x = [1,14,27,40,53,66];
        var ori_y = [1,14,27];

        for(var i = 0; i < 18 ; i++){

            if(count == 3){
                count = 0;
                aux_x = aux_x + 1;
            }

            rect_cell[i] = document.createElementNS('http://www.w3.org/2000/svg','rect');
            rect_cell[i].setAttribute("x",ori_x[aux_x]);
            rect_cell[i].setAttribute("y",ori_y[count]);
            rect_cell[i].setAttribute("width",12);
            rect_cell[i].setAttribute("height",12);
            rect_cell[i].setAttribute("fill",color);

            count++;
            g_second.appendChild(rect_cell[i]);
        }
        element_text_description.setAttribute("x",2);
        element_text_description.setAttribute("y",49);
        element_text_description.setAttribute("font-size",'10px');
        element_text_description.setAttribute("text-anchor",'start');
        element_text_description.setAttribute("fill",'#FFF');
        element_text_description.setAttribute("font-weight",'bold');

        element_text_description.appendChild(text_module_description);
        g_second.appendChild(element_text_description);

        element_text_energy.setAttribute("x",39.5);
        element_text_energy.setAttribute("y",18);
        element_text_energy.setAttribute("font-size",'10px');
        element_text_energy.setAttribute("text-anchor",'middle');
        element_text_energy.setAttribute("fill",'#FFF');
        element_text_energy.setAttribute("font-weight",'bold');

        element_text_energy.appendChild(text_module_energy);
        g_second.appendChild(element_text_energy);

        element_text_unit.setAttribute("x",39.5);
        element_text_unit.setAttribute("y",30);
        element_text_unit.setAttribute("font-size",'10px');
        element_text_unit.setAttribute("text-anchor",'middle');
        element_text_unit.setAttribute("fill",'#FFF');
        element_text_unit.setAttribute("font-weight",'bold');

        element_text_unit.appendChild(text_module_unit);
        g_second.appendChild(element_text_unit);

        rect_border.setAttribute("x",0);
        rect_border.setAttribute("y",0);
        rect_border.setAttribute("width",79);
        rect_border.setAttribute("height",52);
        rect_border.setAttribute("stroke",'#f7931e');
        rect_border.setAttribute("stroke-width",4);
        rect_border.setAttribute("stroke-opacity",0);
        g_second.appendChild(rect_border);
}
function createInverterPanel(x,energy,unit,inverter){
    var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
    var g_second = document.createElementNS('http://www.w3.org/2000/svg','g');

    var path = document.createElementNS('http://www.w3.org/2000/svg','path');

    var rect_color = document.createElementNS('http://www.w3.org/2000/svg','rect');

    var element_text_description = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_inverter_description = document.createTextNode(inverter.id);

    var element_text_energy = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_inverter_energy = document.createTextNode(energy);

    var element_text_unit = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_inverter_unit = document.createTextNode(unit);
    var inverter_description = inverter.description +" ("+ inverter.serial_number +")";

    g_first.setAttribute("transform",'translate('+x+',70)');
    g_first.setAttribute("onmousemove",'showTooltip('+x+',70,"'+inverter_description+'",0)');
    g_first.setAttribute("onmouseout",'hideTooltip()');
    svg.appendChild(g_first);

    g_second.setAttribute("w",55);
    g_second.setAttribute("pointer-events", 'all');
    g_second.setAttribute("stroke",'none');
    g_second.setAttribute("fill", 'none');

    g_first.appendChild(g_second);

    path.setAttribute("d",'M55,4.395C46.334,1.863,37.171,0.5,27.688,0.5C18.067,0.5,8.776,1.904,0,4.506V66h55V4.395z');
    path.setAttribute("fill", '#000');

    g_second.appendChild(path);

    rect_color.setAttribute("x",2);
    rect_color.setAttribute("y",7);
    rect_color.setAttribute("width",51);
    rect_color.setAttribute("height",47);
    rect_color.setAttribute("fill",'#30F291');

    g_second.appendChild(rect_color);

    element_text_description.setAttribute("x",2);
    element_text_description.setAttribute("y",63);
    element_text_description.setAttribute("font-size",'12px');
    element_text_description.setAttribute("text-anchor",'start');
    element_text_description.setAttribute("fill",'#FFF');
    element_text_description.setAttribute("font-weight",'bold');

    element_text_description.appendChild(text_inverter_description);
    g_second.appendChild(element_text_description);

    element_text_energy.setAttribute("x",27.5);
    element_text_energy.setAttribute("y",30);
    element_text_energy.setAttribute("font-size",'12px');
    element_text_energy.setAttribute("text-anchor",'middle');
    element_text_energy.setAttribute("fill",'#FFF');
    element_text_energy.setAttribute("font-weight",'bold');

    element_text_energy.appendChild(text_inverter_energy);
    g_second.appendChild(element_text_energy);

    element_text_unit.setAttribute("x",27.5);
    element_text_unit.setAttribute("y",45);
    element_text_unit.setAttribute("font-size",'12px');
    element_text_unit.setAttribute("text-anchor",'middle');
    element_text_unit.setAttribute("fill",'#FFF');
    element_text_unit.setAttribute("font-weight",'bold');

    element_text_unit.appendChild(text_inverter_unit);
    g_second.appendChild(element_text_unit);


}
function createTooltipSvg(){

    var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
    var rect_tooltip = document.createElementNS('http://www.w3.org/2000/svg','rect');
    var element_text_description = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_description = document.createTextNode(" ");

    g_first.setAttribute("transform",'translate(0,0) rotate(0)');
    g_first.setAttribute("id",'tooltip_svg');
    g_first.setAttribute("style",'display:none;');

    svg.appendChild(g_first)

    rect_tooltip.setAttribute("x",0);
    rect_tooltip.setAttribute("y",0);
    rect_tooltip.setAttribute("width",300);
    rect_tooltip.setAttribute("height",40);
    rect_tooltip.setAttribute("rx",5);
    rect_tooltip.setAttribute("fill",'#fff8dc');
    rect_tooltip.setAttribute("stroke",'#000');
    rect_tooltip.setAttribute("id",'rect_tooltip');



    g_first.appendChild(rect_tooltip)

    element_text_description.setAttribute("x",20);
    element_text_description.setAttribute("y",25);
    element_text_description.setAttribute("font-size",20);
    element_text_description.setAttribute("text-anchor",'start');
    element_text_description.setAttribute("fill",'#000000');
    element_text_description.setAttribute("font-weight",'bold');
    element_text_description.setAttribute("id",'text_tooltip');

    element_text_description.appendChild(text_description);
    g_first.appendChild(element_text_description);
}
function createCpidPanel(x,energy,unit){
    var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
    var g_second = document.createElementNS('http://www.w3.org/2000/svg','g');

    var path = document.createElementNS('http://www.w3.org/2000/svg','path');

    var rect_board = document.createElementNS('http://www.w3.org/2000/svg','rect');

    var element_text_description = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_cpid_description = document.createTextNode("SECTI USINA DO CPID");

    var element_text_energy = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_cpid_energy = document.createTextNode(energy);

    var element_text_unit = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_cpid_unit = document.createTextNode(unit);
    x = (x/2) - 60;
    g_first.setAttribute("transform",'translate('+x+',0)');
    g_first.setAttribute("onmousemove",'showTooltip('+x+',0,"SECTI USINA DO CPID",0)');
    g_first.setAttribute("onmouseout",'hideTooltip()');
    svg.appendChild(g_first);

    g_second.setAttribute("w",79);
    g_second.setAttribute("pointer-events", 'all');
    g_second.setAttribute("stroke",'none');
    g_second.setAttribute("fill", 'none');

    g_first.appendChild(g_second);



    rect_board.setAttribute("x",0);
    rect_board.setAttribute("y",0);
    rect_board.setAttribute("width",79);
    rect_board.setAttribute("height",52);
    rect_board.setAttribute("fill",'#000');

    g_second.appendChild(rect_board);

    path.setAttribute("d",'M58.395,7.08c-6.598,0.44-12.757-0.716-18.531-2.581L40,4.458c-5.776-1.865-12.489-2.741-19.088-2.3C14.104,2.611,7.844,4.339,2,7.087v31.341c5.844-2.749,12.105-4.477,18.915-4.928c6.597-0.441,13.36,0.436,19.135,2.299l-0.158,0.04c5.773,1.866,11.916,3.021,18.514,2.581c6.809-0.452,12.692-1.93,18.594-4.679V2.401C71.098,5.149,65.204,6.627,58.395,7.08z');
    path.setAttribute("fill", '#A0ACF2');

    g_second.appendChild(path);
    element_text_energy.setAttribute("x",39.5);
    element_text_energy.setAttribute("y",20);
    element_text_energy.setAttribute("font-size",'12px');
    element_text_energy.setAttribute("text-anchor",'middle');
    element_text_energy.setAttribute("fill",'#FFF');
    element_text_energy.setAttribute("font-weight",'bold');

    element_text_energy.appendChild(text_cpid_energy);
    g_second.appendChild(element_text_energy);

    element_text_unit.setAttribute("x",39.5);
    element_text_unit.setAttribute("y",32);
    element_text_unit.setAttribute("font-size",'12px');
    element_text_unit.setAttribute("text-anchor",'middle');
    element_text_unit.setAttribute("fill",'#FFF');
    element_text_unit.setAttribute("font-weight",'bold');

    element_text_unit.appendChild(text_cpid_unit);
    g_second.appendChild(element_text_unit);

    element_text_description.setAttribute("x",2);
    element_text_description.setAttribute("y",48);
    element_text_description.setAttribute("font-size",'6px');
//    element_text_description.setAttribute("text-anchor",'start');
    element_text_description.setAttribute("fill",'#FFF');
    element_text_description.setAttribute("font-weight",'bold');

    element_text_description.appendChild(text_cpid_description);
    g_second.appendChild(element_text_description);
//

//

    createLineBottomCpid(x,0);
}
function createLineHorizontal(xp,xs,y){

    if(xp != null && xs != null && y != null){
        var line =  document.createElementNS('http://www.w3.org/2000/svg','line');
        var x1 = xp + 40;
        var y1 = y - 10;
        var x2 = xs + 40;

        line.setAttribute("x1",x1);
        line.setAttribute("y1",y1);
        line.setAttribute("x2",x2);
        line.setAttribute("y2",y1);
        line.setAttribute("stroke-width",2);
        line.setAttribute("stroke",'#7089b5');

        svg.appendChild(line);
    }

}
function createLine(x,y){

    if(x != null && y != null){
        var line =  document.createElementNS('http://www.w3.org/2000/svg','line');
        var x1 = x + 40;
        var y1 = y + 52;
        var y2 = y + 70;

        line.setAttribute("x1",x1);
        line.setAttribute("y1",y1);
        line.setAttribute("x2",x1);
        line.setAttribute("y2",y2);
        line.setAttribute("stroke-width",2);
        line.setAttribute("stroke",'#7089b5');

        svg.appendChild(line);
    }

}
function createLineTop(x,y){
        if(x != null && y != null){

            var line =  document.createElementNS('http://www.w3.org/2000/svg','line');
            var x1 = x + 40;
            var y1 = y;
            var y2 = y - 10;

            line.setAttribute("x1",x1);
            line.setAttribute("y1",y);
            line.setAttribute("x2",x1);
            line.setAttribute("y2",y2);
            line.setAttribute("stroke-width",2);
            line.setAttribute("stroke",'#7089b5');

            svg.appendChild(line);
        }
}
function createLineBottomCpid(x,y){
    if(x != null && y != null){
            var line =  document.createElementNS('http://www.w3.org/2000/svg','line');
            var x1 = x + 20;
            var y1 = y + 52;
            var y2 = y + 60;

            line.setAttribute("x1",x1);
            line.setAttribute("y1",y1);
            line.setAttribute("x2",x1);
            line.setAttribute("y2",y2);
            line.setAttribute("stroke-width",2);
            line.setAttribute("stroke",'#7089b5');

            svg.appendChild(line);

    }
}
function createLineBottomInverter(x,y){
    if(x != null && y != null){
            var line =  document.createElementNS('http://www.w3.org/2000/svg','line');
            var x1 = x + 20;
            var y1 = y + 66;
            var y2 = y + 80;

            line.setAttribute("x1",x1);
            line.setAttribute("y1",y1);
            line.setAttribute("x2",x1);
            line.setAttribute("y2",y2);
            line.setAttribute("stroke-width",2);
            line.setAttribute("stroke",'#7089b5');

            svg.appendChild(line);

    }
}
function showTooltip(x,y,text,is_string) {
    var rect = document.querySelector("#rect_tooltip");

    if(is_string == 1){
        rect.setAttribute("width",150);
    }else{
        rect.setAttribute("width",300);
    }
    document.getElementById("text_tooltip").innerHTML = text;
    var tooltip = document.querySelector("#tooltip_svg");
    tooltip.style.display = "block";
    x = x + -50;
    y = y + 50;
    tooltip.setAttribute("transform",'translate('+x+','+y+') rotate(0)');
}
function hideTooltip() {
  var tooltip = document.querySelector("#tooltip_svg");
  tooltip.style.display = "none";
}

// Montagem do layout Físico
 function updateLayoutPhysical(){
    $.ajax({
        method: "GET",
        url: endpoint[1]+'?date_start='+$("#date_start").val()+'&date_end='+$("#date_end").val()+'&date_range='+check_range.checked,
        success: function(data){
            var max = Math.max.apply(Math, data.modules_energy.map(e => e.value))
            document.getElementById("svg_physical").innerHTML = "";
            for(var i = 0; i < data.modules_info.length; i++){
                const res = data.modules_energy.find(t => t.id_module == data.modules_info[i].id);
                   var qtd = res.value;
                   var unit = "";
                   var color = colorPicker(qtd,max);
                   if(qtd >= 1000){
                        unit = "kWh";
                        qtd = res.value/1000;
                        qtd = qtd.toFixed(2);
                   }else{
                        unit = "Wh";
                   }
                createPanel(data.modules_info[i],color,unit,qtd);
            }

        }
    })
 }
 function createPanel(module,color,unit,qtd){
    var g_first = document.createElementNS('http://www.w3.org/2000/svg','g');
    var g_second = document.createElementNS('http://www.w3.org/2000/svg','g');
    var rect_board = document.createElementNS('http://www.w3.org/2000/svg','rect');
    var rect_color = document.createElementNS('http://www.w3.org/2000/svg','rect');
    var rect_border = document.createElementNS('http://www.w3.org/2000/svg','rect');
    const rect_cell = [];
    var element_text_description = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_module_description = document.createTextNode(module.description.replace("Módulo ",""));

    var element_text_energy = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_module_energy = document.createTextNode(qtd);

    var element_text_unit = document.createElementNS('http://www.w3.org/2000/svg','text');
    var text_module_unit = document.createTextNode(unit);

    var module_id_physi = "mphysi_"+ module.id;
    var rect_border_id = "rectb_"+ module.id;

    var el = document.querySelector("#"+rect_border_id);
        if(el != null){
            rect_border_id = "rectb_"+ module.id+ "_secound";
        }
    var element = document.querySelector("#"+module_id_physi);
        if(element != null){
            module_id_physi = "mphysi_"+ module.id+ "_2";
        }

    g_first.setAttribute("transform",'translate('+module.x+','+module.y+') rotate('+module.rotation+')');

    svg_physical.appendChild(g_first);
    if(module.orientation == "Vertical"){

        g_second.setAttribute("w",52);
        g_second.setAttribute("pointer-events", 'all');
        g_second.setAttribute("transform", 'scale(1,1.4)');
        g_second.setAttribute("stroke",'none');
        g_second.setAttribute("fill", 'none');
        g_first.setAttribute("id",module_id_physi);

        g_first.setAttribute("onmousemove",'showTooltipPhysi(evt,"'+module.description+'","'+module_id_physi+'","'+module.orientation+'","'+module.rotation+'","'+module.serial_number+'","'+qtd+'","'+unit+'")');
        g_first.setAttribute("onmouseout",'hideTooltipPhysi()');
        g_first.setAttribute("onclick",'showMenu(evt,"'+module.id+'","'+module_id_physi+'",true,"'+rect_border_id+'")');

        g_first.appendChild(g_second);

        rect_board.setAttribute("x",0);
        rect_board.setAttribute("y",0);
        rect_board.setAttribute("width",52);
        rect_board.setAttribute("height",79);
        rect_board.setAttribute("fill",'#000');

        g_second.appendChild(rect_board);

        rect_color.setAttribute("x",0);
        rect_color.setAttribute("y",0);
        rect_color.setAttribute("width",52);
        rect_color.setAttribute("height",66);
        rect_color.setAttribute("fill",'#2A7296');

        g_second.appendChild(rect_color);

        var count = 0;
        var aux_x = 0;
        var ori_x = [1,14,27,40];
        var ori_y = [1,14,27,40,53];


        for(var e = 0; e < 20 ; e++){

            if(count == 5){
                count = 0;
                aux_x = aux_x + 1;
            }

            rect_cell[e] = document.createElementNS('http://www.w3.org/2000/svg','rect');
            rect_cell[e].setAttribute("x",ori_x[aux_x]);
            rect_cell[e].setAttribute("y",ori_y[count]);
            rect_cell[e].setAttribute("width",12);
            rect_cell[e].setAttribute("height",12);
            rect_cell[e].setAttribute("fill",color);

            count++;
            g_second.appendChild(rect_cell[e]);
        }
        element_text_description.setAttribute("x",2);
        element_text_description.setAttribute("y",76);
        element_text_description.setAttribute("font-size",'12px');
        element_text_description.setAttribute("text-anchor",'start');
        element_text_description.setAttribute("fill",'#FFF');
        element_text_description.setAttribute("font-weight",'bold');
        if(module.rotation == 191){
            element_text_description.setAttribute("transform",'rotate(180,25,72)');
            element_text_energy.setAttribute("transform",'rotate(180,26,34)');
            element_text_unit.setAttribute("transform",'rotate(180,27,33)');
        }

        element_text_description.appendChild(text_module_description);
        g_second.appendChild(element_text_description);

        element_text_energy.setAttribute("x",26);
        element_text_energy.setAttribute("y",29.5);
        element_text_energy.setAttribute("font-size",'12px');
        element_text_energy.setAttribute("text-anchor",'middle');
        element_text_energy.setAttribute("fill",'#FFF');
        element_text_energy.setAttribute("font-weight",'bold');

        element_text_energy.appendChild(text_module_energy);
        g_second.appendChild(element_text_energy);

        element_text_unit.setAttribute("x",26);
        element_text_unit.setAttribute("y",42.5);
        element_text_unit.setAttribute("font-size",'12px');
        element_text_unit.setAttribute("text-anchor",'middle');
        element_text_unit.setAttribute("fill",'#FFF');
        element_text_unit.setAttribute("font-weight",'bold');

        element_text_unit.appendChild(text_module_unit);
        g_second.appendChild(element_text_unit);

        rect_border.setAttribute("x",0);
        rect_border.setAttribute("y",0);
        rect_border.setAttribute("width",52);
        rect_border.setAttribute("height",79);
        rect_border.setAttribute("stroke",'#f7931e');
        rect_border.setAttribute("stroke-width",2);
        rect_border.setAttribute("stroke-opacity",0);
        rect_border.setAttribute("id",rect_border_id);

        g_second.appendChild(rect_border);

    }else if(module.orientation == "Horizontal"){

        g_second.setAttribute("w",79);
        g_second.setAttribute("pointer-events", 'all');
        g_second.setAttribute("transform", 'scale(1.4,1)');
        g_second.setAttribute("stroke",'none');
        g_second.setAttribute("fill", 'none');
        g_first.setAttribute("id",module_id_physi);
        g_first.setAttribute("onmousemove",'showTooltipPhysi(evt,"'+module.description+'","'+module_id_physi+'","'+module.orientation+'","'+module.rotation+'","'+module.serial_number+'","'+qtd+'","'+unit+'")');
        g_first.setAttribute("onmouseout",'hideTooltipPhysi()');
        g_first.setAttribute("onclick",'showMenu(evt,"'+module.id+'","'+module_id_physi+'",true,"'+rect_border_id+'")');

        g_first.appendChild(g_second);

        rect_board.setAttribute("x",0);
        rect_board.setAttribute("y",0);
        rect_board.setAttribute("width",79);
        rect_board.setAttribute("height",52);
        rect_board.setAttribute("fill",'#000');

        g_second.appendChild(rect_board);

        rect_color.setAttribute("x",0);
        rect_color.setAttribute("y",0);
        rect_color.setAttribute("width",79);
        rect_color.setAttribute("height",40);
        rect_color.setAttribute("fill",'#2A7296');

        g_second.appendChild(rect_color);

        var count = 0;
        var aux_x = 0;
        var ori_x = [1,14,27,40,53,66];
        var ori_y = [1,14,27];


        for(var e = 0; e < 18 ; e++){

            if(count == 3){
                count = 0;
                aux_x = aux_x + 1;
            }

            rect_cell[e] = document.createElementNS('http://www.w3.org/2000/svg','rect');
            rect_cell[e].setAttribute("x",ori_x[aux_x]);
            rect_cell[e].setAttribute("y",ori_y[count]);
            rect_cell[e].setAttribute("width",12);
            rect_cell[e].setAttribute("height",12);
            rect_cell[e].setAttribute("fill",color);

            count++;
            g_second.appendChild(rect_cell[e]);
        }
        element_text_description.setAttribute("x",2);
        element_text_description.setAttribute("y",49);
        element_text_description.setAttribute("font-size",'12px');
        element_text_description.setAttribute("text-anchor",'end');
        element_text_description.setAttribute("fill",'#FFF');
        element_text_description.setAttribute("font-weight",'bold');
        element_text_description.setAttribute("transform",'rotate(180,2,45)');

        element_text_description.appendChild(text_module_description);
        g_second.appendChild(element_text_description);

        element_text_energy.setAttribute("x",39.5);
        element_text_energy.setAttribute("y",30);
        element_text_energy.setAttribute("font-size",'12px');
        element_text_energy.setAttribute("text-anchor",'middle');
        element_text_energy.setAttribute("fill",'#FFF');
        element_text_energy.setAttribute("font-weight",'bold');
        element_text_energy.setAttribute("transform",'rotate(180,39.5,26)');

        element_text_energy.appendChild(text_module_energy);
        g_second.appendChild(element_text_energy);

        element_text_unit.setAttribute("x",39.5);
        element_text_unit.setAttribute("y",18);
        element_text_unit.setAttribute("font-size",'12px');
        element_text_unit.setAttribute("text-anchor",'middle');
        element_text_unit.setAttribute("fill",'#FFF');
        element_text_unit.setAttribute("font-weight",'bold');
        element_text_unit.setAttribute("transform",'rotate(180,39.5,14)');

        element_text_unit.appendChild(text_module_unit);
        g_second.appendChild(element_text_unit);

        rect_border.setAttribute("x",0);
        rect_border.setAttribute("y",0);
        rect_border.setAttribute("width",79);
        rect_border.setAttribute("height",52);
        rect_border.setAttribute("stroke",'#f7931e');
        rect_border.setAttribute("stroke-width",2);
        rect_border.setAttribute("stroke-opacity",0);
        rect_border.setAttribute("id",rect_border_id);

        g_second.appendChild(rect_border);

    }
 }

 function hideTooltipPhysi(){
     let tooltip_physi = document.getElementById('tooltip_physi');
     tooltip_physi.style.display = "none";
 }
 function showTooltipPhysi(evt,description, id,orientation,rotation,serial,qtd,unit){
    let tooltip_physi = document.getElementById('tooltip_physi');
    let element = document.getElementById(id);
    let coor_physi = element.getBoundingClientRect();

    document.getElementById("description_tooltip").innerHTML = description + " (" +serial + ")";
    document.getElementById("orientation_tooltip").innerHTML ="Orientação: " + orientation;
    document.getElementById("rotation_tooltip").innerHTML = "Rotação: " + rotation;
    document.getElementById("module_energy_tooltip").innerHTML = "Energia Captada: " + qtd + " " + unit;

    tooltip_physi.style.display = "block";
    tooltip_physi.style.left = coor_physi.left + window.scrollX+ -300 + "px";
    tooltip_physi.style.top = coor_physi.top + window.scrollY + -50 +"px";
 }


//Utilizado nos dois Layouts
function colorPicker(value, max){
       var maxReference = max == 0 || max < 4000 ? 4000 :  max;
       var percentage = (100*value) / maxReference;
       var color = "";
        if(percentage <= 0){
            color = "#000000";
        }else if(percentage > 0 && percentage <= 10){
            color = "#081a2b";
        }else if(percentage > 10 && percentage <= 20){
            color = "#0F2D4C";
        }else if(percentage > 20 && percentage <= 30){
            color = "#194C7F";
        }else if(percentage > 30 && percentage <= 40){
            color = "#2266aa";
        }else if(percentage > 40 && percentage <= 50){
            color = "#2a80d5";
        }else if(percentage > 50 && percentage <= 60){
            color = "#298ebc";
        }else if(percentage > 60 && percentage <= 70){
            color = "#2d9bce";
        }else if(percentage > 70 && percentage < 80){
            color = "#5599dd";
        }else if(percentage > 80 && percentage < 90){
            color = "#43a7d6";
        }else if(percentage >= 90){
            color = "#6dbbdf";
        }
        return color;
}
function showMenu(evt,id,id_aux,is_module,rect_id = "") {
    if(rect_id != ""){
        showBorder(evt,rect_id);
    }
    let tooltip_physi = document.getElementById('tooltip_physi');
    tooltip_physi.style.display = "none";

//  Mostrar elementos do menu ao clicar em um módulo
   let list_current = document.getElementById('list_current');
   let list_voltage_module = document.getElementById('list_voltage_module');
   let list_optimizer_voltage = document.getElementById('list_optimizer_voltage');

    if(is_module){
        list_current.style.display = "block";
        list_voltage_module.style.display = "block";
        list_optimizer_voltage.style.display = "block";
    }else{
        list_current.style.display = "none";
        list_voltage_module.style.display = "none";
        list_optimizer_voltage.style.display = "none";
    }
    is_menu = true;
    let el = document.getElementById(id_aux);
    let coor = el.getBoundingClientRect();
    let ele = document.getElementById('list');
    ele.style.display = "block";
    ele.style.left = coor.left + window.scrollX+ -300 + "px";
    ele.style.top = coor.top + window.scrollY + -70 +"px";
}


function showBorder(evt,id){
    var id_reference = id.replace("_secound","")
    is_border = true;
    if(id_old != ""){
        var rect_old = document.querySelector(id_old);
        rect_old.setAttribute("stroke-opacity",0);
        var rect_old_aux = document.querySelector(id_old+"_secound");
        rect_old_aux.setAttribute("stroke-opacity",0);
    }
    var rect_selected = document.querySelector("#"+id_reference);
    rect_selected.setAttribute("stroke-opacity",2);
    var rect_selected_aux = document.querySelector("#"+id_reference+"_secound");
        rect_selected_aux.setAttribute("stroke-opacity",2);

    id_old = "#"+id_reference;
}

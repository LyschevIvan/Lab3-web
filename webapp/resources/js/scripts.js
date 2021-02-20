fillColor = "#2b602b";
console.log(document.location.host);
let wsUri = "ws://"+document.location.host + "/lab3-web/"+ "ajax";
let websocket = new WebSocket(wsUri);
websocket.onmessage = function (evt){
  $("#form\\:update_table").click();

}

function onUpdate(data){
  if (data.status === "success"){
    if((x_val!=null)&&(yValidated)){
      putPoint(x_val,y_val)
    }
    else{
      drawPoints();
    }

  }
}

function onDelete(data){
  if (data.status === "success"){
    if((x_val!=null)&&(yValidated)){
      putPoint(x_val,y_val)
    }
    else{
      drawCanvas(r_inp)
    }

  }
}

$(document).ready(function () {
  r_inp = $('input[name="form:r"][checked="checked"]').val();
  x_val = $('input[name="form:x"][checked="checked"]').val();
  y_val = $("#form\\:y").val();
  yValidated = true;

  checkY(y_val);

  console.log(r_inp+" "+x_val+" "+y_val);

  drawCanvas(r_inp);

  if ((x_val!=null)&&(yValidated)){
    putPoint(x_val,y_val)
  }


});

function setR(r){
  r_inp = r.value;
  drawCanvas(r_inp);
  if((x_val!= null)&&(yValidated)){
    putPoint(x_val, y_val);
  }
}
function setX(x){
  x_val =  x.value;
  if(yValidated){
    putPoint(x_val, y_val);
  }
}

function setY(y){

  y_val = y.value;
  checkY(y.value);

  if (yValidated){
    if (x_val!=null){
      putPoint(x_val,y_val)
    }
  }
  else {
    drawCanvas(r_inp)
  }
}

function checkY(y){
  y = parseFloat(y.replace(/[^0-9-,.]/g, '').replace(',','.'));
  let re = new RegExp('^-?[0-9]+(\.[0-9]+)?$');
  console.log(y);
  if(re.test(y)){
    yValidated = (y <= 3) && (y >= -3);
  }
  else {
    yValidated = false;
  }

}


function clickSend(){
  if((x_val!= null)&&(yValidated)){
    putPoint(x_val, y_val);
  }
}


function drawCanvas(r) {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  //очистка
  context.clearRect(0, 0, canvas.width, canvas.height);

  //прямоугольник
  context.beginPath();
  context.rect(150, 150, 280, 280);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  // сектор
  context.beginPath();
  context.moveTo(150, 150);
  context.arc(150, 150, 65, Math.PI * 3 / 2, 0);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  //треугольник
  context.beginPath();
  context.moveTo(150, 150);
  context.lineTo(150, 150 - 130);
  context.lineTo(20, 150);
  context.lineTo(150, 150);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  //отрисовка осей
  context.beginPath();
  context.font = "10px Verdana";
  context.moveTo(150, 0);
  context.lineTo(150, 300);
  context.moveTo(150, 0);
  context.lineTo(145, 15);
  context.moveTo(150, 0);
  context.lineTo(155, 15);
  context.strokeStyle = "#000000";
  context.fillStyle = "#000000";
  context.fillText("Y", 160, 10);
  context.moveTo(0, 150);
  context.lineTo(300, 150);
  context.moveTo(300, 150);
  context.lineTo(285, 145);
  context.moveTo(300, 150);
  context.lineTo(285, 155);
  context.fillText("X", 290, 135);

  // деления X
  context.moveTo(145, 20);
  context.lineTo(155, 20);
  context.fillText(r, 160, 20);
  context.moveTo(145, 85);
  context.lineTo(155, 85);
  context.fillText((r / 2), 160, 78);
  context.moveTo(145, 215);
  context.lineTo(155, 215);
  context.fillText(-(r / 2), 160, 215);
  context.moveTo(145, 280);
  context.lineTo(155, 280);
  context.fillText(-r, 160, 280);
  // деления Y
  context.moveTo(20, 145);
  context.lineTo(20, 155);
  context.fillText(-r, 20, 170);
  context.moveTo(85, 145);
  context.lineTo(85, 155);
  context.fillText(-(r / 2), 70, 170);
  context.moveTo(215, 145);
  context.lineTo(215, 155);
  context.fillText((r / 2), 215, 170);
  context.moveTo(280, 145);
  context.lineTo(280, 155);
  context.fillText(r, 280, 170);

  context.closePath();
  context.strokeStyle = "black";
  context.fillStyle = "black";
  context.stroke();

  drawPoints();

}

function convertX(x){
  return x/r_inp*130+150;

}
function convertY(y) {
  return 150-y/r_inp*130;
}

function putPoint(x, y) {
  drawCanvas(r_inp);
  let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

  context.beginPath();
  context.ellipse(convertX(x), convertY(y), 4, 4, 1, 0, 2 * Math.PI, true);
  context.closePath();
  context.strokeStyle = "#000000";
  context.fillStyle = "#a066a8";
  context.fill();
  context.stroke();
}

function drawPoint(x, y, isArea) {

  var canvas = document.getElementById('canvas'),
    context = canvas.getContext("2d");

  context.beginPath();
  context.ellipse(convertX(x) , convertY(y) , 4, 4, 1, 0, 2 * Math.PI, true);
  context.closePath();
  if (isArea) {
    context.strokeStyle = "#20ff00";
    context.fillStyle = "#20ff00";
  } else {
    context.strokeStyle = "#dc3545";
    context.fillStyle = "#dc3545";
  }
  context.fill();
  context.stroke();

}

function drawPoints() {
  $('#table_data tr').each(function(row){
    let row_val = [];
    $(this).find('td').each(function(cell){
      row_val.push($(this).html().replace(",","."));
    });
    drawPoint(parseFloat(row_val[0]),parseFloat(row_val[1]),row_val[3] == "true");
  });

}
function clickCanvas() {

  let elem = document.getElementById("canvas");
  let br = elem.getBoundingClientRect();
  let left = br.left;
  let top = br.top;
  let event = window.event;
  let x = event.clientX - left;
  let y = event.clientY - top;

  let transf_x = Math.trunc((r_inp * (x - 150) / 130)*10000)/10000;
  let transf_y = Math.trunc((r_inp * (150 - y) / 130)*10000)/10000;

  let data = JSON.stringify({
    'X' : transf_x,
    'Y' : transf_y,
    'R' : r_inp
  })
  websocket.send(data)

}
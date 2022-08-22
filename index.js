// ############### cursor Editing ###############

const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  cursor.setAttribute('data-fromTop', (cursor.offsetTop - scrollY));
})

window.addEventListener('scroll', (e) => {
  const fromTop = parseInt(cursor.getAttribute('data-fromTop'));
  cursor.style.top = scrollY + fromTop + 'px';
})

window.addEventListener('click', () => {
  if(cursor.classList.contains('click')){
    cursor.classList.remove('click');

    void cursor.offsetWidth;
    cursor.classList.add('click');
  }
  else{
    cursor.classList.add('click');
  }
})

// ########################################

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation ='multiply';
ctx.globalCompositeOperation ='source-over';
// ctx.globalCompositeOperation ='source-in';
// ctx.globalCompositeOperation ='source-out';
// ctx.globalCompositeOperation ='source-atop';
// ctx.globalCompositeOperation ='destination-over';
// ctx.globalCompositeOperation ='destination-in';
// ctx.globalCompositeOperation ='destination-out';
// ctx.globalCompositeOperation ='lighter';
// ctx.globalCompositeOperation ='copy';
// ctx.globalCompositeOperation ='xor';
// ctx.globalCompositeOperation ='screen';
// ctx.globalCompositeOperation ='overlay';
// ctx.globalCompositeOperation ='darken';
// ctx.globalCompositeOperation ='lighten';
// ctx.globalCompositeOperation ='color-dodge';
// ctx.globalCompositeOperation ='color-burn';
// ctx.globalCompositeOperation ='hard-light';
// ctx.globalCompositeOperation ='soft-light';
// ctx.globalCompositeOperation ='difference';
// ctx.globalCompositeOperation ='exclusion';
// ctx.globalCompositeOperation ='hue';
// ctx.globalCompositeOperation ='saturation';
// ctx.globalCompositeOperation ='color';
// ctx.globalCompositeOperation ='luminosity';

let isDrawing = false;
let lastX = 0;
let lastY =0;
let hue = 0;
let direction = true;


const draw = function (e){
    if(!isDrawing) return; // STOPE working when mouse is not pressed
    console.log(e);
    ctx.strokeStyle =`hsl(${hue},300%,50%)`;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY]=[e.offsetX,e.offsetY];
    // lastX= e.offsetX;
    // lastY=e.offsetY;
    hue++;
    if(hue>=360) hue =0;
    else if(ctx.lineWidth >=100 || ctx.lineWidth<=1) direction = !direction;
    else if(direction) ctx.lineWidth++;
    else ctx.lineWidth--;
    // ctx.lineWidth++;
}
canvas.addEventListener('mousedown',(e)=>{   
    isDrawing=true;
     [lastX, lastY]=[e.offsetX,e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup',()=> isDrawing=false );
canvas.addEventListener('mouseout',()=> isDrawing=false );
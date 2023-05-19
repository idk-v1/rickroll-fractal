var can = document.querySelector("canvas");
var ctx = can.getContext("2d");

var img = document.createElement("canvas");
var imgCtx = img.getContext("2d");

var video = document.createElement("video");
video.src = "rrsq.mov";
var paused = true;

var depth = 5;
var angleVel = 1;

draw();

function draw()
{
    var length = Math.floor(video.duration / 60).toString().padStart(2, '0');
    var minutes = Math.floor(video.currentTime / 60).toString().padStart(2, '0');

    if (can.width != Math.min(window.innerWidth, window.innerHeight) || can.height != Math.min(window.innerWidth, window.innerHeight))
    {
        can.width = Math.min(window.innerWidth, window.innerHeight);
        can.height = can.width;

        img.width = can.width / 2;
        img.height = can.height / 2;
    }

    imgCtx.drawImage(video, 0, 0, img.width, img.height);

    ctx.save();

    ctx.fillStyle = "#0001";
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.translate(can.width / 2, can.height / 2);
    ctx.rotate(Math.PI / 180 * 10 * (video.currentTime * angleVel));
    ctx.scale(0.66, 0.66);

    if (!paused)
        recurseDraw(0, 0, 1, -1);

    ctx.restore();

    ctx.fillStyle = "#fff";
    ctx.font = `${can.height / 30}px Consolas`;
    ctx.textAlign = "right";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 20;
    ctx.strokeText(minutes + ":" + (video.currentTime % 60).toFixed(2).padStart(5, '0') + " / " + length + ":" + 
    (video.duration % 60).toFixed(2), can.width / 60 * 59, can.height / 30);
    ctx.fillText(minutes + ":" + (video.currentTime % 60).toFixed(2).padStart(5, '0') + " / " + length + ":" + 
    (video.duration % 60).toFixed(2), can.width / 60 * 59, can.height / 30);

    setTimeout(draw, 1000 / 30);
}

function recurseDraw(posx, posy, d, dir)
{
    if (d <= depth)
    {
        ctx.drawImage(img, -can.width / Math.pow(2, d + 1) - posx, -can.height / Math.pow(2, d + 1) - posy, can.width / Math.pow(2, d), can.height / Math.pow(2, d));
        if (dir != 2)
            recurseDraw(posx, posy + 1.5 * can.height / Math.pow(2, d + 1), d + 1, 0);
        if (dir != 3)
            recurseDraw(posx - 1.5 * can.height / Math.pow(2, d + 1), posy, d + 1, 1);
        if (dir != 0)
            recurseDraw(posx, posy - 1.5 * can.height / Math.pow(2, d + 1), d + 1, 2);
        if (dir != 1)
            recurseDraw(posx + 1.5 * can.height / Math.pow(2, d + 1), posy, d + 1, 3);
    }
}
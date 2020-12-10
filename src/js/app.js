$(document).ready(function() {
	"use strict";

	let leon, canvas, ctx;

const sw = 800;
const sh = 600;
const pixelRatio = 2;

function init() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    ctx.scale(pixelRatio, pixelRatio);

    leon = new LeonSans({
        text: 'The quick brown\nfox jumps over\nthe lazy dog',
		//color: ['#000000'],
		colorful:['#c5d73f', '#9d529c', '#49a9db', '#fec330', '#5eb96e', '#fc5356', '#f38f31'],
        size: 80,
        weight: 200
    });

    requestAnimationFrame(animate);
}

function animate(t) {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, sw, sh);

    const x = (sw - leon.rect.w) / 2;
    const y = (sh - leon.rect.h) / 2;
    leon.position(x, y);

    leon.draw(ctx);
}

window.onload = () => {
    init();
};
});

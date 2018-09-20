//khai báo thuộc tính cavas:
let canvas = document.querySelector('canvas');
canvas.width = 1324;
canvas.height = 640;

//lớp tạo hình và chuyển động của hình chữ nhật:
function Drawrectangle(color, left, top, right, bottom) {
    this.color = color;
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.roll = function () {
        this.left += 0;
        this.right += 0;
        };
    this.draw = function (canvas) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.right, this.bottom);
        }

    }
//lớp tạo hình và chuyển động của bóng:
function Ball(x, y, color, size, velX, velY) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.velX = velX;
    this.velY = velY;
    this.roll = function () {
        this.x += this.velX;
        this.y += this.velY;

        let reachLeft = this.x - this.size <= 0;
        let reachRight = this.x + this.size >= canvas.width;
        if (reachLeft || reachRight) {
            this.velX = -(this.velX);
        }

        let reachTop = this.y - this.size <= 0;
        let reachBottom = this.y + this.size >= canvas.height;
        if (reachTop || reachBottom) {
            this.velY = -(this.velY);
        }
    };
    this.draw = function (canvas) {
        const ANGLE_START = 0;
        const ANGLE_END = 2 * Math.PI;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, ANGLE_START, ANGLE_END);
        ctx.fill();
    };
    this.collisionDetect = function (balls) {
        for (ball of balls) {
            if (this !== ball && collisioned(this, ball)) {
                this.color = randomColor();
                ball.color = randomColor();
                ball.velY = -(ball.velY);
                ball.velX = -(ball.velX)
            }
        }

        function collisioned(b1, b2) {
            let sumOfRadiuses = b1.size + b2.size;
            return distance(b1, b2) <= sumOfRadiuses * sumOfRadiuses;

        }

        function distance(b1, b2) {
            let dx = b1.x - b2.x;
            let dy = b1.y - b2.y;
            return dx * dx + dy * dy;
        }

        function randomColor() {
            let red = rdr(0, 255);
            let green = rdr(0, 255);
            let blue = rdr(0, 255);
            return `rgb(${red}, ${green}, ${blue})`;


        }

        function rdr(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    };
}
//hàm tạo nhiều bóng:
function createABulkOfBalls(num) {
    let balls = Array(num);
    while (num > 0) {
        balls[--num] = createRandomBall();
    }

    return balls;

    function createRandomBall() {
        let size = 20;
        let x = rdr(size, canvas.width - size);
        let y = rdr(size, canvas.height - size);
        let velX = rdr(-10, 10);
        let velY = rdr(-10, 10);

        let red = rdr(0, 255);
        let green = rdr(0, 255);
        let blue = rdr(0, 255);
        let color = `rgb(${red}, ${green}, ${blue})`;

        return new Ball(x, y, color, size, velX, velY,);

        function rdr(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
}
//hàm chuyển động qua từng khung hình
function stepping() {
    ctx = canvas.getContext('2d');
    dim(canvas);
    rectangle.draw(canvas);
    rectangle.roll();
    for (let ball of balls) {
        ball.draw(canvas);
        ball.roll();
        ball.collisionDetect(balls);
    }

    window.requestAnimationFrame(stepping);

    function dim(canvas) {
        const BACKGROUND_COLOR = "white";
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//gán các giá trị:
window.requestAnimationFrame(stepping);
let rectangle = new Drawrectangle('#FF0000',200,200,200,200);
let balls = new createABulkOfBalls(10);
// bem130 2022 paint.js //
// require "2d.js", by bem130
/*

color
    rgbcolor = [red(0~255),green(0~255),blue(0~255)]
    rgbacolor = [red(0~255),green(0~255),blue(0~255),alpha(0~255)]

*/

class Paint {
    constructor(canvas_id) {
        this.m2d = new m2D()
        this.canvas = canvas_id
        this.data
        this.x
        this.y
    }
    makeimg() {
        let co = document.createElement("canvas");
        co.height = this.y;
        co.width = this.x;
        co.getContext('2d').putImageData(new ImageData(this.data,this.x,this.y),0,0);
        return co.toDataURL('image/png');
    }
    output_img(img_id) {
        document.getElementById(img_id).src = mkimg()
    }
    update() {
        let co = document.getElementById(this.canvas);
        co.height = this.y;
        co.width = this.x;
        co.getContext('2d').putImageData(new ImageData(this.data,this.x,this.y),0,0);
    }
    setup(x,y) {
        this.data = new Uint8ClampedArray(x*y*4).fill(255)
        this.x = x
        this.y = y
    }
    paintDot(x,y,rgbcolor) {
        let idx = (y*this.x+x)*4;
        this.data[idx+0] = rgbcolor[0]; // Red
        this.data[idx+1] = rgbcolor[1]; // Green
        this.data[idx+2] = rgbcolor[2]; // Blue
    }
    paintFilledCircle(x,y,r,rgbcolor) {
        for (let iy=-r;iy<r;iy++) {
            for (let ix=-r;ix<r;ix++) {
                if (this.m2d.length([0,0],[iy,ix])<=r) {
                    this.paintDot(x+ix,y+iy,rgbcolor)
                }
            }
        }
    }
}
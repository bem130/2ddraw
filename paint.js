// bem130 2022 paint.js //
// require "2d.js", by bem130
/*

*/

class Paint {
    constructor(canvas_id) {
        this.m2d = new m2D()
        this.canvas = canvas_id
        this.data
        this.x
        this.y
    }
    loadimg(img) {
        let co = document.createElement("canvas");
        co.height = img.naturalHeight;
        co.width = img.naturalWidth;
        let ctx = cco.getContext("2d");
        ctx.drawImage(img,0,0);
        this.data = ctx.getImageData(0,0,img.naturalWidth,img.naturalHeight);
        this.x = img.naturalWidth
        this.y = img.naturalHeight
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

    paintBezierCurve(points,rgbcolor) {
        for (let t=0;t<1;t+=0.01) {
            let s = 1
            let pts = [points]
            for (s=1;s<pts[0].length;s++) {
                pts.push([])
                for (let p=0;p<pts[s-1].length-1;p++) {
                    pts[s].push(this.m2d.linesplitpoint(pts[s-1][p],pts[s-1][p+1],t))
                }
            }
            let dot = this.m2d.floor(pts[pts[0].length-1][0])
            this.paintDot(dot[0],dot[1],rgbcolor)
        }
    }
}
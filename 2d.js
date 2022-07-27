// bem130 2022 2d.js //
/*

point
  p_ = [x,y]

*/

class m2D {
    length(p1,p2) {
      return Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2)
    }
    midpoint(p1,p2) {
      return [(p1[0]+p2[0])/2,(p1[1]+p2[1])/2]
    }
}
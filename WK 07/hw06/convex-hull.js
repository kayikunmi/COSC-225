const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

//global eventlistener for the button to call the step function
let chb = document.querySelector("#convex-hull-box"); //my svg
let set = new PointSet(); //my ps
let chv = new ConvexHullViewer(chb, set); //the viewer containing svg and ps
let inst = new ConvexHull(set, chv); //the instance that has ps and viewer

// An object that represents a 2-d point, consisting of an
// x-coordinate and a y-coordinate. The `compareTo` function
// implements a comparison for sorting with respect to x-coordinates,
// breaking ties by y-coordinate.
function Point(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;

  // Compare this Point to another Point p for the purposes of
  // sorting a collection of points. The comparison is according to
  // lexicographical ordering. That is, (x, y) < (x', y') if (1) x <
  // x' or (2) x == x' and y < y'.
  this.compareTo = function (p) {
    if (this.x > p.x) {
      return 1;
    }

    if (this.x < p.x) {
      return -1;
    }

    if (this.y > p.y) {
      return 1;
    }

    if (this.y < p.y) {
      return -1;
    }

    return 0;
  };

  // return a string representation of this Point
  this.toString = function () {
    return "(" + x + ", " + y + ")";
  };
}

// An object that represents a set of Points in the plane. The `sort`
// function sorts the points according to the `Point.compareTo`
// function. The `reverse` function reverses the order of the
// points. The functions getXCoords and getYCoords return arrays
// containing x-coordinates and y-coordinates (respectively) of the
// points in the PointSet.
function PointSet() {
  this.points = [];
  this.curPointID = 0;
  
  // create a new Point with coordintes (x, y) and add it to this
  // PointSet
  this.addNewPoint = function (x, y) {
    const pt = new Point(x,y, this.curPointID);
    this.points.push(pt);
    this.curPointID++;
    return pt;
  };

  // add an existing point to this PointSet
  this.addPoint = function (pt) {
    this.points.push(pt);
  };

  // sort the points in this.points
  this.sort = function () {
    this.points.sort((a, b) => {
      return a.compareTo(b);
    });
  };

  // reverse the order of the points in this.points
  this.reverse = function () {
    this.points.reverse();
  };

  // return an array of the x-coordinates of points in this.points
  this.getXCoords = function () {
    let coords = [];
    for (let pt of this.points) {
      coords.push(pt.x);
    }

    return coords;
  };

  // return an array of the y-coordinates of points in this.points
  this.getYCoords = function () {
    let coords = [];
    for (pt of this.points) {
      coords.push(pt.y);
    }

    return coords;
  };

  // get the number of points
  this.size = function () {
    return this.points.length;
  };

  // return a string representation of this PointSet
  this.toString = function () {
    let str = "[";
    for (let pt of this.points) {
      str += pt + ", ";
    }
    str = str.slice(0, -2); // remove the trailing ', '
    str += "]";

    return str;
  };

 
}

function ConvexHullViewer(svg, ps) {
  this.svg = svg; // a n svg object where the visualization is drawn
  this.ps = ps; // a point set of the points to be visualized
  this.lines = [];
  this.dots = [];
  this.nextLineID = 0;

  this.svg.addEventListener("click", (e) => this.drawDot(e)); //e is a parameter for an event object. e=> makes a reference to an event object
  //(i.e. this e in the function(e))
 
  this.drawDot = function (e) {
    let rect = this.svg.getBoundingClientRect(); //box is svg element and this is coordinated in the box
    const x = e.clientX - rect.left; // coordinated relative to body - coordinates relative to webpage = exactly where mouse clicked
    const y = e.clientY - rect.top;
    let dot = document.createElementNS(SVG_NS, "circle"); //create element
    dot.setAttributeNS(null, "cx", x); //attributes of location
    dot.setAttributeNS(null, "cy", y);
    this.ps.addNewPoint(x, y); //add the points to the pointset
    this.dots.push(dot);
    dot.classList.add("dot");
    this.svg.appendChild(dot);
  };

  this.clickDot = function (dot) {
    console.log("You clicked this dot " + dot.id);
  }

  this.addLine = function (a,b) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttributeNS(null, "x1", a.x); //set its points
    line.setAttributeNS(null, "y1", a.y);
    line.setAttributeNS(null, "x2", b.x);
    line.setAttributeNS(null, "y2", b.y);
    this.lines.push(line);
    line.id = this.nextID;
    this.nextID++;
    line.classList.add("line");
    this.svg.appendChild(line);
    console.log("line added");
    console.log(a);
    console.log(b);
  }

  this.removeLine = function(line) {
    if(Line(a,b,id)){
      let rem = line; 
    } else{
    return console.log("nothing");
    }
  }

}

function Line(a,b,id){
  this.a = a;
  this.b = b;
  this.id = id;
  this.nextID = 0;

  this.equals = function(a,b) {
    return (this.a == this.a && this.b == b) || (this.a == b && this.b == a);
  };
}


/*
 * An object representing an instance of the convex hull problem. A ConvexHull stores a PointSet ps that stores the input points, and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the
 */
function ConvexHull(ps, viewer) {
  this.ps = ps; // a PointSet storing the input to the algorithm
  this.viewer = viewer; // a ConvexHullViewer for this visualization
  // start a visualization of the Graham scan algorithm performed on ps
  this.isLine = function(a,b) {
    return (this.getLine(a,b) != null);
  }

  this.getLine = function(a,b) {
    for(const line of this.lines) {
      if(line.equals(a,b)) {
        return line;
      }
    }
  }

  this.start = function () {
    this.stack = [];
    ps.sort();
    this.a = ps.points[0];
    this.b = ps.points[1];
    this.c = ps.points[2];
    this.counter = 3;
    console.log("Click to start");
    
  }
  // perform a single step of the Graham scan algorithm performed on ps
  this.step = function () {
    if (this.stack.length == 0) {
      this.stack.push(this.a);
      this.stack.push(this.b);
      this.viewer.addLine(this.a, this.b);
      console.log("this is a = " + this.a);
      console.log("this is b = " + this.b);
    } else if (!cross(this.a, this.b, this.c) && ps.size() > 1) {
      this.stack.pop();
      this.viewer.removeLine(Line(this.a,this.b,this.id));
      this.b = this.a;
      this.a = this.stack[this.stack.length - 2];
      console.log("not right");
    } else {
      this.stack.push(this.c);
      this.viewer.addLine(this.b, this.c);
      console.log("right");
      console.log(this.stack[this.stack.length -1]);
      this.b = this.stack[this.stack.length - 1];
      this.a = this.stack[this.stack.length - 2];      
      this.c = ps.points[this.counter];
      if(this.counter < ps.points.length - 1){
      this.counter++;}
      else if(this.counter == ps.points.length - 1){
        this.counter = 0;
      }
      console.log("this is a = " + this.a);
      console.log("this is b = " + this.b);
      console.log("this is c = " + this.c);
      console.log(this.stack);
    }
  };

  // Return a new PointSet consisting of the points along the convex
  // hull of ps. This method should **not** perform any
  // visualization. It should **only** return the convex hull of ps
  // represented as a (new) PointSet. Specifically, the elements in
  // the returned PointSet should be the vertices of the convex hull
  // in clockwise order, starting from the left-most point, breaking
  // ties by minimum y-value.
  this.getConvexHull = function () {
    // Make a copy of the input points and sort them lexicographically.
    let sortedPoints = this.ps.points.slice();
    sortedPoints.sort((a, b) => {
        if (a.x !== b.x) {
            return a.x - b.x;
        } else {
            return a.y - b.y;
        }
    });

    // Find the lower hull.
    let lowerHull = [];
    for (let i = 0; i < sortedPoints.length; i++) {
        while (lowerHull.length >= 2 &&
               cross(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], sortedPoints[i]) <= 0) {
            lowerHull.pop();
        }
        lowerHull.push(sortedPoints[i]);
        
    }

    // Find the upper hull.
    let upperHull = [];
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
        while (upperHull.length >= 2 &&
               cross(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], sortedPoints[i]) <= 0) {
            upperHull.pop();
        }
        upperHull.push(sortedPoints[i]);
    }

    // Remove the first and last points of the upper hull (they are also in the lower hull).
    //upperHull.shift();
    lowerHull.pop();
    upperHull.reverse();
    lowerHull.reverse();

    // Concatenate the lower hull and the upper hull to form the convex hull.
    let convexHull = new PointSet();
    convexHull.points = upperHull.concat(lowerHull);

    return convexHull;
  }

}

// Compute the cross product of the vectors (p1 -> p2) and (p2 -> p3).
function cross(p1, p2, p3) {
return (p2.x - p1.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - p1.y);
}
try {
exports.PointSet = PointSet;
exports.ConvexHull = ConvexHull;
} catch (e) {
console.log("not running in Node");
}
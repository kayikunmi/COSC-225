const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

// An object that represents a 2-d point, consisting of an
// x-coordinate and a y-coordinate. The `compareTo` function
// implements a comparison for sorting with respect to x-coordinates,
// breaking ties by y-coordinate.
function Point (x, y, id) {
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
    }

    // return a string representation of this Point
    this.toString = function () {
	return "(" + x + ", " + y + ")";
    }
}

// An object that represents a set of Points in the plane. The `sort`
// function sorts the points according to the `Point.compareTo`
// function. The `reverse` function reverses the order of the
// points. The functions getXCoords and getYCoords return arrays
// containing x-coordinates and y-coordinates (respectively) of the
// points in the PointSet.
function PointSet () {
    this.points = [];
    this.curPointID = 0;

    // create a new Point with coordintes (x, y) and add it to this
    // PointSet
    this.addNewPoint = function (x, y) {
	this.points.push(new Point(x, y, this.curPointID));
	this.curPointID++;
    }

    // add an existing point to this PointSet
    this.addPoint = function (pt) {
	this.points.push(pt);
    }

    // sort the points in this.points 
    this.sort = function () {
	this.points.sort((a,b) => {return a.compareTo(b)});
    }

    // reverse the order of the points in this.points
    this.reverse = function () {
	this.points.reverse();
    }

    // return an array of the x-coordinates of points in this.points
    this.getXCoords = function () {
	let coords = [];
	for (let pt of this.points) {
	    coords.push(pt.x);
	}

	return coords;
    }

    // return an array of the y-coordinates of points in this.points
    this.getYCoords = function () {
	let coords = [];
	for (pt of this.points) {
	    coords.push(pt.y);
	}

	return coords;
    }

    // get the number of points 
    this.size = function () {
	return this.points.length;
    }

    // return a string representation of this PointSet
    this.toString = function () {
	let str = '[';
	for (let pt of this.points) {
	    str += pt + ', ';
	}
	str = str.slice(0,-2); 	// remove the trailing ', '
	str += ']';

	return str;
    }
}


function ConvexHullViewer (svg, ps) {
    this.svg = svg;  // a n svg object where the visualization is drawn
    this.ps = ps;    // a point set of the points to be visualized

    // COMPLETE THIS OBJECT
}

/*
 * An object representing an instance of the convex hull problem. A ConvexHull stores a PointSet ps that stores the input points, and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the 
 */
function ConvexHull (ps, viewer) {
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization

    let s = [];
    a = ps.points[0];
    b = ps.points[1];
    c = ps.points[2];

    this.slope = function (a,b,c) {
        let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
        if(val>0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
        // Step 1: Sort the points in ps according to their x-coordinates
        ps.sort();

        // Step 2: Find the lower and upper hulls
        let lowerHull = [ps.points[0], ps.points[1]];
        for (let i = 2; i < ps.size(); i++) {
            lowerHull.push(ps.points[i]);
            while (lowerHull.length > 2 && this.slope(lowerHull[lowerHull.length - 3], lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1])) {
                lowerHull.splice(lowerHull.length - 2, 1);
            }
        }
        let upperHull = [ps.points[ps.size() - 1], ps.points[ps.size() - 2]];
        for (let i = ps.size() - 3; i >= 0; i--) {
            upperHull.push(ps.points[i]);
            while (upperHull.length > 2 && this.slope(upperHull[upperHull.length - 3], upperHull[upperHull.length - 2], upperHull[upperHull.length - 1])) {
                upperHull.splice(upperHull.length - 2, 1);
            }
        }
        upperHull.reverse();

        // Step 3: Combine the lower and upper hulls to get the convex hull
        let convexHull = lowerHull.concat(upperHull.slice(1, upperHull.length - 1));

        // Step 4: Display the convex hull
        this.viewer.clear();
        let coords = convexHull.map(function (p) { return p.x + "," + p.y }).join(" ");
        let poly = document.createElementNS(SVG_NS, "polygon");
        poly.setAttribute("points", coords);
        poly.setAttribute("stroke", "black");
        poly.setAttribute("fill", "none");
        this.viewer.svg.appendChild(poly);
    }


    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {
	
	// COMPLETE THIS METHOD done
    //initialize a new stack

    if(s.isEmpty()){
        s.push(a);
        s.push(b);
    }
    else if (slope == false && ps.size()> 1){
        s.pop();
        b = a;
        a = s[s.length -2];
    }
    else{
        s.push(c); //this is whenn its a right turn, so it works pretty much
        a = b;
        b = c;
    }
        

	
    }

    // Return a new PointSet consisting of the points along the convex
    // hull of ps. This method should **not** perform any
    // visualization. It should **only** return the convex hull of ps
    // represented as a (new) PointSet. Specifically, the elements in
    // the returned PointSet should be the vertices of the convex hull
    // in clockwise order, starting from the left-most point, breaking
    // ties by minimum y-value.
    this.getConvexHull = function () {
        let points = this.ps.points;
        let n = points.length;
        if (n < 3) {
            return new PointSet(points.slice());
        }
    
        // Sort points lexicographically (by x, then y)
        this.ps.sort();
        
        let hull = [];
        let idx = 0;
    
        // Compute the lower hull
        for (let i = 0; i < n; i++) {
            while (idx >= 2 && this.crossProduct(hull[idx - 2], hull[idx - 1], points[i]) <= 0) {
                hull.pop();
                idx--;
            }
            hull.push(points[i]);
            idx++;
        }
    
        // Compute the upper hull
        for (let i = n - 2, t = idx + 1; i >= 0; i--) {
            while (idx >= t && this.crossProduct(hull[idx - 2], hull[idx - 1], points[i]) <= 0) {
                hull.pop();
                idx--;
            }
            hull.push(points[i]);
            idx++;
        }
    
        hull.pop();  // remove the last point which is the same as the first point
        return new PointSet(hull);
    }
    
    // Compute the cross product of the vectors (p1, p2) and (p2, p3)
    this.crossProduct = function (p1, p2, p3) {
        let x1 = p1.x, y1 = p1.y;
        let x2 = p2.x, y2 = p2.y;
        let x3 = p3.x, y3 = p3.y;
        return (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);
    }
}
try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
  }

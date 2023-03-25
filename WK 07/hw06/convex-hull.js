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

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
	
	// COMPLETE THIS METHOD
    
	
    }

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {
	
	// COMPLETE THIS METHOD done
    //initialize a new stack
    let s = new Stack();
    a = ps[i];
    b = ps[i+1];
    c = ps[i+2];
    if(s.isEmpty()){
        s.push(a);
        s.push(b);
    }
    else if (slope == false && ps.size()> 1){
        s.pop();
        b = a;
        a = s[s.length() -2];
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

	    // COMPLETE THIS METHOD done
        console.log("ps: " + ps.toString);
        ps.sort();
        //create two stacks
        let us = new Stack();
        let ls = new Stack();
    
        // this.slope(abc)= 
        // make the function a boolean, positive if its a right turn, neg if left
        // call the fuction
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

        // now start inside this function
        // initialize point a as ps[0] and b as ps[1]
        // push a and b into upper stack
        let a = ps[0];
        let b = ps[1];
        us.push(a);
        us.push(b);

        // make a for loop that traverses through from 2 ps
        for(let i = 2; i < ps.size(); i ++){
            //initialize c in the loop as ps[i]
            let c = ps[i];
            //if stack.size = 1, psuch c into stack
            if (us.size() == 1){
                us.push(c);
            }
            else{
                //while(slope is false) and ps size is greater than 1){
                while(this.slope(a,b,c) == false){
                    us.pop();
                    b = a;
                    a = us[us.size() -2];
                }
                us.pusch(c)//this is whenn its a right turn, so it works pretty much
                a = b;
                b = c;
            }
        }
        us.pop();

        ps.reverse();
        a = ps[0];
        b = ps[1];
        ls.push(a);
        ls.push(b);

        // make a for loop that traverses through from 2 ps
        for(let i = 2; i < ps.size(); i ++){
            //initialize c in the loop as ps[i]
            let c = ps[i];
            //if stack.size = 1, psuch c into stack
            if (ls.size() == 1){
                ls.push(c);
            }
            else{
                //while(slope is false) and ps size is greater than 1){
                while(this.slope(a,b,c) == false){
                    ls.pop();
                    b = a;
                    a = ls[ls.size() -2];
                }
                ls.pusch(c)//this is when its a right turn, so it works pretty much
                a = b;
                b = c;
            }
        }

        // outside the second for loop for loop, make a new point set that contains both stacks
        let nps = new PointSet();
        for(let i = 0; i < us.size(); i ++){
            nps.push(us[i]);
        }
        for(let i = 0; i < ls.size(); i ++){
            nps.push(ls[i]);
        }
        return nps;
        
    }
}
try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
  }

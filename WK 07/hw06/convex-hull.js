const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

// An object that represents a 2-d point, consisting of an
// x-coordinate and a y-coordinate. The `compareTo` function
// implements a comparison for sorting with respect to x-coordinates,
// breaking ties by y-coordinate.
function Point (x, y, id){
    this.x = x;
    this.y = y;
    this.id = id;

    // Compare this Point to another Point p for the purposes of
    // sorting a collection of points. The comparison is according to
    // lexicographical ordering. That is, (x, y) < (x', y') if (1) x <
    // x' or (2) x == x' and y < y'.
    this.compareTo = function (p){
	if (this.x > p.x){
	    return 1;
	}

	if (this.x < p.x){
	    return -1;
	}

	if (this.y > p.y){
	    return 1;
	}

	if (this.y < p.y){
	    return -1;
	}

	return 0;
    }

    // return a string representation of this Point
    this.toString = function (){
	return "(" + x + ", " + y + ")";
    }
}

// An object that represents a set of Points in the plane. The `sort`
// function sorts the points according to the `Point.compareTo`
// function. The `reverse` function reverses the order of the
// points. The functions getXCoords and getYCoords return arrays
// containing x-coordinates and y-coordinates (respectively) of the
// points in the PointSet.
function PointSet (){
    this.points = [];
    this.curPointID = 0;

    // create a new Point with coordintes (x, y) and add it to this
    // PointSet
    this.addNewPoint = function (x, y){
	this.points.push(new Point(x, y, this.curPointID));
	this.curPointID++;
    }

    // add an existing point to this PointSet
    this.addPoint = function (pt){
	this.points.push(pt);
    }

    // sort the points in this.points 
    this.sort = function (){
	this.points.sort((a,b) =>{return a.compareTo(b)});
    }

    // reverse the order of the points in this.points
    this.reverse = function (){
	this.points.reverse();
    }

    // return an array of the x-coordinates of points in this.points
    this.getXCoords = function (){
	let coords = [];
	for (let pt of this.points){
	    coords.push(pt.x);
	}

	return coords;
    }

    // return an array of the y-coordinates of points in this.points
    this.getYCoords = function (){
	let coords = [];
	for (pt of this.points){
	    coords.push(pt.y);
	}

	return coords;
    }

    // get the number of points 
    this.size = function (){
	return this.points.length;
    }

    // return a string representation of this PointSet
    this.toString = function (){
	let str = '[';
	for (let pt of this.points){
	    str += pt + ', ';
	}
	str = str.slice(0,-2); 	// remove the trailing ', '
	str += ']';

	return str;
    }
}


// function ConvexHullViewer (svg, ps){
//     this.svg = svg;  // a n svg object where the visualization is drawn
//     this.ps = ps;    // a point set of the points to be visualized

//     // COMPLETE THIS OBJECT
// }

function ConvexHullViewer (svg, ps){
    this.svg = svg;  // an SVG object where the visualization is drawn
    this.ps = ps;    // a PointSet of the points to be visualized

    // create an SVG canvas with appropriate dimensions
    svg.setAttributeNS(null, "width", SVG_WIDTH);
    svg.setAttributeNS(null, "height", SVG_HEIGHT);

    // draw the points from the PointSet ps
    for (let pt of ps.points){
        let circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttributeNS(null, "cx", pt.x);
        circle.setAttributeNS(null, "cy", pt.y);
        circle.setAttributeNS(null, "r", 5);
        circle.setAttributeNS(null, "fill", "black");
        svg.appendChild(circle);
    }

    // set up the step button
    let stepButton = document.createElement("button");
    stepButton.textContent = "Step";
    document.body.appendChild(stepButton);

    // add an event listener to the step button to visualize each step of the algorithm
    let i = 0;
    stepButton.addEventListener("click", () =>{
        if (i < ps.points.length){
            // visualize the next step of the algorithm
            let circle = document.createElementNS(SVG_NS, "circle");
            circle.setAttributeNS(null, "cx", ps.points[i].x);
            circle.setAttributeNS(null, "cy", ps.points[i].y);
            circle.setAttributeNS(null, "r", 5);
            circle.setAttributeNS(null, "fill", "red");
            svg.appendChild(circle);
            i++;
        }
    });
}


/*
 * An object representing an instance of the convex hull problem. A ConvexHull stores a PointSet ps that stores the input points, and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the 
 */
function ConvexHull (ps, viewer){
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization

    let s = [];
    ps.sort();  // sort the points in ps
    let a = ps.points[0];  // the point with the smallest x-coordinate
    let b = ps.points[1];  // the second point with the smallest x-coordinate
    let c = ps.points[2];  // the third point with the smallest x-coordinate


    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function (){
        //COMPLETE THIS
        this.step();
    }

    this.step = function (){
        // get the size of the stack
        let n = s.length;
    
        // get the two points at the top of the stack
        let b = s[n-1];
        let a = s[n-2];
    
        // get the next point in the PointSet
        let c = ps.points[(ps.points.indexOf(b)+1) % ps.size()];
    
        // calculate the cross product of vectors (a,b) and (b,c)
        let cp = cross(a,b,c);
    
        if (cp <= 0 && n > 2){
            // if the cross product is negative or 0 and there are more
            // than 2 points in the stack, pop the top point
            s.pop();
        } else{
            // otherwise, push the next point onto the stack
            s.push(c);
        }
    
        // update the visualization
        viewer.update(s, ps);
    }
    
    this.getConvexHull = function (){
        // Make a copy of the input points and sort them lexicographically.
        let sortedPoints = this.ps.points.slice();
        sortedPoints.sort((a, b) =>{
            if (a.x !== b.x){
                return a.x - b.x;
            } else{
                return a.y - b.y;
            }
        });

        // Find the lower hull.
        let lowerHull = [];
        for (let i = 0; i < sortedPoints.length; i++){
            while (lowerHull.length >= 2 &&
                   cross(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], sortedPoints[i]) <= 0){
                lowerHull.pop();
            }
            lowerHull.push(sortedPoints[i]);
        }

        // Find the upper hull.
        let upperHull = [];
        for (let i = sortedPoints.length - 1; i >= 0; i--){
            while (upperHull.length >= 2 &&
                   cross(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], sortedPoints[i]) <= 0){
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
function cross(p1, p2, p3){
    return (p2.x - p1.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - p1.y);
}
try{
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e){
    console.log("not running in Node");
  }

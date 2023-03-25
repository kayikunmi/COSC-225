/*
 * CONVEX HULL TESTER
 *
 * Description: This program tests the correctness of a convex hull
 * finding algorithm.
 *
 * Dependencies: This program assumes that convex hull finding
 * functionality is provided in a file called
 * 'convex-hull.js'. 'convex-hull.js' should define two classes:
 * 'PointSet' and 'ConvexHull', which are exported from the file
 * 'convex-hull.js'. Specifically, 'convex-hull.js' should include the
 * lines:
 *
 *   exports.PointSet = Pointset;
 *   exports.ConvexHull = ConvexHull;
 *
 * The tester also assumes that example input/output-pairs are
 * provided in the file 'convex-hull-tests.json'. The tester requires
 * Node.js.
 *
 * Usage: To run the tester, be sure that 'convex-hull.js',
 * 'ch-tester.js' and 'convex-hull-tests.json' are all in the same
 * directory. Within that directory, run the following command from
 * the terminal:
 *
 *   node ch-tester.js
 *
 * The results of the test will be printed to the terminal. If more
 * than five tests are failed, only the first five failing tests are
 * reported.
 *
 * Note: The program assumes that the coordinates of points are
 * **standard coordinates,** i.e., that y-coordinates increase in the
 * upward direction.
 */

const ConvexHull = require('./convex-hull.js').ConvexHull;
const PointSet = require('./convex-hull.js').PointSet;
const fs = require('fs');
const INPUT_FILE_NAME = "convex-hull-tests.json";

function pointSetFromString(str) {
    const ps = new PointSet();
    
    // start: thanks ChatGPT!
    const regex = /-?\d+(\.\d+)?/g; 
    const vals = str.match(regex).map(Number);
    // end

    for (let i = 0; i < vals.length - 1; i += 2) {
	let x = vals[i];
	let y = vals[i+1];
	ps.addNewPoint(x, y);
    }

    return ps;
}

function getTests() {
    const data = fs.readFileSync(INPUT_FILE_NAME, 'utf8');
    return JSON.parse(data);
}

function runTests() {

    const tests = getTests();

    let errorCounter = 0;

    for (let test of tests.results) {
	let input = test.input;
	let expectedOutput = test.output;

	let ps = pointSetFromString(input);
	let ch = new ConvexHull(ps, null);
	
	let actualOutput = ch.getConvexHull().toString();
	
	if (expectedOutput != actualOutput) {
            console.log(`Test failed\n` +
			`  input: ${input}\n` +
			`  expected output: ${expectedOutput}` +
			`  actual output: ${actualOutput}`);
            if (++errorCounter >= 5) {
		console.log("You have failed 5 test cases. The tester will now terminate.");
            }
	}
    }

    if (errorCounter == 0) {
	console.log("Great job!! You passed all of the test cases.");
    }

}

runTests();

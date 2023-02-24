const applyRule = require('./cellular-automata.js').applyRule;
const fs = require('fs');
const INPUT_FILE_NAME = "ca-tests.json";

function runTests() {
    let testData;

    // Make sure the correct files exist to read in from
    try {
        testData = readObjectsFromFile(INPUT_FILE_NAME).results;
    }
    catch (e) {
        console.log(`Your imports failed with error message:\n\n${e}\n\nPlease make sure you have the file `
                    + `\`${INPUT_FILE_NAME}\` in the same directory as this code.`);
        return;
    }

    // A variable to track the number of errors
    // Once we pass 5 errors, the code will stop running.
    let errorCounter = 0;

    for (let testCase of testData) {
        let a = testCase.input.a;
        let rule = testCase.input.rule;
        let expectedOut = testCase.output;
        let actualOut = applyRule(a, rule);

        if (expectedOut.join("") != actualOut.join("")) {
            console.log(`Your tester failed! The input data was:\n  a: [${a.join(", ")}], rule: ${rule}\n  The expected output`
                        + ` was:\n  [${expectedOut.join(", ")}]\n  But the actual output was:\n  [${actualOut.join(", ")}]\n\n`);
            if (++errorCounter >= 5) {
                console.log("You have failed 5 test cases. The tester will now terminate.");
                return;
            }
        }
    }

    if (errorCounter == 0) {
        console.log("Great job!! You passed all of the test cases.");
    }
}


function readObjectsFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const objects = JSON.parse(data);
    return objects;
}

runTests();
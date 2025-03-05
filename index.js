const core = require("@actions/core");
const generator = require("./lib/generateReleaseName")

async function run() {
  try {
    // inputs defined in action metadata file
    const delimiter = core.getInput("delimiter");
    const length = core.getInput("length");
    const useToken = core.getInput("useToken");
    const capitalize = core.getInput("capitalize");
    let debug = core.getInput("debug");
    debug = debug ? debug.toLowerCase() === 'true' : false;

    if (debug) {
      console.log(
        `input parameters: ${delimiter} ${length} ${useToken} ${capitalize}`
      );
    }

    var releaseName = generator(
      delimiter,
      length,
      useToken,
      capitalize,
      debug
    );

    core.setOutput("release-name", releaseName);
    console.log(`the release-name: ${releaseName}`);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    if (debug) {
      console.log(
        `error: ${error.message} ${length} ${useToken} ${capitalize}`
      );
    }
    core.setFailed(error.message);
  }
}

exports.run = run;

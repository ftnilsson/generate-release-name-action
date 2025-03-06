const core = require("@actions/core");
const generator = require("./lib/generateReleaseName")

async function run() {
    // inputs defined in action metadata file
    const delimiter = core.getInput("delimiter");
    const lengthStr = core.getInput("length");
    const useTokenStr = core.getInput("useToken");
    const capitalizeStr = core.getInput("capitalize");
    console.log(`input parameters before: ${delimiter} ${lengthStr} ${useTokenStr} ${capitalizeStr}`);


  try {
    const length = isNaN(parseInt(lengthStr)) ? 2 : parseInt(lengthStr);
    const useToken = useTokenStr?.toLowerCase() === "true";
    const capitalize = capitalizeStr?.toLowerCase() === "true";

    console.log(`input parameters: ${delimiter} ${length} ${useToken} ${capitalize}`);

    var releaseName = generator(
      delimiter,
      length,
      useToken,
      capitalize
    );

    core.setOutput("release-name", releaseName);
    console.log(`the release-name: ${releaseName}`);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
      core.setFailed(error.message);
  }
}

exports.run = run;

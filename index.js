const core = require('@actions/core');
const github = require('@actions/github');
const { generate } = require("awesome-release-name-generator/lib/es5");

try {
  // inputs defined in action metadata file
  const delimiter = core.getInput('delimiter');
  const length = core.getInput('length');
  const useToken = core.getInput('useToken');
  const capitalize = core.getInput('capitalize');
  console.log(`input parameters: ${delimiter} ${length} ${useToken} ${capitalize}`); 
  const releaseName = generate(delimiter, length, useToken, capitalize);
  core.setOutput("release-name", releaseName);
  console.log(`the release-name: ${releaseName}`); 
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

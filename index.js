const core = require('@actions/core');
const github = require('@actions/github');

try {
  // inputs defined in action metadata file
  const delimiter = core.getInput('delimiter');
  const length = core.getInput('length');
  const theme = core.getInput('theme');
  const useToken = core.getInput('useToken');
  const capitalize = core.getInput('capitalize');

  console.log(`inputs ${delimiter} ${length} ${theme} ${useToken} ${capitalize}`);
  const releaseName = (new Date()).toTimeString();
  core.setOutput("release-name", releaseName);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
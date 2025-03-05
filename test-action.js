const core = require('@actions/core');
const index = require('./index');


function run() {
    try {
        // Mock the core.getInput method to provide test input parameters
        core.getInput = (name) => {
            switch (name) {
                case 'delimiter':
                    return '-';
                case 'length':
                    return '3';
                case 'useToken':
                    return 'true';
                case 'capitalize':
                    return 'true';
                case 'debug':
                    return 'false';
                default:
                    return '';
            }
        };

        // Call the main function from index.js
        index.run();

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

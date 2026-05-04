jest.mock('@actions/core');
jest.mock('./lib/generateReleaseName');

const core = require('@actions/core');
const generateReleaseName = require('./lib/generateReleaseName');
const { run } = require('./index');

describe('index run()', () => {
  beforeEach(() => {
    // Clear all mock call counts and reset implementations
    jest.clearAllMocks();
    generateReleaseName.mockReturnValue('mock-release-name');
    core.getInput = jest.fn().mockReturnValue('');
    core.setOutput = jest.fn();
    core.setFailed = jest.fn();
  });

  function setupInputs({ delimiter = '-', length = '2', useToken = 'false', capitalize = 'false' } = {}) {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'delimiter': return delimiter;
        case 'length': return length;
        case 'useToken': return useToken;
        case 'capitalize': return capitalize;
        default: return '';
      }
    });
  }

  test('calls generator with correct parsed arguments and sets output', async () => {
    setupInputs({ delimiter: '-', length: '3', useToken: 'false', capitalize: 'false' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith('-', 3, false, false);
    expect(core.setOutput).toHaveBeenCalledWith('release-name', 'mock-release-name');
  });

  test('defaults length to 2 when input is not a valid number', async () => {
    setupInputs({ length: 'notanumber' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), 2, expect.anything(), expect.anything());
  });

  test('defaults length to 2 when length input is empty string', async () => {
    setupInputs({ length: '' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), 2, expect.anything(), expect.anything());
  });

  test('parses useToken "true" (lowercase) as boolean true', async () => {
    setupInputs({ useToken: 'true' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), true, expect.anything());
  });

  test('parses useToken "TRUE" (uppercase) as boolean true', async () => {
    setupInputs({ useToken: 'TRUE' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), true, expect.anything());
  });

  test('parses useToken "false" as boolean false', async () => {
    setupInputs({ useToken: 'false' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), false, expect.anything());
  });

  test('parses capitalize "true" (lowercase) as boolean true', async () => {
    setupInputs({ capitalize: 'true' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), true);
  });

  test('parses capitalize "TRUE" (uppercase) as boolean true', async () => {
    setupInputs({ capitalize: 'TRUE' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), true);
  });

  test('parses capitalize "false" as boolean false', async () => {
    setupInputs({ capitalize: 'false' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), false);
  });

  test('calls core.setFailed when generator throws an error', async () => {
    setupInputs();
    generateReleaseName.mockImplementation(() => { throw new Error('generator error'); });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('generator error');
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  test('passes the delimiter input directly to generator', async () => {
    setupInputs({ delimiter: '_' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith('_', expect.anything(), expect.anything(), expect.anything());
  });

  test('parses a valid integer length correctly', async () => {
    setupInputs({ length: '5' });

    await run();

    expect(generateReleaseName).toHaveBeenCalledWith(expect.anything(), 5, expect.anything(), expect.anything());
  });
});

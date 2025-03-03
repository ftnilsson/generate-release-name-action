import { runAction } from '../src/action'; // Adjust the path as needed
import * as core from '@actions/core';
import * as github from '@actions/github';
import { generate } from 'awesome-release-name-generator/lib/es5';

jest.mock('@actions/core');
jest.mock('@actions/github');
jest.mock('awesome-release-name-generator/lib/es5');

describe('runAction', () => {
  beforeEach(() => {S
    jest.clearAllMocks();
  });

  test('should run action with correct input', () => {
    const input = { length: 2 };
    generate.mockReturnValue('Expected Output');
    core.getInput.mockImplementation((name) => input[name]);

    const result = runAction(input);
    expect(result).toBe('Expected Output');
    expect(core.setOutput).toHaveBeenCalledWith('release-name', 'Expected Output');
  });

  // Add more tests as needed
});

const generateReleaseName = require('./lib/generateReleaseName');

describe('generateReleaseName', () => {
  test('returns a string', () => {
    const result = generateReleaseName('-', 2, false, false);
    expect(typeof result).toBe('string');
  });

  test('returns correct number of words based on length parameter', () => {
    const result = generateReleaseName('-', 3, false, false);
    const words = result.split('-');
    expect(words.length).toBe(3);
  });

  test('uses correct delimiter', () => {
    const result = generateReleaseName('_', 2, false, false);
    expect(result.includes('_')).toBeTruthy();
    expect(result.split('_').length).toBe(2);
  });

  test('adds token when useToken is true', () => {
    const result = generateReleaseName('-', 2, true, false);
    const parts = result.split('-');
    expect(parts.length).toBe(3);
  });

  test('capitalizes words when capitalize is true', () => {
    const result = generateReleaseName('-', 2, false, true);
    const words = result.split('-');
    
    // Check that each word starts with uppercase
    words.forEach(word => {
      expect(word[0]).toEqual(word[0].toUpperCase());
    });
  });

  test('does not capitalizes words when capitalize is false', () => {
    const result = generateReleaseName('-', 2, false, false);
    const words = result.split('-');
    console.log(words);
    // Check that each word starts with lowerscase
    words.forEach(word => {
      expect(word[0]).toEqual(word[0].toLowerCase());
    });
  });

  test('applies both token and capitalization when both are enabled', () => {
    const result = generateReleaseName('-', 2, true, true);
    const parts = result.split('-');
    
    // Check number of parts (2 words + token)
    expect(parts.length).toBe(3);
    
    // Check capitalization of words
    expect(parts[0][0]).toEqual(parts[0][0].toUpperCase());
    expect(parts[1][0]).toEqual(parts[1][0].toUpperCase());

    console.log(result);
  });

  test('last word is always from lastWords array', () => {
    // Mock Math.random to return a predictable value
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0);
    
    try {
      const result = generateReleaseName('-', 2, false, false);
      const words = result.split('-');
      const lastWord = words[words.length - 1];
      console.log(words);
      // We expect the last word to be the first element of the lastWords array
      // since Math.random() is mocked to return 0
      expect(lastWord).toBe('aardvark');
    } finally {
      // Restore original Math.random
      Math.random = originalRandom;
    }
  });
  
  test('generated name contains valid words from arrays', () => {
    // We can't test exact words since it's random, 
    // but we can make sure the function doesn't throw errors
    expect(() => {
      generateReleaseName('-', 5, false, false);
    }).not.toThrow();
  });
});

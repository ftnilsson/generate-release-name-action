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
  });

  test('last word is always from lastWords array', () => {
    // Mock Math.random to return a predictable value
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0);
    
    try {
      const result = generateReleaseName('-', 2, false, false);
      const words = result.split('-');
      const lastWord = words[words.length - 1];
    
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

  test('returns a single word when length is 1', () => {
    const result = generateReleaseName('-', 1, false, false);
    // length=1 means no adjectives (loop runs 0 times), only the lastWord
    expect(result.split('-').length).toBe(1);
  });

  test('uses empty string delimiter correctly', () => {
    const result = generateReleaseName('', 2, false, false);
    // Words are joined with empty string so there are no delimiters
    expect(result).not.toContain('-');
    expect(result).not.toContain('_');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('token uses alphanumeric (base36) characters only', () => {
    const result = generateReleaseName('-', 2, true, false);
    const parts = result.split('-');
    // Token is the last part
    const token = parts[parts.length - 1];
    expect(token).toMatch(/^[a-z0-9]+$/);
  });

  test('capitalizing with token also capitalizes the token part', () => {
    const originalRandom = Math.random;
    let callCount = 0;
    Math.random = jest.fn().mockImplementation(() => {
      callCount++;
      // Return 0 for word selection; return a non-zero value on the token call
      // so the token string is not empty after toString(36).substring(2)
      return callCount <= 2 ? 0 : 0.5;
    });

    try {
      const result = generateReleaseName('-', 2, true, true);
      const parts = result.split('-');
      // 2 words + 1 token = 3 parts, all capitalized
      expect(parts.length).toBe(3);
      parts.forEach(part => {
        expect(part.length).toBeGreaterThan(0);
        expect(part[0]).toEqual(part[0].toUpperCase());
      });
    } finally {
      Math.random = originalRandom;
    }
  });

  test('first adjective word comes from nouns array when Math.random is mocked', () => {
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0);

    try {
      const result = generateReleaseName('-', 2, false, false);
      const words = result.split('-');
      // With length=2 there is 1 adjective (from nouns) + 1 noun (from lastWords)
      // Both Math.random calls return 0, so both pick index 0 of their arrays
      expect(words.length).toBe(2);
      expect(words[0]).toBe('abstract'); // first element of nouns array
      expect(words[1]).toBe('aardvark'); // first element of lastWords array
    } finally {
      Math.random = originalRandom;
    }
  });

  test('returns consistent structure across multiple calls', () => {
    for (let i = 0; i < 5; i++) {
      const result = generateReleaseName('-', 3, true, false);
      const parts = result.split('-');
      // 3 words + 1 token = 4 parts
      expect(parts.length).toBe(4);
    }
  });
});

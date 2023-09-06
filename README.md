# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `delimiter`

the delimiter that is used between words. Default `"-"`.

### `length`

The number of words for the release name. Default `2`.

### `theme`

Set the theme to use theme to use string | 'baddies' | 'starwars' | 'animals''. Default `"string"`.

### `useToken`

If you want a guarante that your release name is always unique, then you can append a token to the end of the name. Default `false`.

### `capitalize`

Capitalize each word in the release name. Default `false`.

## Outputs

### `release-name`

Your awesome release name

## Example usage

```yaml
uses: actions/generate-release-name-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  length: 2
```

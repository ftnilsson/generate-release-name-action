# Generate release name action

This action generate a release name tag can be used to tag a release.

## Inputs

### `delimiter`

the delimiter that is used between words. Default `"-"`.

### `length`

The number of words for the release name. Default `2`.

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

# awesome release name generator

This returns an awesome release name like:

    creepy-badger
    sleepy-waterfall-nbu5mh2w7l
    Happy_Abstract_Aardvark_nbu5mh2w7l

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

    import releaseNameGenerator from "awesome-release-name-generator";

    const result = releaseNameGenerator(); // using default values

    or

    const result = releaseNameGenerator('-', 2, true, true); // setting specific values
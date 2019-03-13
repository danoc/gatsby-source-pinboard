# gatsby-source-pinboard

[![NPM version](https://badgen.net/npm/v/gatsby-source-pinboard)](https://www.npmjs.com/package/gatsby-source-pinboard) [![Build status](https://badgen.net/travis/danoc/gatsby-source-pinboard)](https://travis-ci.com/danoc/gatsby-source-pinboard)

To use, install the package and add to `gatsby-config.js`:

```bash
yarn add gatsby-source-pinboard
npm install gatsby-source-pinboard
```

```js
{
    resolve: "gatsby-source-pinboard",
    options: {
        authToken: "", // required authentication token
        tags: "" // optional tag to filter links
    }
}
```

You can query the data with:

```graphql
allPinboardBookmark(limit: 3) {
    edges {
        node {
            href
            description
        }
    }
}
```

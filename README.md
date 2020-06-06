# gatsby-source-pinboard

[![NPM version](https://badgen.net/npm/v/gatsby-source-pinboard)](https://www.npmjs.com/package/gatsby-source-pinboard) [![Test build status](https://github.com/danoc/gatsby-source-pinboard/workflows/Test/badge.svg)](https://github.com/danoc/gatsby-source-pinboard/actions?query=workflow%3ATest)

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

# gatsby-source-pinboard

Note: This plugin requires Gatsby v2.

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

```js
allPinboardBookmark(limit: 3) {
    edges {
        node {
            href
            description
        }
    }
}
```

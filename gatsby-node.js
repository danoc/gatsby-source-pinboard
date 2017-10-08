const asyncFill = require("asyncawait/async");
const awaitFill = require("asyncawait/await");
const crypto = require("crypto");
const fetch = require("node-fetch");

exports.sourceNodes = asyncFill(
  ({ boundActionCreators }, { authToken, tags }) => {
    const { createNode } = boundActionCreators;
    const tagsQuery = tags ? `&tag=${tags}` : "";

    const res = awaitFill(
      fetch(
        // https://pinboard.in/api/#posts_recent
        `https://api.pinboard.in/v1/posts/recent?auth_token=${authToken}&format=json&count=100${tagsQuery}`
      )
    );
    const data = awaitFill(res.json());

    // Process data into nodes.
    data.posts.forEach(post => {
      const jsonString = JSON.stringify(post);

      const gatsbyNode = {
        // Fields from Pinboard
        href: post.href,
        description: post.description,
        extended: post.extended,
        time: post.time,
        shared: post.shared,
        toread: post.toread,
        tags: post.tags,

        // Required Gatsby fields
        id: `Pinboard bookmark for ${post.href}`,
        parent: "__SOURCE__",
        children: [],
        internal: {
          type: "PinboardBookmark",
          contentDigest: crypto
            .createHash("md5")
            .update(jsonString)
            .digest("hex")
        }
      };

      createNode(gatsbyNode);
    });
  }
);

const crypto = require("crypto");
const fetch = require("node-fetch");

exports.sourceNodes = async ({ actions }, { authToken, tags }) => {
  const { createNode } = actions;
  const tagsQuery = tags ? `&tag=${tags}` : "";

  const res = await fetch(
    // https://pinboard.in/api/#posts_recent
    `https://api.pinboard.in/v1/posts/recent?auth_token=${authToken}&format=json&count=100${tagsQuery}`
  );

  // We'd normally use `res.json()`, but a Pinboard API bug prevents this from
  // working.
  // https://twitter.com/Pinboard/status/1275764946182144002
  // https://github.com/node-fetch/node-fetch/issues/541
  let text = await res.text();

  if (text.charCodeAt(0) === 0xfeff) {
    text = text.substr(1);
  }

  const data = JSON.parse(text);

  // Process data into nodes.
  data.posts.forEach((post) => {
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
          .digest("hex"),
      },
    };

    createNode(gatsbyNode);
  });
};

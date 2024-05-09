const wooConfiguration = {
  available: function () {
    try {
      new URL(process.env.NEXT_PUBLIC_WOO_GRAPHQL_URL);
      return process.env.NEXT_PUBLIC_WOO_HEADLESS_PUBLIC_ACCESS_TOKEN;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default wooConfiguration;
// Rather than returning any data directly, they return an AsyncIterator which subsequently is used by the GraphQL server 
// to push the event data to the client.
// Resolver; Subscriber; be provided as the value for a subscribe field
function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK");
}
// Subscribe the event NEW_LINK
const newLink = {
  subscribe: newLinkSubscribe,
  // resolve: it actually returns the data from the data emitted by the AsyncIterator (publish)
  resolve: (payload) => {
    return payload;
  },
};

function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

// Subscribe the event NEW_VOTE
const newVote = {
    subscribe: newVoteSubscribe,
    // resolve: it actually returns the data from the data emitted by the AsyncIterator (publish)
    resolve: (payload) => {
      return payload;
    },
};

module.exports = {
  newLink,
  newVote
};

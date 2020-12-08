// Can be omitted
// Link: {
//     id: (parent) => parent.id,
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
// }

/**
 * id, description and url can be omitted
*/

function postedBy(parent, args, context) {
  return context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

function votes(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes()
}

module.exports = {
  postedBy,
  votes
};

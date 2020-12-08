var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { APP_SECRET, getUserId } = require('../utils')

async function vote(parent, args, context, info) {
  // 1
  const userId = getUserId(context);

  // 2
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: { // Multi-field ID attribute
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  // used to create a new Vote that’s connected to the User and the Link
  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

async function post(parent, args, context, info) {
  const userId = getUserId(context);

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

async function updateLink(parent, args, context) {
  const link = await context.prisma.link.update({
    where: { id: parseInt(args.id, 10) },
    data: {
      url: args.url,
      description: args.description,
    },
  });
  return link;
}

async function deleteLink(parent, args, context) {
  const link = await context.prisma.link.delete({
    where: { id: parseInt(args.id, 10) },
  });
  return link;
}

async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
}

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  const user = await context.prisma.user.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

module.exports = {
    vote,
    post,
    updateLink,
    deleteLink,
    signup,
    login
}
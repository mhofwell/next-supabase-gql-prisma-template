import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import Query from '@/lib/graphql/resolvers/Query';
import Mutation from '@/lib/graphql/resolvers/Mutation';
import typeDefs from '../graphql/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import prisma from '../prisma/client';

const schema = makeExecutableSchema({
    resolvers: {
        Query,
        Mutation,
        // Subscription,
    },
    typeDefs,
});

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req, res) => ({
        req,
        res,
        prisma,
        greeting: 'hey',
    }),
});

export default handler;

import Bitcoin from './connectors';

export const typeDefs = [`
  type Bitcoin {
    price: Int
    averagePrice: Int
    inputTime: Int
    percentChange: Float
  }

  type RootQuery {
    bitcoin(inputTime: Int!): Bitcoin
  }

   schema {
    query: RootQuery
  }
`,
];

export const resolvers = {
  RootQuery: {
    bitcoin: (root, args, context) => Bitcoin.getData(args)
  },
  Bitcoin: {
    price: ({ price }) => price,
    averagePrice: ({ averagePrice }) => averagePrice,
    inputTime: ({ inputTime }) => inputTime,
    percentChange: ({ percentChange }) => percentChange,
  }
};
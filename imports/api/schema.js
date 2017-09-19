import Bitcoin from './connectors';

export const typeDefs = [`
  type Bitcoin {
    price: Int
    averagePrice: Int
    inputTimeOne: Int
    inputTimeTwo: Int
    percentChangeOne: Float
    percentChangeTwo: Float
  }

  type RootQuery {
    bitcoin(inputTimeOne: Int!, inputTimeTwo: Int!): Bitcoin
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
    inputTimeOne: ({ inputTimeOne }) => inputTimeOne,
    percentChangeOne: ({ percentChangeOne }) => percentChangeOne,
    inputTimeTwo: ({ inputTimeTwo }) => inputTimeTwo,
    percentChangeTwo: ({ percentChangeTwo }) => percentChangeTwo,
  }
};
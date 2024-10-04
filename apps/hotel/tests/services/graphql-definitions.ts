const deleteFromcabinsCollectionMutationDefinition = `
mutation deleteFromcabinsCollection($filter: cabinsFilter) {
  deleteFromcabinsCollection(filter: $filter) {
    affectedCount
  }
}
`;

const insertIntocabinsCollectionMutationDefinition = `
mutation insertIntocabinsCollection($cabins: [cabinsInsertInput!]!) {
  insertIntocabinsCollection(objects: $cabins) {
    affectedCount
    records {
      id
      namex
    }
  }
}
`;

const updateIntocabinsCollectionMutationDefinition = `mutation updatecabinsCollection($cabins: [cabinsUpdateInput]! ,$booking: [bookingsFilter], $atmost: Int!){
  updatecabinsCollection(set: $cabins ,filter: $booking, atMost: $atmost){
    affectedCount,
    records {
      id 
      name
    }
  }
}
`

const definition = {
  deleteFromcabinsCollectionMutationDefinition,
  insertIntocabinsCollectionMutationDefinition,
  updateIntocabinsCollectionMutationDefinition
};

export default definition;

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

const definition = {
  deleteFromcabinsCollectionMutationDefinition,
  insertIntocabinsCollectionMutationDefinition,
};

export default definition;

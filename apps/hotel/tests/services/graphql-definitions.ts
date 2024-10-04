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
      name
    }
  }
}
`;

const editIntocabinsCollectionMutationDefination = `
    mutation editIntocabinsCollection($id: ID!, $input: cabinsUpdateInput!) {
    updateCabinsCollection(pk_columns: {id: $id}, _set: $input){
    affectedCount
    returning{
    id
      name
      maxCapacity
      regularPrice
      discount
      description
      image
    }}}
`;

const definition = {
  deleteFromcabinsCollectionMutationDefinition,
  insertIntocabinsCollectionMutationDefinition,
  editIntocabinsCollectionMutationDefination,
};

export default definition;

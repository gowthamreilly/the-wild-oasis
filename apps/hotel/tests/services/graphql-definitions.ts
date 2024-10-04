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

const insertIntoBookingsCollectionMutationDefinition = `
mutation insertIntobookingsCollection($bookings:[bookingsInsertInput!]!){
  insertIntobookingsCollection(objects:$bookings){
    affectedCount
    records{
      nodeId
      id
      created_at
      startDate
      endDate
      numNights
      numGuests
      cabinPrice
      extrasPrice
      totalPrice
      status
      hasBreakfast
      isPaid
      observations
      cabinId
      guestId
    }
  }
}
`;

const definition = {
  deleteFromcabinsCollectionMutationDefinition,
  insertIntocabinsCollectionMutationDefinition,
  insertIntoBookingsCollectionMutationDefinition,
};

export default definition;

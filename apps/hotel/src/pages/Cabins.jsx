import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal" aria-label="cabin-header">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row aria-label="cabin-data">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

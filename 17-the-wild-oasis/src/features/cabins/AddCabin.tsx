import CreateEditCabinForm from "./CreateEditCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      {/* <Modal.Open opens="cabin-form">
        <Button>Add cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form"></Modal.Window> */}

      <Modal.Open opens="table">
        <Button>Add cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateEditCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// !the old modal control
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   function handleCloseModal() {
//     setIsOpenModal(false);
//   }
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((s) => !s)}>Add Cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={handleCloseModal}>
//           {<CreateEditCabinForm onCloseModal={handleCloseModal} />}
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;

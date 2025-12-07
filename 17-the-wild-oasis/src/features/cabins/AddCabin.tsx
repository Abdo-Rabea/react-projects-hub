import CreateEditCabinForm from "./CreateEditCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateEditCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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

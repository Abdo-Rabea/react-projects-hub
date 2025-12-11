import styled from "styled-components";
import type { Cabin } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";
import CreateEditCabinForm from "./CreateEditCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateEditCabin";
import type { CabinPayload } from "../../types/FormCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createEditCabin: createCabin } = useCreateEditCabin();

  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  function handleDuplicateCabin() {
    const duplicatedCabin: CabinPayload = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    };
    createCabin({ data: duplicatedCabin });
  }
  return (
    <Table.Row>
      <Img src={image || "/cabin-placeholder.png"} alt={String(cabin.name)} />
      <CabinName>{name}</CabinName>
      <div>fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* don't bather yourself alot as most the component here only returns the same children with only adding some functionalities */}
        <Modal>
          <Menus.Toggle icon={<HiOutlineDotsVertical />} id={id} />
          <Menus.Menu>
            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
              >
                duplicate
              </Menus.Button>

              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="confirm-delete">
                <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit-cabin">
            <CreateEditCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="Cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

import styled from "styled-components";
import type { Cabin } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateEditCabinForm from "./CreateEditCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateEditCabin";
import type { CabinPayload } from "../../types/FormCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
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
  const [showEditForm, setShowOpenForm] = useState<boolean>(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createEditCabin: createCabin, isWorking } = useCreateEditCabin();

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
    <TableRow>
      <Img src={image || "/cabin-placeholder.png"} alt={String(cabin.name)} />
      <Cabin>{name}</Cabin>
      <div>fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicateCabin} disabled={isWorking}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin">
            <button
              onClick={() => setShowOpenForm((open) => !open)}
              disabled={isDeleting}
            >
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Open opens="confirm-delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

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
    </TableRow>
  );
}

export default CabinRow;

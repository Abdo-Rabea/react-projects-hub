import styled from "styled-components";
import type { Cabin } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateEditCabinForm from "./CreateEditCabinForm";

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

  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    mutationKey: ["cabins"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully");
    },
    // * the error passed here is the one thrown using mutation function
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <TableRow>
        <Img src={image || "/cabin-placeholder.png"} alt={String(cabin.name)} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button
            onClick={() => setShowOpenForm((open) => !open)}
            disabled={isDeleting}
          >
            Edit
          </button>
          <button onClick={() => mutate(id)} disabled={isDeleting}>
            delete
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateEditCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;

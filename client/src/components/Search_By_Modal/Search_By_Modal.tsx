import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSearchBy } from "../../redux/slice/searchSlice";
import { AppDispatch } from "../../redux/store";
import * as SBModal from "./Search_By_Modal_Styled";

interface ISearchByModal {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSearchBy: ActionCreatorWithPayload<any, string>;
  isModalOpen: boolean;
}

const SearchByModal: React.FC<ISearchByModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  const handleSelect = (option: string) => {
    dispatch(setSearchBy(option));
    setIsModalOpen(false);
  };

  return (
    <SBModal.ModalContainer
      centered={true}
      show={isModalOpen}
      onEscapeKeyDown={() => setIsModalOpen(false)}
      onBackdropClick={() => setIsModalOpen(false)}
      size="xl"
    >
      <SBModal.Body>
        <div
          onClick={() => {
            handleSelect("ingredients");
          }}
        >
          <span>Search by Ingredients</span>
          <div />
        </div>
        <div
          onClick={() => {
            handleSelect("name");
          }}
        >
          <span>Search by Name</span>
          <div />
        </div>
      </SBModal.Body>
    </SBModal.ModalContainer>
  );
};

export default SearchByModal;

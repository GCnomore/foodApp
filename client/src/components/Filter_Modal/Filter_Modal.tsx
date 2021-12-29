import { Modal, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import {
  CustomToggleButton,
  DeleteIngredButtonContainer,
  FilterContainer,
} from "./Filter_Modal_Styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addExcludes,
  removeExcludes,
  setCheckFilters,
  setShowFilter,
  resetIngredients,
  resetFilters,
} from "../../redux/slice/searchSlice";
import ICheckFilters from "../../data/interfaces/Check_Filters";

const FilterModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showFilter, excludes, checkFilters } = useSelector(
    (state: RootState) => state.search
  );

  const excludesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [localExcludes, setLocalExcludes] = useState<string[]>([]);
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  const renderFilter = (
    filter: ICheckFilters,
    variant: string
  ): JSX.Element => {
    return (
      <div>
        <CustomToggleButton
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant={variant}
          checked={filter.checked}
          value="1"
          onChange={() => {
            dispatch(setCheckFilters(filter));
          }}
        >
          {filter.name}
        </CustomToggleButton>
      </div>
    );
  };

  const handleSaveAndClose = () => {
    dispatch(addExcludes(localExcludes));
    setLocalExcludes([]);
    dispatch(setShowFilter(false));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLocalExcludes([...localExcludes, excludesRef.current.value]);
      excludesRef.current.value = "";
    }
  };

  const onHide = () => {
    dispatch(setShowFilter(false));
    setLocalExcludes([]);
  };

  return (
    <Modal
      show={showFilter}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Filter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilterContainer>
          <section>
            <span>Exclude</span>
            <input
              ref={excludesRef}
              placeholder="Ingredients"
              onKeyPress={(e) => {
                handleEnter(e);
              }}
            />
            <ul>
              {excludes?.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    setIngredientsDelete({ show: true, index });
                  }}
                  onMouseLeave={() => {
                    setIngredientsDelete({ show: false, index: 0 });
                  }}
                >
                  {ingredientsDelete.show === true &&
                  ingredientsDelete.index === index ? (
                    <DeleteIngredButtonContainer
                      onClick={() => dispatch(removeExcludes(item))}
                    >
                      <span>x</span>
                    </DeleteIngredButtonContainer>
                  ) : (
                    <></>
                  )}
                  {console.log("itemmmmmm", item)}
                  <span>{item.toLowerCase()}</span>
                </li>
              ))}
              {localExcludes?.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    setIngredientsDelete({ show: true, index });
                  }}
                  onMouseLeave={() => {
                    setIngredientsDelete({ show: false, index: 0 });
                  }}
                >
                  {ingredientsDelete.show === true &&
                  ingredientsDelete.index === index ? (
                    <DeleteIngredButtonContainer
                      onClick={() => dispatch(removeExcludes(item))}
                    >
                      <span>x</span>
                    </DeleteIngredButtonContainer>
                  ) : (
                    <></>
                  )}
                  <span>{item.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div>{renderFilter(checkFilters[4], "outline-primary")}</div>
            <div>
              {renderFilter(checkFilters[0], "outline-danger")}
              {renderFilter(checkFilters[1], "outline-danger")}
              {renderFilter(checkFilters[2], "outline-danger")}
              {renderFilter(checkFilters[3], "outline-danger")}
            </div>
          </section>
        </FilterContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(resetFilters())}>Reset Filters</Button>
        <Button onClick={handleSaveAndClose}>Save & Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;

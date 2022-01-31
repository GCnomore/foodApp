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
  const [_excludes, _setExcludes] = useState<string[]>([]);
  const [_ingredientsDelete, _setIngredientsDelete] = useState<{
    show: boolean;
    index: number;
  }>({
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

  const handleSaveAndClose = (): void => {
    dispatch(addExcludes(_excludes));
    _setExcludes([]);
    dispatch(setShowFilter(false));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      _setExcludes((prev) => [...prev, excludesRef.current.value]);
      excludesRef.current.value = "";
    }
  };

  const onHide = (): void => {
    dispatch(setShowFilter(false));
    _setExcludes([]);
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
                    _setIngredientsDelete({ show: true, index });
                  }}
                  onMouseLeave={() => {
                    _setIngredientsDelete({ show: false, index: 0 });
                  }}
                >
                  {_ingredientsDelete.show === true &&
                  _ingredientsDelete.index === index ? (
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
              {_excludes?.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    _setIngredientsDelete({ show: true, index });
                  }}
                  onMouseLeave={() => {
                    _setIngredientsDelete({ show: false, index: 0 });
                  }}
                >
                  {_ingredientsDelete.show === true &&
                  _ingredientsDelete.index === index ? (
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

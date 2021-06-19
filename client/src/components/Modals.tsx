import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components/macro";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";

interface FilterModalProps {
  show: boolean;
  onHide(): void;
}

export const OpenFilterModal = (props: FilterModalProps) => {
  const [exclude, setExclude] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [checked, setChecked] = useState<{ name: string; checked: boolean }[]>([
    {
      name: "Vegan",
      checked: false,
    },
    {
      name: "Vegitarian",
      checked: false,
    },
    {
      name: "Gluten Free",
      checked: false,
    },
    {
      name: "Dairy Free",
      checked: false,
    },
    {
      name: "No Missing Ingredients",
      checked: false,
    },
    {
      name: "Cuisine",
      checked: false,
    },
    {
      name: "Dish Type",
      checked: false,
    },
  ]);
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  const deleteIngredient = (ingredient: string): void => {
    const update: string[] = exclude.filter(
      (item: string) => item !== ingredient
    );
    setExclude(update);
  };

  const renderFilter = (
    name: { name: string; checked: boolean },
    variant: string
  ): JSX.Element => {
    return (
      <div>
        <CustomToggleButton
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant={variant}
          checked={name.checked}
          value="1"
          onChange={() => {
            name.checked = !name.checked;
            setChecked([...checked]);
          }}
        >
          {name.name}
        </CustomToggleButton>
      </div>
    );
  };

  return (
    <Modal
      {...props}
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
              value={userInput}
              placeholder="Ingredients"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setExclude([...exclude, userInput]);
                  setUserInput("");
                }
              }}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <ul>
              {exclude?.map((item, index) => (
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
                      onClick={(e) => deleteIngredient(item)}
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
            <div>{renderFilter(checked[4], "outline-primary")}</div>
            <div>
              {renderFilter(checked[0], "outline-danger")}
              {renderFilter(checked[1], "outline-danger")}
              {renderFilter(checked[2], "outline-danger")}
              {renderFilter(checked[3], "outline-danger")}
            </div>
            <div>{renderFilter(checked[5], "outline-success")}</div>
            <div>{renderFilter(checked[6], "outline-success")}</div>
          </section>
        </FilterContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const FilterContainer = styled.main`
  > section:nth-child(1) {
    display: flex;
    flex-direction: column;

    > input {
      padding: 0.25rem 0.5rem;
      outline: none;
    }

    > ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin-top: 0.5rem;

      > li {
        margin: 0rem 1rem 0 0;
        padding-top: 1rem;
      }
    }
  }

  > section:nth-child(2) {
    > div {
      display: flex;
      margin: 1rem 0;
      > * {
        margin: 0 0.5rem;
      }
    }
  }
`;

const DeleteIngredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    position: fixed;
    margin-bottom: 0.8rem;
    padding: 0 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const CustomToggleButton = styled(ToggleButton)`
  > input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;

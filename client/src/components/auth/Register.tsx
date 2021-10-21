import { useState } from "react";

import styled from "styled-components";

export default function Register() {
  interface UserInfo {
    email: String;
    password: String;
    confirmPwd: String;
    firstname: String;
    lastName: String;
    dob: Date;
    gender: String;
  }

  const [userInfo, setUserinfo] = useState({
    email: "",
    password: "",
    confirmPwd: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
  });

  return (
    <RegisterContainer>
      <InputContainer>
        <div>
          <span>
            <h2>Account information</h2>
          </span>
          <input
            placeholder="Enter your email address"
            type="email"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            placeholder="Enter your password"
            type="password"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <input
            placeholder="Confirm your password"
            type="password"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, confirmPwd: e.target.value }))
            }
          />
        </div>
        <div>
          <span>
            <h2>Personal information</h2>
          </span>
          <input
            placeholder="First name"
            type="text"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <input
            placeholder="Last name"
            type="text"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <input
            type="date"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
          <input
            placeholder="gender"
            onChange={(e) =>
              setUserinfo((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
        </div>
        <div>
          <button onClick={() => console.log(userInfo)}>Submit</button>
        </div>
      </InputContainer>
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div``;
const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;

    > input {
      margin: 0.5rem 0;
      height: 1.5rem;
    }

    > button {
      width: 8rem;
      height: 3rem;
      border-radius: 4rem;
      border: none;
      transition: 0.8s;
      box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
    }

    > button:active {
      filter: brightness(70%);
      transform: scale(0.97);
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      transition: 0.2s;
    }
  }
`;

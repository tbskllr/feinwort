import Signup from "../components/Signup";
import Signin from "../components/Signin";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";

const Columns = styled.div`
  width: 100%;
`;

const SigninPage = () => {
  return (
    <div>
      <Columns>
        <Signin />
      </Columns>
    </div>
  );
};

export default SigninPage;

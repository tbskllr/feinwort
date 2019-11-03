import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/referenzen">
          <a>Referenzen</a>
        </Link>
        <Link href="/kontakt">
          <a>Kontakt</a>
        </Link>
        {me && (
          <>
            <Link href="/upload">
              <a>Upload</a>
            </Link>
            <Signout />
          </>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

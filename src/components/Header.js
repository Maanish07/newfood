// import React, { useContext, useEffect, useState } from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import UserContext from "../utils/UserContext";

// function Header() {
//   const { user, setUser } = useContext(UserContext);
//   const cartItem = useSelector((store) => store.cart.items);

//   useEffect(() => {
//     const jwtCookie = Cookies.get("jwt");
//     if (jwtCookie) {
//       try {
//         const decoded = jwtDecode(jwtCookie);
//         setUser(decoded.email);
//       } catch (error) {
//         console.error("Invalid token specified:", error);
//       }
//     } else {
//       console.warn("JWT cookie is not available.");
//     }
//   }, [setUser]);

//   return (
//     <Navbar bg="light" variant="light" expand="lg" fixed="top">
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
//           <span className="ms-3 fs-3">The Night Manager</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto">
//             {user ? (
//               <>
//                 <Nav.Link as={Link} to="/myorder" className="fs-5">
//                   My Order
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/pics" className="fs-5">
//                   Upload
//                 </Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={Link} to="/login" className="fs-5">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/signup" className="fs-5">
//                   Signup
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//           <Nav className="d-flex align-items-center">
//             <Nav.Link
//               as={Link}
//               to="/cart"
//               className="d-flex align-items-center"
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/25/25619.png"
//                 alt="Cart"
//                 className="me-2"
//                 style={{ width: "24px", height: "24px" }}
//               />
//               <span className="fs-5">{cartItem.length}</span>
//             </Nav.Link>
//             {user && <span className="ms-3 fs-5">Hey,{user}</span>}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserContext from "../utils/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const cartItem = useSelector((store) => store.cart.items);

  useEffect(() => {
    const jwtCookie = Cookies.get("jwt");
    if (jwtCookie) {
      try {
        const decoded = jwtDecode(jwtCookie);
        setUser(decoded.email);
      } catch (error) {
        console.error("Invalid token specified:", error);
      }
    } else {
      console.warn("JWT cookie is not available.");
    }
  }, [setUser]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-semibold">
          <span className="ml-3 text-3xl">The Night Manager</span>
        </Link>
        <button className="block lg:hidden text-gray-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <div className="lg:flex lg:space-x-4">
            {user ? (
              <>
                <Link
                  to="/myorder"
                  className="text-lg text-gray-700 hover:text-gray-900"
                >
                  My Order
                </Link>
                <Link
                  to="/pics"
                  className="text-lg text-gray-700 hover:text-gray-900"
                >
                  Upload
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg text-gray-700 hover:text-gray-900"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
          <Link to="/cart" className="relative flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25619.png"
              alt="Cart"
              className="w-6 h-6"
            />
            <span className="ml-2 text-lg">{cartItem.length}</span>
          </Link>
          {user && <span className="ml-3 text-lg">Hey, {user}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Header;

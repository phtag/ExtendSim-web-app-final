import React from "react";
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import "../assets/css/style.css";

// const Navbar = (props) => {
//   const { currentUser } = useContext(CounterContext);
//   if (!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="Scenario-navbar-option")].enabled) {
//     return (
//       <div>
//         <Link 
//           className="navbar-menu-items" 
//           to="/">
//           Home
//         </Link>
//         <Link className="navbar-menu-items" to="/signup">Signup</Link>
//         <Link className="navbar-menu-items" to="/login">Login</Link>
//       </div>
//     )     
//   }
//   else {
//     if (!props.state.validationObjects[props.state.validationObjects.findIndex(obj => obj.name==="Results-navbar-option")].enabled) {
//       return (
//         <div>
//           <Link 
//             className="navbar-menu-items" 
//             to="/">
//             Home
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/signup">
//             Signup
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/login">
//             Login
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/scenarios">
//             Scenarios
//           </Link>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <Link 
//             className="navbar-menu-items" 
//             to="/">
//             Home
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/signup">
//             Signup
//           </Link>
//           <Link           
//             className="navbar-menu-items" 
//             to="/login">
//             Login
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/scenarios">
//             Scenarios
//           </Link>
//           <Link 
//             className="navbar-menu-items" 
//             to="/results">
//             Results
//           </Link>
//         </div>
//       );
//     }
//   };
// };

function Navbar() {
  return (
    <UserContext.Consumer>
      {({username}) => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            ExtendSim ASP Home
          </Link>
          {username ? (
            <div>Hello, {username}</div>
          ): (
            <div className="navbar-nav">
              <Link className="nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          )}
        </nav>
      )}
    </UserContext.Consumer>
  );
}


export default Navbar;

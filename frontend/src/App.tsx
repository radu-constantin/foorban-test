import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CheckName } from "./pages/CheckName";
import { CheckUser } from "./pages/CheckUser";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="check-name" element={<CheckName />} />
        <Route path="check-user" element={<CheckUser />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/check-name">Check Name</Link>
          </li>
          <li>
            <Link to="/check-user">Check User</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main style={main as React.CSSProperties}>
        <Outlet />
      </main>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const main = {
  display: "flex",
  justifyContent: "center",
};

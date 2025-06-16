import React from "react";
import Header from "../components/Header";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <div className="grid min-h-screen grid-cols-12">
        <aside 
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'col-span-2' : 'col-span-1'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-gray-100 py-8 px-4 shadow-lg">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg ${
                      isActive ? "bg-gray-300 font-bold" : ""
                    } p-2 text-base font-normal text-gray-900 hover:bg-gray-300 whitespace-nowrap`
                  }
                  end
                >
                  <span className={`ml-3 ${!isExpanded && 'opacity-0'}`}>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `flex items-center rounded-lg ${
                      isActive ? "bg-gray-300 font-bold" : ""
                    } p-2 text-base font-normal text-gray-900 hover:bg-gray-300 whitespace-nowrap`
                  }
                >
                  <span className={`ml-3 ${!isExpanded && 'opacity-0'}`}>About</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    `flex items-center rounded-lg ${
                      isActive ? "bg-gray-300 font-bold" : ""
                    } p-2 text-base font-normal text-gray-900 hover:bg-gray-300 whitespace-nowrap`
                  }
                >
                  <span className={`ml-3 ${!isExpanded && 'opacity-0'}`}>News</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center rounded-lg ${
                      isActive ? "bg-gray-300 font-bold" : ""
                    } p-2 text-base font-normal text-gray-900 hover:bg-gray-300 whitespace-nowrap`
                  }
                >
                  <span className={`ml-3 ${!isExpanded && 'opacity-0'}`}>Login</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
        <main className="col-span-9 h-full py-4 px-3">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;

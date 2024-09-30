import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { seller, user } = useAuth();

  return (
    <div
      className={`dark:bg-gray-900 bg-gray-100 rounded-lg p-5 w-full mt-20 shadow-2xl shadow-gray-400 dark:shadow-black 
    md:w-2/3 md:mt-40 mx-auto`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Profile Page</h1>
      <div className="p-10 text-center flex flex-col gap-2 mb-4">
        <h2 className="text-xl font-semibold capitalize">Hi, {user.name}!!</h2>
        <p>{user.email}</p>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="text-xl dark:bg-slate-800 bg-white p-3 rounded">
          <Link to="/profile/orders" className="w-full block">
            Orders
          </Link>
        </li>
        {seller === "SELLER" && (
          <li className="text-xl dark:bg-slate-800 bg-white p-3 rounded">
            <Link to="/profile/sell-item" className="w-full block">
              Sell Item
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfilePage;

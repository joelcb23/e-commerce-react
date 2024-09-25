import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="dark:bg-gray-900 bg-gray-100 w-1/2 mx-auto rounded-lg p-5">
      <h1 className="text-3xl font-bold text-center mb-4">Profile Page</h1>
      <ul className="flex flex-col gap-2">
        <li className="text-xl dark:bg-slate-800 bg-gray-100 p-3 rounded">
          <Link to="/profile/orders" className="w-full block">
            Orders
          </Link>
        </li>
        <li className="text-xl dark:bg-slate-800 bg-gray-100 p-3 rounded">
          <Link to="/profile/sell-item" className="w-full block">
            Sell Item
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePage;

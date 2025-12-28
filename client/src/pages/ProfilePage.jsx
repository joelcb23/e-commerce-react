import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { seller, user } = useAuth();

  return (
    <section className="my-20">
      <h1 className="text-3xl font-bold text-center mb-4">Your Profile</h1>
      <div className="p-10 text-center flex flex-col gap-2 mb-4">
        <h2 className="text-xl font-semibold capitalize">Hi, {user.name}!!</h2>
        <p>{user.email}</p>
      </div>
      <ul
        className={`
            w-full flex flex-col gap-2
            md:w-2/3 md:mx-auto
            lg:w-1/2
        `}
      >
        <li className="text-xl bg-white p-3 rounded border">
          <Link to="/coming-soon" className="w-full block">
            Wishlist
          </Link>
        </li>
        <li className="text-xl bg-white p-3 rounded border">
          <Link to="/profile/orders" className="w-full block">
            Orders
          </Link>
        </li>
        {seller === "SELLER" ? (
          <li className="text-xl bg-white p-3 rounded border">
            <Link to="/profile/sell-item" className="w-full block">
              Sell Item
            </Link>
          </li>
        ) : (
          <li className="text-xl bg-white p-3 rounded border">
            <Link to="/coming-soon" className="w-full block">
              Become a Seller
            </Link>
          </li>
        )}
        <li className="text-xl bg-white p-3 rounded border">
          <Link to="/coming-soon" className="w-full block">
            Change Password
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ProfilePage;

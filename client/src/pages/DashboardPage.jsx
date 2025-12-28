import React from "react";
import {
  Pie,
  PieChart,
  Legend,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
const Title = () => {
  return <h1 className={`text-3xl font-bold`}>Seller Dashboard</h1>;
};
const Element = ({ className, children }) => {
  return (
    <div className={`w-full p-5 text-center rounded-lg border ${className}`}>
      {children}
    </div>
  );
};
const DashboardPage = () => {
  const topCategories = [
    { name: "ACCESSORIES", value: 385, fill: "#0088FE" },
    { name: "TVs", value: 456, fill: "#055DFC" },
    { name: "LAPTOPS", value: 254, fill: "#300DFF" },
  ];

  const becomesByMonth = [
    { name: "Jan", becomes: 3385, amt: 2210 },
    { name: "Feb", becomes: 3456, amt: 2290 },
    { name: "Mar", becomes: 3754, amt: 2000 },
    { name: "Apr", becomes: 2954, amt: 2181 },
    { name: "May", becomes: 3544, amt: 2500 },
    { name: "Jun", becomes: 3214, amt: 2100 },
    { name: "Jul", becomes: 4234, amt: 2100 },
    { name: "Aug", becomes: 3874, amt: 2100 },
    { name: "Sep", becomes: 4563, amt: 2100 },
    { name: "Oct", becomes: 4685, amt: 2100 },
    { name: "Nov", becomes: 4253, amt: 2100 },
  ];
  return (
    <div className={`my-20`}>
      <Title />
      <section
        className={`flex flex-col gap-10 mx-2 my-10 md:mx-0 md:flex-row `}
      >
        {/* Second Section */}
        <div className={`flex flex-col gap-5 order-2 md:order-1 md:w-1/4`}>
          <Element className={`flex flex-col gap-2 py-10`}>
            <h2 className="text-3xl font-bold">$1,2652</h2>
            <p className={`text-xl font-semibold`}>Total Becomes</p>
            <p>
              <span className={`text-red-500 font-semibold`}>0.27%</span> - was
              1,770.5 last week
            </p>
          </Element>
          <Element>
            <h2 className="text-3xl font-bold">346</h2>
            <p className={`text-xl font-semibold`}>Total Shipping</p>
            <p>
              <span className={`text-green-500 font-semibold`}>5.2%</span> - was
              225 yesterday
            </p>
          </Element>
          <Element className={`flex flex-col gap-2 py-10`}>
            <h2 className={`text-lg text-left font-bold`}>Top Categories</h2>
            <PieChart
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "500px",
                maxHeight: "80vh",
                aspectRatio: 1,
              }}
              responsive
            >
              <Label
                value="Categories"
                offset={0}
                position="center"
                fill="#0097a7"
              />
              <Pie
                data={topCategories}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
              />
              <Legend />
            </PieChart>
          </Element>
        </div>
        {/* Main Section */}
        <div className={`flex flex-col gap-5 order-1 md:order-2 md:w-3/4`}>
          <Element className={`flex flex-col py-10`}>
            <h2 className={`text-lg text-left font-bold mb-5`}>Becomes</h2>
            <AreaChart
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "70vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={becomesByMonth}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="becomes"
                stroke="#0097a7"
                activeDot={{ r: 8 }}
                fill="#0097a7"
              />
            </AreaChart>
          </Element>

          <div className={`flex flex-col gap-5 md:flex-row`}>
            <Element className={`text-left`}>
              <h2 className={`text-lg font-bold mb-2`}>Recent Products</h2>
              <ul className="list-disc list-inside">
                <li>Product X - Added on 2024-09-10.</li>
                <li>Product Y - Added on 2024-09-08.</li>
                <li>Product Z - Added on 2024-09-05.</li>
                <li>Product W - Added on 2024-09-01.</li>
              </ul>
            </Element>
            <Element className={` text-left`}>
              <h2 className={`text-lg font-bold mb-2`}>Top Products</h2>
              <ul className="list-disc list-inside">
                <li>Product A - 1,200 units sold.</li>
                <li>Product B - 950 units sold.</li>
                <li>Product C - 870 units sold.</li>
                <li>Product D - 650 units sold.</li>
              </ul>
            </Element>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

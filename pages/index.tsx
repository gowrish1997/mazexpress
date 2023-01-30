import React from "react";
import Country from "@/common/CountrySelector";
import PageHeader from "@/components/orders/PageHeader";
// check user authentication
// if auth send to dash home
// else send to gate

const Home = () => {
  return (
    <>
      <PageHeader content="Dashboard" title="Dashboard | MazExpress" />
      <div className="py-10">
        <h1>Coming soon...</h1>
      </div>
    </>
  );
};

export default Home;

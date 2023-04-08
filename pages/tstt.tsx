//==========================
//     written by: raunak
//==========================

import AuthCTX from "@/components/context/auth.ctx";
import { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import { User } from "@/models/user.model";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Tstt = () => {
  const jet: AuthManager = useContext(AuthCTX)["jet"];
  const [user, setUser] = useState<IWhiteListedUser | null>(jet.getUser());
  const [update_on_backend, set_update_counter] = useState<number>(0);

  const reset_action = async (e: any) => {
    try {
      await jet.mutateUser(
        null,
        { first_name: user && user.first_name === "timmy" ? "bolt" : "timmy" },
        (err, done) => {
          if (err) throw err;
          if (done) {
            console.log("mutated");
          }
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };

  const login_action = async (e: any) => {
    try {
      jet.login("test@testco.com", "Test123$", (err, done) => {
        if (err) throw err;
        if (done) {
          setUser(jet.getUser());
          console.log("logged in");
        }
      });
    } catch (err) {
      if (err) console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };

  const logout_action = async (e: any) => {
    try {
      jet.logout(null, (err, done) => {
        if (err) throw err;
        if (done) {
          console.log("logged out");
          setUser(jet.getUser());
        }
      });
    } catch (err) {
      if (err) console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("calling refresh token");
      // check for update

      // fetch("http://localhost:5000/api/auth")
      //   .then(async (response) => {
      //     console.log("raw response", response);
      //     return await response.json();
      //   })
      //   .then((data) => {
      //     console.log("processed", data);
      //   });
      axios
        .get(`http://localhost:5000/api/auth`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            console.log("from get session: ", response);
            // setToken(response.data.user);
          }
        });
    }
  }, [update_on_backend]);

  return (
    <div className="w-full h-screen flex flex-col items-center pt-[200px]">
      <p>clean - {user ? `hi ${user.first_name}` : "no user"}</p>

      <button onClick={reset_action} className="border shadow">
        reset
      </button>
      {user ? (
        <button onClick={logout_action} className="border shadow">
          logout
        </button>
      ) : (
        <button onClick={login_action} className="border shadow">
          login
        </button>
      )}
    </div>
  );
};

export default Tstt;

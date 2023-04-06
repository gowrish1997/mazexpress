import { User } from "@/models/user.model";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Tstt = () => {
  // const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [update_on_backend, set_update_counter] = useState<number>(0);

  const reset_action = async (e: any) => {
    console.log("calling reset action");
    try {
      axios
        .put(
          `http://localhost:5000/api/users/${user.email}`,
          {
            // first_name: "bolt",
            first_name: user.first_name === "bolt" ? "fluffy" : "bolt",
          }
          // { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          set_update_counter((prev) => prev + 1);
          setUser((response.data.data as User[])[0] as User);
        })
        .catch((err) => {
          if (err) throw err;
        });
    } catch (err) {
      console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };

  const login_action = async (e: any) => {
    try {
      axios
        .post(`http://localhost:5000/api/auth/login/password`, {
          username: "test@testco.com",
          password: "Test123$",
        })
        .then((response) => {
          console.log("from login action: ", response);
          // setToken(respons);
          setUser(response.data.data[0]);
        })
        .catch((err) => {
          if (err) throw err;
        });
    } catch (err) {
      if (err) console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };
  const logout_action = async (e: any) => {
    try {
      axios
        .post(`http://localhost:5000/api/auth/logout`, {
          // withCredentials: true,
        })
        .then((response) => {
          console.log("from logout: ", response);
          setUser(null);
        })
        .catch((err) => {
          if (err) throw err;
        });
    } catch (err) {
      if (err) console.error(err);
    } finally {
      set_update_counter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log("inside refresh token");
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

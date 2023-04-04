import { User } from "@/models/user.model";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Tstt = () => {
  const [id, setId] = useState<User>();
  const [update_on_backend, set_update_counter] = useState<number>(0);

  const reset_action = async (e: any) => {
    console.log("calling reset action");
    try {
      axios
        .put(
          `http://localhost:5000/api/users/${id.email}`,
          {
            // first_name: "bolt",
            first_name: id.first_name === "bolt" ? "fluffy" : "bolt",
          }
          // { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          set_update_counter((prev) => prev + 1);
          // setId((response.data as User[])[0] as User);
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
          setId(response.data.user);
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
          console.log("from get session: ", response.data);
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
    console.log("calling side effect: ", update_on_backend);
    axios
      .get(`http://localhost:5000/api/auth`, {
        // withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          console.log("from get session: ", response.data);
          setId(response.data.user);
        }
      });
  }, [update_on_backend]);

  return (
    <div className="w-full h-screen flex flex-col items-center pt-[200px]">
      <p>clean - {id ? `hi ${id.first_name}` : "no id"}</p>

      <button onClick={reset_action} className="border shadow">
        reset
      </button>
      {id ? (
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

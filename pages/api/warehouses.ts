import { data } from "./../../components/admin/MazStats/StatGraph";
import fetchJson from "@/lib/fetchServer";

export default function handler(req, res) {
  // call to api here
  fetchJson("/api/warehouses")
    .then((response) => res.json({ data: response.data }))
    .catch((err) => {
      console.error(err);
      res.status(200).json({ message: "error" });
    });
}

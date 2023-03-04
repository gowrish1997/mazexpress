import { createContext } from "react";
import { DataSource } from "typeorm";

interface IDSContext {
  db: DataSource | null;
  setDb: (db: DataSource | null) => void;
}

const DSContext = createContext<IDSContext>({
  db: null,
  setDb: (db) => {},
});

export default DSContext;

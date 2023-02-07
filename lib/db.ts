import knex from "knex";

/**
 * Register service.
 * @description Stores instances in `global` to prevent memory leaks in development.
 * @arg {string} name Service name.
 * @arg {function} initFn Function returning the service instance.
 * @return {*} Service instance.
 */

const registerService = (name: string, initFn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    // console.log(global);
    if (typeof globalThis[name as keyof typeof globalThis] === "undefined") {
      Object.defineProperty(global, name, {
        value: initFn(),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
    return global[name as keyof typeof global];
  }
  return initFn();
};

const db = registerService("db", () =>
  knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      port: parseInt(process.env.DB_PORT!),
    },
  })
);

export { registerService, db };

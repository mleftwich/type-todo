import Chance from "chance";
import {
  Factory,
  Model,
  RestSerializer,
  Server,
  belongsTo,
  hasMany,
} from "miragejs";

const chance = new Chance();

export function makeServer() {
  const server = new Server({
    serializers: {
      todo: RestSerializer.extend({
        serializeIds: "always",
      }),
      users: RestSerializer.extend({
        include: ["todo"],
        serializeIds: "always",
        embed: true,
      }),
    },
    models: {
      todo: Model.extend({
        user: belongsTo(),
      }),
      user: Model.extend({
        todos: hasMany(),
      }),
    },
    factories: {
      user: Factory.extend({
        id(i: number) {
          return Number(i + 1);
        },
        firstName() {
          return chance.first();
        },
        lastName() {
          return chance.last();
        },
      }),
      todo: Factory.extend({
        name() {
          return chance.sentence({ words: 10 });
        },
        isComplete: chance.bool({ likelihood: 50 }),
      }),
    },
    seeds(server) {
      const users = server.createList("user", 5);
      for (const user of users) {
        server.createList("todo", chance.integer({ min: 0, max: 1 }), {
          user: user,
        } as any);
      }
    },
    routes() {
      this.namespace = "api";
      this.get("/users", (schema: any) => {
        return schema.users.all();
      });
      this.get("/user/:id/todos", (schema: any, request) => {
        const userID = request.params.id;
        const todos = schema.todos.where({ userID: userID });
        return {
          todos: todos,
        };
      });

      // todo apis
      this.get("/todos", (schema: any, request) => {
        return schema.todos.all();
      });
    },
  });

  return server;
}

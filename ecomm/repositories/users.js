import fs from "node:fs";
import crypto from "node:crypto";
import util from "node:util";

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      }),
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");

    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();

    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };

    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString("hex");
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2),
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    const userRecord = records.find((record) => record.id === id);

    if (!userRecord) {
      throw new Error("The record does not exist!");
    }
    return userRecord;
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);

    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with ${id} is not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }
}

export default new UsersRepository("users.json");

// const test = async () => {
//   const repo = new UsersRepository("users.json");

//   const user = await repo.getOne("8258ed82");

//   await repo.delete("88ad6d29");

//   const user = await repo.getOneBy({
//     email: "test@gmail.com",
//     password: "myPassword",
//   });

//   await repo.update("0803cc6e", { password: "myPassword" });

//   await repo.create({ email: "test@gmail.com", password: "password" });

//   const users = await repo.getAll();

//   console.log(user);
// };

// test();

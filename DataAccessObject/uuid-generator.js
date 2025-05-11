const { v4: uuidv4 } = require("uuid");
class UuidGenerator {
  get get_uuid() {
    return uuidv4();
  }
}

module.exports = UuidGenerator;

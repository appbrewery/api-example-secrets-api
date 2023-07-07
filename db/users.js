var records = [];

exports.findByToken = function (token, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];

      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

exports.addRecord = function (username, token) {
  console.log(records);
  records.push({
    username: username,
    token: token,
    secrets: [],
  });
};

exports.addSecret = function (username, secret) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      record.secrets.push(secret);
    }
  }
};

exports.updateRecord = function (username, id, newData) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      for (var i = 0, len = record.secrets.length; i < len; i++) {
        var secret = record.secrets[i];
        if (secret.id === id) {
          console.log(newData);
          console.log(record.secrets);
          record.secrets[i] = newData;
          console.log(record.secrets);
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
};

exports.checkAlreadyHasToken = function (username) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];

    if (record.username === username) {
      return record.token;
    } else {
      return false;
    }
  }
};

exports.getSecrets = function (username) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];

    if (record.username === username) {
      return record.secrets;
    }
  }
};

exports.getSecretById = function (username, id) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      for (var i = 0, len = record.secrets.length; i < len; i++) {
        var secret = record.secrets[i];
        if (secret.id === id) {
          return secret;
        } else {
          return false;
        }
      }
    }
  }
};

exports.deleteSecretWithId = function (username, id) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      for (var i = 0, len = record.secrets.length; i < len; i++) {
        var secret = record.secrets[i];
        console.log("db", secret);
        console.log("id", id);
        if (secret.id === id) {
          console.log("called");
          record.secrets.splice(i, 1);
          console.log("after", record);
          return true;
        } else {
          return false;
        }
      }
    }
  }
};

exports.deleteRecords = function () {
  records = [];
};

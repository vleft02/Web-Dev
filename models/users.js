class User
{
    constructor(username, password)
    {
        this._username = username;
        this._password = password;
    }

    get username()
    {
        return this._username;
    }
    get password()
    {
        return this._password;
    }

    set username(value){
        this._username = value;
    }

    set password(value)
    {
        this._password =value;
    }

}
class UsersMemoryDAO {
    constructor() {
        this.users = []
    }

    findAll() {
        return this.users;
    }

    find(username,password) {
        return this.users.find(user => user.username === username && user.password === password);
    }

    save(user) {
        this.users.push(user);
    }
 
    remove(username) { 
        this.users = this.users.filter(user => user.username !== username);
    }
    removeAll(){
        this.users = [];
    }
}

class UsersMongoDBDAO {
    constructor(db) {
        this.db = db;
        this.collection = db.collection('users');
    }
    //Database code
}

class UsersDAOFactory {
    static createUsersDAO(databaseType) {
      switch (databaseType) {
        case 'Memory':
          return new UsersMemoryDAO();
        case 'MongoDB':
          return new UsersMongoDBDAO();
        default:
          throw new Error('Unsupported database type');
      }
    }
  }
  
class Initializer 
{
    static deleteAll(dao)
    {
        dao.removeAll()
    }
    static prepareData(dao)
    {
        dao.save(new User("vleft","190102ab"))
        dao.save(new User("vleftakis","190102ab"))
    }
}
module.exports = 
{
    UsersDAOFactory,
    Initializer
}
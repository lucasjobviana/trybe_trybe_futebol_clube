const passwordEntry = 'secret_admin';
const passwordHash = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const userWithPassword = {
    username: 'User 1',
    email: 'admin@admin.com',
    role: 'user',
}

const user = {
    ...userWithPassword,
    password: passwordEntry,
};


const userWithCryptPassword = {
    ...userWithPassword,
    password: passwordHash,
};

const users = [user];
  
  export {
    user,
    users,
    userWithCryptPassword,
  };
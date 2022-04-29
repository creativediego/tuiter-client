import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById
} from '../services/users-service';

// sample user to insert
const ripley = {
  username: 'ellenripley',
  email: 'ellenripley@aliens.com',
  accountType: 'Personal',
  birthday: '01-02-1970',
  password: 'ripley123',
  bio: 'kill all aliens',
};

describe('createUser', () => {
  test('can insert new users with REST API', async () => {
    // insert new user in the database
    const newUser = await createUser(ripley);
    // verify inserted user's properties match parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.email).toEqual(ripley.email);

    const deleteCount = await deleteUser(newUser.id); //cleanup
    expect(deleteCount).toEqual(1);
  });
});

describe('findUserById', () => {
  // sample user we want to retrieve
  const adam = {
    username: 'adam_smith',
    password: 'not0sum',
    email: 'wealth@nations.com',
  };

  test('can retrieve user from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await createUser(ripley);

    // verify new user matches the parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.email).toEqual(ripley.email);

    // retrieve the user from the database by its primary key
    const existingUser = await findUserById(newUser.id);

    // verify retrieved user matches parameter user
    expect(existingUser.username).toEqual(ripley.username);
    expect(existingUser.email).toEqual(ripley.email);

    const deleteCount = await deleteUser(newUser.id); //cleanup
    expect(deleteCount).toEqual(1);
  });
});

describe('findAllUsers', () => {
  // sample users we'll insert to then retrieve
  const usernames = ['larry', 'curley', 'moe'];

  // setup data before test
  beforeAll(async () =>
    // insert several known users
    usernames.map((username) =>
      createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`,
      })
    )
  );

  afterAll(() =>
    // delete the users we inserted
    usernames.map(async (user) => await deleteUser(user.id))
  );

  test('can retrieve all users from REST API', async () => {
    // retrieve all the users
    const users = await findAllUsers();

    // there should be a minimum number of users
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    // let's check each user we inserted
    const usersWeInserted = users.filter(
      (user) => usernames.indexOf(user.username) >= 0
    );

    // compare the actual users in database with the ones we sent
    usersWeInserted.forEach((user) => {
      const username = usernames.find((username) => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });
  });
});

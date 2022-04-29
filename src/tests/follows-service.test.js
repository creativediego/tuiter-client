import * as userService from '../services/users-service';
import * as followService from '../services/follows-service';


describe('followUser', () => {
    // Sample users to be added
    const david = {
      username: 'david123',
      password: 'david321',
      email: 'david@gmail.com',
    };
    const ripley = {
        username: 'ellenripley',
        email: 'ellenripley@aliens.com',
        accountType: 'Personal',
        birthday: '01-02-1970',
        password: 'ripley123',
        bio: 'kill all aliens',
    };
  
    let davidId = '';
    let ripleyId = '';
  
    // Before each test add our users and record their ids
    beforeAll(async () => {
      const davidUser = await userService.createUser(david);
      const ripleyUser = await userService.createUser(ripley);
  
      davidId = davidUser.id;
      ripleyId = ripleyUser.id;
    });
  
    // After each test remove our users
    afterAll(async () => {
      await followService.unfollowUser(ripleyId, davidId);
      await userService.deleteUser(ripleyId);
      await userService.deleteUser(davidId);
    });
  
    test('user can follow another user', async () => {
      // Perform a follow request to create a new Follow object encapsulating the given relationship
      const follow = await followService.followUser(ripleyId, davidId);
      const davidUser = await userService.findUserById(davidId);
      const ripleyUser = await userService.findUserById(ripleyId);
  
      // Validate the follow object is correctly populated.
      expect(follow.uid).toEqual(ripleyId);
      expect(follow.followeeId).toEqual(davidId);
      expect(davidUser.followeeCount).toEqual(1);
      expect(ripleyUser.followerCount).toEqual(1);
    });
  });

describe('unfollowUser', () => {
    // Sample users to be added
    const charlee = {
        username: 'charlee456',
        password: 'charlee123',
        email: 'Charlee@gmail.com',
      };
      const john = {
          username: 'john_john',
          email: 'john@test.com',
          accountType: 'Personal',
          password: 'Ilovebananas',
      };
    
      let charleeId = '';
      let johnId = '';
    
      // Before each test add our users and submit a follow request
      beforeAll(async () => {
        const charleeUser = await userService.createUser(charlee);
        const johnUser = await userService.createUser(john);
    
        charleeId = charleeUser.id;
        johnId = johnUser.id;

        await followService.followUser(charleeId, johnId);
      });

    // After each test, delete our users
    beforeAll(async () => {
        await userService.deleteUser(charleeId);
        await userService.deleteUser(johnId);        
    });

    test('User can unfollow another user', async () => {
      // Perform a follow request to create a new Follow object encapsulating the given relationship
      const unFollow = await followService.unfollowUser(johnId, charleeId);
      const charleeUser = await userService.findUserById(charleeId);
      const johnUser = await userService.findUserById(johnId);
  
      // Validate the follow object is correctly populated.
      expect(unFollow.uid).toEqual(johnId);
      expect(unFollow.followeeId).toEqual(charleeId);
      expect(charleeUser.followeeCount).toEqual(0);
      expect(johnUser.followerCount).toEqual(0);
    });
});  

describe('findAllFollowers', () => {
    // Sample users to be added
    const spencer = {
        username: 'kingsolomon121',
        password: 'spencerPassword',
        email: 'solomon.sp@cs5500.com',
      };
      const pele = {
          username: 'pele123',
          email: 'pele@aol.com',
          accountType: 'Personal',
          password: 'Goallllllll',
      };
      const ronaldo = {
        username: 'ronaldo456',
        email: 'ronaldo@hotmail.com',
        accountType: 'Personal',
        password: 'MoreGoalsss',
    };
    
      let spencerId = '';
      let peleId = '';
      let ronaldoId = '';
    
      // Before each test add our users and submit a follow request
      beforeAll(async () => {
        const spencerUser = await userService.createUser(spencer);
        const peleUser = await userService.createUser(pele);
        const ronaldoUser = await userService.createUser(ronaldo);
    
        spencerId = spencerUser.id;
        peleId = peleUser.id;
        ronaldoId = ronaldoUser.id;

        await followService.followUser(peleId, spencerId);
        await followService.followUser(ronaldoId, spencerId);
      });

    // After each test, delete our users
    beforeAll(async () => {
        await userService.deleteUser(spencerId);
        await userService.deleteUser(peleId);        
    });

    test('User can unfollow another user', async () => {
      // Perform a follow request to create a new Follow object encapsulating the given relationship
      const followers = await followService.findAllFollowers(spencerId);
  
      // Validate the follow object is correctly populated.
      expect(followers).toHaveLength(2);
      expect(followers[0]).toEqual(pele);
      expect(followers[1]).toEqual(ronaldo);
    });
});
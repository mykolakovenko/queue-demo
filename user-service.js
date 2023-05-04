import faker from 'faker';

export const getUserData = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatarUrl: faker.image.imageUrl(800, 600, 'jpeg'),
});

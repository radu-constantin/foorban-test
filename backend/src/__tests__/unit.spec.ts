import { getAge } from '../helpers/utility';

//Tests involving the getAge function might fail due the nature of the function.
//If tests are run next year for example, it is natural that they fail since the age I'm testing against will not be valid anymore.
describe('Test utility functions', () => {
  test('getAge function returns proper age', () => {
    const dob = '1994-03-14';
    const age = getAge(dob);
    expect(age).toBe(30);
  });

  test('getAge function returns proper age', () => {
    const dob = '1992-08-24';
    const age = getAge(dob);
    expect(age).toBe(31);
  });
});

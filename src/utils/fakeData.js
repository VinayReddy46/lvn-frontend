import { faker } from "@faker-js/faker";

export const categories = [
  "Education",
  "Health",
  "Environment",
  "Animals",
  "Hunger",
  "Homelessness",
  "Disaster Relief",
  "Community Development",
  "Arts & Culture",
  "Human Rights",
  "Children & Youth",
  "Seniors",
  "Sports & Recreation",
  "Technology",
  "International Aid",
];

export const skills = [
  "Teaching",
  "Tutoring",
  "Mentoring",
  "First Aid",
  "Cooking",
  "Carpentry",
  "Gardening",
  "Painting",
  "Cleaning",
  "Driving",
  "Management",
  "Organization",
  "Web Development",
  "Graphic Design",
  "Photography",
  "Writing",
  "Public Speaking",
  "Social Media",
  "Event Planning",
  "Fundraising",
];

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(["user", "org_admin", "system_admin"]),
    joinedDate: faker.date.past(),
    hoursVolunteered: faker.number.int({ min: 0, max: 500 }),
    eventsAttended: faker.number.int({ min: 0, max: 50 }),
    organizations: Array.from({
      length: faker.number.int({ min: 0, max: 5 }),
    }).map(() => faker.company.name()),
  };
}

export function createRandomOrganization() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      faker.company.name()
    )}&background=random`,
    description: faker.company.catchPhrase(),
    website: faker.internet.url(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    country: faker.location.country(),
    categories: Array.from({
      length: faker.number.int({ min: 1, max: 4 }),
    }).map(() => faker.helpers.arrayElement(categories)),
    memberCount: faker.number.int({ min: 5, max: 1000 }),
    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
    verified: faker.datatype.boolean(0.7),
  };
}

export function createRandomOpportunity(org) {
  const organization = org || createRandomOrganization();
  const startDate = faker.date.future();
  const hours = faker.number.int({ min: 1, max: 8 });

  return {
    id: faker.string.uuid(),
    title: `${faker.word.adjective()} ${faker.word.noun()} ${faker.word.verb()}ing`,
    organization,
    description: faker.lorem.paragraphs(3),
    location:
      faker.location.streetAddress() +
      ", " +
      faker.location.city() +
      ", " +
      faker.location.state(),
    date: startDate,
    startTime: faker.date.soon({ refDate: startDate }).toLocaleTimeString(),
    endTime: faker.date
      .soon({ refDate: startDate, days: 0.3 })
      .toLocaleTimeString(),
    hours,
    spots: faker.number.int({ min: 5, max: 50 }),
    spotsRemaining: faker.number.int({ min: 0, max: 20 }),
    skills: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
      () => faker.helpers.arrayElement(skills)
    ),
    categories: Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map(() => faker.helpers.arrayElement(categories)),
    requirements: Array.from({
      length: faker.number.int({ min: 0, max: 3 }),
    }).map(() => faker.lorem.sentence()),
    virtual: faker.datatype.boolean(0.3),
    image: faker.image.urlLoremFlickr({ category: "community" }),
    createdAt: faker.date.past(),
  };
}

export function createRandomRegistration(user, opportunity) {
  const randomUser = user || createRandomUser();
  const randomOpportunity = opportunity || createRandomOpportunity();
  const statusOptions = ["pending", "approved", "rejected", "completed"];
  const status = faker.helpers.arrayElement(statusOptions);
  const registeredAt = faker.date.past();

  return {
    id: faker.string.uuid(),
    user: randomUser,
    opportunity: randomOpportunity,
    status,
    registeredAt,
    checkedIn: status === "completed" ? true : faker.datatype.boolean(0.2),
    ...(status === "completed"
      ? {
          checkedInAt: faker.date.between({
            from: registeredAt,
            to: new Date(),
          }),
          feedback: faker.helpers.maybe(() => faker.lorem.paragraph(), {
            probability: 0.7,
          }),
          rating: faker.number.int({ min: 1, max: 5 }),
        }
      : {}),
  };
}

// Generate collections of data
export function generateUsers(count = 10) {
  return Array.from({ length: count }).map(() => createRandomUser());
}

export function generateOrganizations(count = 5) {
  return Array.from({ length: count }).map(() => createRandomOrganization());
}

export function generateOpportunities(count = 20, orgs) {
  const organizations = orgs || generateOrganizations(5);

  return Array.from({ length: count }).map(() => {
    const randomOrg = faker.helpers.arrayElement(organizations);
    return createRandomOpportunity(randomOrg);
  });
}

export function generateRegistrations(count = 30, users, opportunities) {
  const randomUsers = users || generateUsers(10);
  const randomOpportunities = opportunities || generateOpportunities(10);

  return Array.from({ length: count }).map(() => {
    const randomUser = faker.helpers.arrayElement(randomUsers);
    const randomOpportunity = faker.helpers.arrayElement(randomOpportunities);
    return createRandomRegistration(randomUser, randomOpportunity);
  });
}

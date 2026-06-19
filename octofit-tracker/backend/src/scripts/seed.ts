import { connectDatabase, disconnectDatabase } from '../database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [trailBlazers, coreCrew, sunriseSprinters] = await Team.create([
    {
      name: 'Trail Blazers',
      description: 'Outdoor runners and hikers building endurance together.',
    },
    {
      name: 'Core Crew',
      description: 'Strength-focused athletes tracking consistent gym progress.',
    },
    {
      name: 'Sunrise Sprinters',
      description: 'Early-morning cardio team chasing weekly personal bests.',
    },
  ]);

  const [maya, leo, priya, noah, ava] = await User.create([
    {
      username: 'maya-runs',
      email: 'maya.rivera@example.com',
      displayName: 'Maya Rivera',
      team: trailBlazers._id,
    },
    {
      username: 'leo-lifts',
      email: 'leo.chen@example.com',
      displayName: 'Leo Chen',
      team: coreCrew._id,
    },
    {
      username: 'priya-flow',
      email: 'priya.shah@example.com',
      displayName: 'Priya Shah',
      team: coreCrew._id,
    },
    {
      username: 'noah-trails',
      email: 'noah.brooks@example.com',
      displayName: 'Noah Brooks',
      team: trailBlazers._id,
    },
    {
      username: 'ava-sprints',
      email: 'ava.martinez@example.com',
      displayName: 'Ava Martinez',
      team: sunriseSprinters._id,
    },
  ]);

  await Promise.all([
    Team.findByIdAndUpdate(trailBlazers._id, { members: [maya._id, noah._id] }),
    Team.findByIdAndUpdate(coreCrew._id, { members: [leo._id, priya._id] }),
    Team.findByIdAndUpdate(sunriseSprinters._id, { members: [ava._id] }),
  ]);

  await Activity.create([
    {
      user: maya._id,
      type: 'Trail Run',
      durationMinutes: 46,
      calories: 430,
      activityDate: new Date('2026-06-10T12:00:00Z'),
    },
    {
      user: leo._id,
      type: 'Strength Training',
      durationMinutes: 58,
      calories: 360,
      activityDate: new Date('2026-06-11T18:30:00Z'),
    },
    {
      user: priya._id,
      type: 'Yoga Flow',
      durationMinutes: 40,
      calories: 210,
      activityDate: new Date('2026-06-12T07:15:00Z'),
    },
    {
      user: noah._id,
      type: 'Mountain Hike',
      durationMinutes: 95,
      calories: 690,
      activityDate: new Date('2026-06-13T15:00:00Z'),
    },
    {
      user: ava._id,
      type: 'Interval Sprints',
      durationMinutes: 32,
      calories: 340,
      activityDate: new Date('2026-06-14T10:30:00Z'),
    },
  ]);

  await Leaderboard.create([
    { user: noah._id, score: 9820, rank: 1 },
    { user: maya._id, score: 9140, rank: 2 },
    { user: ava._id, score: 8725, rank: 3 },
    { user: leo._id, score: 8210, rank: 4 },
    { user: priya._id, score: 7840, rank: 5 },
  ]);

  await Workout.create([
    {
      title: 'Beginner Cardio Builder',
      description: 'A low-impact session for building steady aerobic capacity.',
      level: 'beginner',
      durationMinutes: 30,
      exercises: ['Warm-up walk', 'Easy jog intervals', 'Cooldown stretch'],
    },
    {
      title: 'Full Body Strength Circuit',
      description: 'Balanced resistance work for strength and muscular endurance.',
      level: 'intermediate',
      durationMinutes: 45,
      exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank holds'],
    },
    {
      title: 'Advanced Hill Sprint Session',
      description: 'Explosive sprint repeats for speed, power, and conditioning.',
      level: 'advanced',
      durationMinutes: 38,
      exercises: ['Dynamic warm-up', 'Hill sprint repeats', 'Walking recovery', 'Mobility cooldown'],
    },
  ]);

  console.log('Created sample users, teams, activities, leaderboard entries, and workouts.');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
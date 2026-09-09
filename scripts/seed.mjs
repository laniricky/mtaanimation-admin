// Seed script - run with: npm run db:seed
// Populates Neon DB with your existing static data
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS episodes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      synopsis TEXT,
      release_date TEXT,
      thumbnail TEXT,
      video_url TEXT,
      duration TEXT,
      featured BOOLEAN DEFAULT false
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS characters (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      fun_facts TEXT[]
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      snippet TEXT,
      content TEXT,
      date TEXT,
      author TEXT,
      image TEXT
    )
  `;

  console.log("Seeding episodes...");
  await sql`DELETE FROM episodes`;
  await sql`INSERT INTO episodes (title, synopsis, release_date, thumbnail, video_url, duration, featured) VALUES
    ('This Year! Ft. Rolex Noty | 26', 'Ndugu Zangu kwani hamtaki tuomoke wote buana? Follow short memes and skits with the Classics.', '2026-01-09', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_00075.png', 'https://www.youtube.com/embed/pMpRjeyhPF0', '53 seconds', true),
    ('Marafiki Wengine | Classics', 'Ndugu Zangu kwani hamtaki tuomoke wote buana? Follow short memes and skits with the Classics.', '2025-11-23', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/Marafiki001.png', 'https://www.youtube.com/embed/RQRripncUcA', '40 seconds', false),
    ('Smooth Criminals | Bloc Boiz', 'Part 2 of Bloc Boiz. They rob you while advising you to be safe.', '2025-11-17', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/wezipart2.png', 'https://www.youtube.com/embed/4qpIw2GGeRY', '1 Minute 40 seconds', false),
    ('Mwizi Mzembe | Bloc Boiz', 'The first episode introduces the main characters and the world they live in.', '2025-08-15', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_00011.png', 'https://www.youtube.com/embed/pN-4jb8z9Gk', '49 seconds', false),
    ('Drama za Mum', 'Drama za Mum is a hilarious animated series about a Kenyan mother with a special gift.', '2025-08-10', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_01015.png', 'https://www.youtube.com/embed/GUTcEDwVrhk', '1 minute 28 seconds', false),
    ('Loyal Boyfriend', 'She answers sweetly, claiming she is at her grandma house, but faint trap music pulses in the background.', '2025-08-01', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_00615.png', 'https://www.youtube.com/embed/PqmePJp5aA4', '1 minute', false),
    ('The Third Temptation | The Bible', 'In the third temptation, Satan takes Jesus to a very high mountain and shows Him all the kingdoms of the world.', '2025-07-15', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_00016.png', 'https://www.youtube.com/embed/i1b5HDPzJq4', '24 seconds', false),
    ('The Bantaman', 'Batman pops out from behind the bush, and She trusts him with her phone. His name is actually Bantaman.', '2025-07-07', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/frame_00459.png', 'https://www.youtube.com/embed/Lm2vxzMtfWc', '1 minute', false)
  `;

  console.log("Seeding characters...");
  await sql`DELETE FROM characters`;
  await sql`INSERT INTO characters (name, description, image, fun_facts) VALUES
    ('Bloc Boiz', 'A feared three-man street unit known for their smooth, psychological style of robbery. Led by Masta: The calm talker who disarms victims with advice, backed by Bolo: The silent enforcer, and Onyi: the unpredictable hothead.', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/wezipart2.png', ARRAY['Masta once convinced a rival gang to surrender by giving them life advice.', 'Bolo has a reputation for never speaking much but trusted with the loot during a heist.', 'Onyi is a Hothead who likes to fight and you have to be careful around him.'])
  `;

  console.log("Seeding blog posts...");
  await sql`DELETE FROM blog_posts`;
  await sql`INSERT INTO blog_posts (title, snippet, content, date, author, image) VALUES
    ('Street Psychology: How the Bloc Boiz Perfected the Art of Soft Robbery', 'A deep dive into the calm, calculated, and silent techniques that make the Bloc Boiz one of the most feared street crews in the city.', '<p>The Bloc Boiz are not your typical street crew. They don''t rely on loud threats, reckless violence, or chaotic intimidation. Their power comes from something far more unsettling—psychological pressure delivered with surgical precision.</p><p>Comprised of Masta, Bolo, and Onyi, the Bloc Boiz have crafted a style of robbery that feels almost unreal in its smoothness.</p>', '2025-11-18', 'Fredrick Lani', 'https://raw.githubusercontent.com/laniricky/mtaani-files/refs/heads/main/wezipart2.png')
  `;

  console.log("Seed complete!");
}

seed().catch(console.error);

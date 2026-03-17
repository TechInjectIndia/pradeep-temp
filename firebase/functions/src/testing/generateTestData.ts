export interface TestTeacherRecord {
  name: string;
  phone: string;
  email: string;
  school: string;
  city: string;
}

const FIRST_NAMES = [
  'Pradeep',
  'Suresh',
  'Anita',
  'Lakshmi',
  'Rajesh',
  'Meera',
  'Vikram',
  'Pooja',
  'Arun',
  'Deepa',
  'Kavita',
  'Sanjay',
  'Nisha',
  'Ravi',
  'Sunita',
  'Amit',
  'Priya',
  'Manoj',
  'Geeta',
  'Rahul',
  'Neha',
  'Ajay',
  'Swati',
  'Mohan',
  'Rekha',
  'Vivek',
  'Sneha',
  'Ashok',
  'Divya',
  'Kiran',
  'Ramesh',
  'Asha',
  'Nitin',
  'Smita',
  'Gaurav',
  'Jyoti',
  'Pankaj',
  'Shweta',
  'Sunil',
  'Rina',
];

const LAST_NAMES = [
  'Sharma',
  'Patel',
  'Kumar',
  'Singh',
  'Gupta',
  'Verma',
  'Reddy',
  'Nair',
  'Iyer',
  'Joshi',
  'Mishra',
  'Rao',
  'Das',
  'Pillai',
  'Chatterjee',
  'Banerjee',
  'Desai',
  'Mehta',
  'Thakur',
  'Pandey',
];

const SCHOOL_NAMES = [
  'Delhi Public School',
  'Kendriya Vidyalaya',
  "St. Xavier's School",
  'DAV Public School',
  'Ryan International',
  'Army Public School',
  'Holy Cross School',
  'Cambridge School',
  'Modern School',
  'Springdales',
  'Bal Bharati Public School',
  'La Martiniere',
  'Bishop Cotton School',
  'Loreto Convent',
  'Don Bosco School',
  'Sacred Heart School',
  'Presentation Convent',
  'Vidya Mandir',
  'Sarvodaya Vidyalaya',
  'Jawahar Navodaya Vidyalaya',
];

const CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kochi',
  'Chandigarh',
  'Bhopal',
  'Indore',
  'Nagpur',
  'Patna',
  'Surat',
  'Vadodara',
  'Coimbatore',
  'Visakhapatnam',
];

/**
 * Simple seeded pseudo-random number generator (mulberry32).
 * Provides deterministic output for reproducible test data.
 */
function createRng(seed: number): () => number {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickRandom<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function generatePhone(rng: () => number): string {
  const prefixes = ['7', '8', '9'];
  const prefix = pickRandom(prefixes, rng);
  let digits = prefix;
  for (let i = 0; i < 9; i++) {
    digits += Math.floor(rng() * 10).toString();
  }
  return digits;
}

function generateEmail(firstName: string, lastName: string, rng: () => number): string {
  const domains = ['gmail.com', 'yahoo.co.in', 'rediffmail.com', 'hotmail.com', 'outlook.com'];
  const domain = pickRandom(domains, rng);
  const separator = pickRandom(['.', '_', ''], rng);
  const suffix = Math.floor(rng() * 999);
  return `${firstName.toLowerCase()}${separator}${lastName.toLowerCase()}${suffix}@${domain}`;
}

function generateSchool(city: string, rng: () => number): string {
  const schoolName = pickRandom(SCHOOL_NAMES, rng);
  return `${schoolName}, ${city}`;
}

/**
 * Generates an array of realistic Indian teacher records for stress testing.
 *
 * @param count - Number of teacher records to generate.
 *   Approximately 5% will be intentional duplicates (same phone or email
 *   with slight name variations) to exercise duplicate detection logic.
 * @param seed - Optional PRNG seed for deterministic output (default 42).
 */
export function generateTeachers(count: number, seed: number = 42): TestTeacherRecord[] {
  const rng = createRng(seed);
  const teachers: TestTeacherRecord[] = [];
  const duplicateCount = Math.floor(count * 0.05);
  const uniqueCount = count - duplicateCount;

  // Phase 1: Generate unique teachers
  for (let i = 0; i < uniqueCount; i++) {
    const firstName = pickRandom(FIRST_NAMES, rng);
    const lastName = pickRandom(LAST_NAMES, rng);
    const city = pickRandom(CITIES, rng);

    teachers.push({
      name: `${firstName} ${lastName}`,
      phone: generatePhone(rng),
      email: generateEmail(firstName, lastName, rng),
      school: generateSchool(city, rng),
      city,
    });
  }

  // Phase 2: Create ~5% intentional duplicates from existing records.
  // Each duplicate reuses the phone OR email of an existing record but
  // introduces a slight name variation (e.g., swapped first/last, added
  // middle initial, or honorific) so the duplicate-detection logic is
  // exercised rather than trivially de-duped by exact name match.
  for (let i = 0; i < duplicateCount; i++) {
    const sourceIdx = Math.floor(rng() * uniqueCount);
    const source = teachers[sourceIdx];
    const duplicateByPhone = rng() > 0.5;

    // Create a name variation
    const nameParts = source.name.split(' ');
    const variation = rng();
    let variedName: string;
    if (variation < 0.33) {
      // Add a middle initial
      const initial = String.fromCharCode(65 + Math.floor(rng() * 26));
      variedName = `${nameParts[0]} ${initial}. ${nameParts[nameParts.length - 1]}`;
    } else if (variation < 0.66) {
      // Add honorific
      const honorifics = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'];
      variedName = `${pickRandom(honorifics, rng)} ${source.name}`;
    } else {
      // Slight misspelling – double a consonant or drop a vowel
      const first = nameParts[0];
      variedName = `${first}${first.charAt(first.length - 1)} ${nameParts[nameParts.length - 1]}`;
    }

    if (duplicateByPhone) {
      // Same phone, different email
      const newFirst = pickRandom(FIRST_NAMES, rng);
      const newLast = pickRandom(LAST_NAMES, rng);
      teachers.push({
        name: variedName,
        phone: source.phone,
        email: generateEmail(newFirst, newLast, rng),
        school: source.school,
        city: source.city,
      });
    } else {
      // Same email, different phone
      teachers.push({
        name: variedName,
        phone: generatePhone(rng),
        email: source.email,
        school: source.school,
        city: source.city,
      });
    }
  }

  // Shuffle duplicates into the list so they aren't clustered at the end
  for (let i = teachers.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [teachers[i], teachers[j]] = [teachers[j], teachers[i]];
  }

  return teachers;
}

/**
 * Pre-generated 1000 teacher set with deterministic seed.
 */
export function generate1000Teachers(): TestTeacherRecord[] {
  return generateTeachers(1000);
}

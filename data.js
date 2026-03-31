const EVENTS = [
    {
        id: "1",
        title: "Web Slinging Challenge",
        description: "Test your agility and speed in our obstacle course designed for the ultimate wall-crawler.",
        fullDescription: "Join us for the most intense physical challenge of Sandhaan 26. The Web Slinging Challenge is an obstacle course that tests your speed, agility, and reflexes. Participants will navigate through a series of high-altitude platforms, swinging ropes, and precision landing zones. Do you have what it takes to be the next Spider-Man?",
        date: "April 15, 2026",
        category: "Technical",
        image: "https://picsum.photos/seed/websling/800/600",
        schedule: ["09:00 AM - Registration", "10:30 AM - Qualifiers", "02:00 PM - Semi-Finals", "04:30 PM - Finals & Awards"]
    },
    {
        id: "2",
        title: "Daily Bugle Photography",
        description: "Capture the most iconic moments of the fest. Get us pictures of Spider-Man!",
        fullDescription: "J. Jonah Jameson is looking for the best photographers in the city. Your mission is to capture the most dynamic, high-action shots of Sandhaan 26. Whether it's a perfectly timed jump or a candid moment of joy, we want to see it. The best photos will be featured on the front page of the Daily Bugle!",
        date: "April 16, 2026",
        category: "Creative",
        image: "https://picsum.photos/seed/photography/800/600",
        schedule: ["10:00 AM - Briefing", "11:00 AM - Photo Walk Begins", "05:00 PM - Submission Deadline", "07:00 PM - Exhibition"]
    },
    {
        id: "3",
        title: "Stark Tech Hackathon",
        description: "Build the next generation of hero tech using cutting edge AI and robotics.",
        fullDescription: "Stark Industries is opening its doors to the brightest minds. In this 48-hour hackathon, you'll work in teams to develop innovative solutions for global challenges. Use AI, robotics, and sustainable tech to build something that would make Tony Stark proud. Mentors from Stark Industries will be on-site to guide you.",
        date: "April 15-17, 2026",
        category: "Technical",
        image: "https://picsum.photos/seed/hackathon/800/600",
        schedule: ["Day 1: 09:00 AM - Kickoff", "Day 2: 24/7 Coding", "Day 3: 02:00 PM - Demos", "Day 3: 05:00 PM - Winners Announced"]
    },
    {
        id: "4",
        title: "Multiverse Cosplay",
        description: "Show up as your favorite variant from across the Spider-Verse.",
        fullDescription: "The multiverse is collapsing, and everyone is invited! Show off your craftsmanship and performance skills in our Multiverse Cosplay competition. Whether you're Peter B. Parker, Gwen Stacy, or a completely original variant, we want to see your creativity. Prizes for best costume, best performance, and most original variant.",
        date: "April 17, 2026",
        category: "Cultural",
        image: "https://picsum.photos/seed/cosplay/800/600",
        schedule: ["01:00 PM - Green Room Prep", "03:00 PM - Stage Walk", "05:00 PM - Performance Round", "06:30 PM - Crowning of the Champions"]
    },
    {
        id: "5",
        title: "Oscorp Chemistry Lab",
        description: "A high-stakes chemistry competition. Don't turn into a lizard!",
        fullDescription: "Step into the world of advanced biochemistry at the Oscorp Chemistry Lab. This competition challenges your knowledge of molecular structures and chemical reactions. Solve complex puzzles and perform safe but spectacular experiments. Remember: safety first, and try not to accidentally create any cross-species mutations.",
        date: "April 16, 2026",
        category: "Science",
        image: "https://picsum.photos/seed/chemistry/800/600",
        schedule: ["09:30 AM - Lab Safety Briefing", "10:30 AM - Round 1: Theory", "01:30 PM - Round 2: Practical", "04:00 PM - Results"]
    }
];

const SPONSORS = [
    { name: "Stark Industries", logo: "https://picsum.photos/seed/stark/200/100" },
    { name: "Oscorp", logo: "https://picsum.photos/seed/oscorp/200/100" },
    { name: "Daily Bugle", logo: "https://picsum.photos/seed/bugle/200/100" },
    { name: "Baxter Foundation", logo: "https://picsum.photos/seed/baxter/200/100" },
    { name: "Pym Tech", logo: "https://picsum.photos/seed/pym/200/100" },
    { name: "Rand Corp", logo: "https://picsum.photos/seed/rand/200/100" },
    { name: "Roxxon", logo: "https://picsum.photos/seed/roxxon/200/100" },
    { name: "Hammer Adv", logo: "https://picsum.photos/seed/hammer/200/100" },
];

const TIMELINE_DATA = [
    {
        day: "Day 1",
        date: "April 15, 2026",
        title: "The Multiverse Opens",
        description: "Grand opening ceremony followed by the Stark Tech Hackathon kickoff and the first round of Web Slinging Challenge.",
        icon: "zap",
        color: "spidey-red"
    },
    {
        day: "Day 2",
        date: "April 16, 2026",
        title: "Into the Spider-Verse",
        description: "Daily Bugle Photography walk, Oscorp Chemistry Lab competitions, and technical workshops by industry experts.",
        icon: "camera",
        color: "spidey-blue"
    },
    {
        day: "Day 3",
        date: "April 17, 2026",
        title: "The Final Swing",
        description: "Multiverse Cosplay grand finale, Hackathon demos, and the massive closing concert with a surprise guest.",
        icon: "trophy",
        color: "spidey-red"
    }
];

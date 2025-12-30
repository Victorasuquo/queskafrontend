
export interface JobRole {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    tags: string[];
    imageUrl?: string;
}

export const jobRoles: JobRole[] = [
    {
        id: 1,
        title: "Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Internship",
        description: "Join our engineering team to build and scale the Queska frontend platform. You will work with modern technologies like React, TypeScript, and Tailwind CSS to create seamless user experiences.",
        responsibilities: [
            "Develop and maintain responsive web applications.",
            "Collaborate with UI/UX designers to implement design specifications.",
            "Optimize application for maximum speed and scalability.",
            "Participate in code reviews and engineering discussions."
        ],
        requirements: [
            "Experience with React, HTML, CSS, and JavaScript/TypeScript.",
            "Familiarity with Git and version control.",
            "Passionate about UI/UX and pixel-perfect implementation.",
            "Strong problem-solving skills."
        ],
        tags: ["Engineering", "Remote", "Frontend", "React"],
        imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Full-Stack Developer",
        department: "Engineering",
        location: "Remote",
        type: "Internship",
        description: "Develop robust features, integrations, and scalable APIs for the Queska platform. Work across the stack from database to frontend.",
        responsibilities: [
            "Design and develop RESTful APIs.",
            "Integrate third-party services (payments, maps, etc.).",
            "Ensure data security and protection.",
            "Collaborate with frontend developers on API integration."
        ],
        requirements: [
            "Knowledge of Node.js, Express, or similar backend technologies.",
            "Experience with databases (SQL or NoSQL).",
            "Understanding of frontend technologies is a plus.",
            "Ability to write clean, maintainable code."
        ],
        tags: ["Engineering", "Remote", "Full-Stack", "API"],
        imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2069&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Product Manager",
        department: "Product",
        location: "Remote",
        type: "Internship",
        description: "Help define the roadmap, prioritize features, and drive the product vision. You will work closely with engineering, design, and business teams.",
        responsibilities: [
            "Gather and analyze user feedback and data.",
            "Define product requirements and verify implementation.",
            "Manage legitimate product backlog.",
            "Conduct market research and competitive analysis."
        ],
        requirements: [
            "Strong analytical and organizational skills.",
            "Excellent communication skills.",
            "Interest in travel and technology trends.",
            "Ability to prioritize effectively."
        ],
        tags: ["Product", "Remote", "Management"],
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Internship",
        description: "Craft beautiful, intuitive travel experiences. You will design interfaces that delight users and make travel planning effortless.",
        responsibilities: [
            "Create wireframes, prototypes, and high-fidelity mockups.",
            "Conduct user research and usability testing.",
            "Collaborate with developers to ensure design quality.",
            "Maintain and evolve the design system."
        ],
        requirements: [
            "Portfolio demonstrating UI/UX design skills.",
            "Proficiency in Figma or similar design tools.",
            "Understanding of user-centered design principles.",
            "Creative thinking and attention to detail."
        ],
        tags: ["Design", "Remote", "UI/UX", "Creative"],
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Growth & Marketing Lead",
        department: "Marketing",
        location: "Remote",
        type: "Internship",
        description: "Drive user acquisition, brand awareness, and execute marketing campaigns. You will help share the Queska story with the world.",
        responsibilities: [
            "Plan and execute digital marketing campaigns.",
            "Analyze campaign performance and optimize metrics.",
            "Manage social media channels and community engagement.",
            "Collaborate on content strategy."
        ],
        requirements: [
            "Knowledge of digital marketing channels (SEO, SEM, Social).",
            "Creativity and data-driven mindset.",
            "Strong written and verbal communication.",
            "Experience with analytics tools is a plus."
        ],
        tags: ["Marketing", "Remote", "Growth", "Social Media"],
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Vendor Partnerships Manager",
        department: "Business",
        location: "Hybrid",
        type: "Internship",
        description: "Onboard hotels, events, restaurants, and activity providers. You will build relationships that expand our marketplace.",
        responsibilities: [
            "Identify and outreach to potential vendors.",
            "Guide vendors through the onboarding process.",
            "Maintain strong relationships with existing partners.",
            "Negotiate terms and agreements."
        ],
        requirements: [
            "Strong interpersonal and negotiation skills.",
            "Sales or account management interest.",
            "Self-motivated and goal-oriented.",
            "Ability to work independently."
        ],
        tags: ["Business", "Hybrid", "Sales", "Partnerships"],
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Customer Success Lead",
        department: "Support",
        location: "Remote",
        type: "Internship",
        description: "Support travelers and vendors to ensure satisfaction handling inquiries and resolving issues with empathy.",
        responsibilities: [
            "Respond to customer support tickets and live chat.",
            "Troubleshoot platform issues for users.",
            "Create help articles and FAQs.",
            "Gather user feedback for product improvement."
        ],
        requirements: [
            "Empathy and patience.",
            "Excellent problem-solving skills.",
            "Strong written communication.",
            "Experience in customer service is a plus."
        ],
        tags: ["Support", "Remote", "Customer Success"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        title: "Content & SEO Manager",
        department: "Marketing",
        location: "Remote",
        type: "Internship",
        description: "Create destination guides, blog posts, and optimize content for search engines to drive organic traffic.",
        responsibilities: [
            "Write engaging travel content and blog posts.",
            "Perform keyword research and on-page SEO optimization.",
            "Manage content calendar.",
            "Collaborate with the marketing team on campaigns."
        ],
        requirements: [
            "Excellent writing and storytelling skills.",
            "Understanding of SEO principles.",
            "Passion for travel writing.",
            "Attention to detail and grammar."
        ],
        tags: ["Marketing", "Remote", "Content", "SEO", "Writing"],
        imageUrl: "https://images.unsplash.com/photo-1499750310159-52f0f8342f7a?q=80&w=2047&auto=format&fit=crop"
    },
    {
        id: 9,
        title: "Sales Representative",
        department: "Sales",
        location: "Remote",
        type: "Internship",
        description: "Drive B2B sales, agency partnerships, and enterprise deals. You will help bring Queska to businesses and large organizations.",
        responsibilities: [
            "Prospect and qualify B2B leads.",
            "Conduct product demonstrations.",
            "Close sales deals and contracts.",
            "Represent Queska at industry events (virtual or physical)."
        ],
        requirements: [
            "Strong communication and persuasive skills.",
            "Resilience and persistence.",
            "Interest in B2B sales cycles.",
            "Goal-driven mindset."
        ],
        tags: ["Sales", "Remote", "B2B"],
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
    },
    {
        id: 10,
        title: "Operations Coordinator",
        department: "Operations",
        location: "On-site",
        type: "Internship",
        description: "Manage logistics, quality assurance, and vendor verification. Ensure smooth operations on the ground.",
        responsibilities: [
            "Verify vendor listings and quality standards.",
            "Coordinate logistics for special bookings or events.",
            "Monitor operational KPIs.",
            "Assist in process improvement initiatives."
        ],
        requirements: [
            "Strong organizational skills.",
            "Attention to detail.",
            "Ability to handle multiple tasks simultaneously.",
            "Problem-solving attitude."
        ],
        tags: ["Operations", "On-site", "Logistics"],
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 11,
        title: "Graphics Designer",
        department: "Design",
        location: "Remote",
        type: "Internship",
        description: "Craft beautiful visual assets for marketing, social media, and the platform. Visual storytelling is key.",
        responsibilities: [
            "Design social media graphics and banners.",
            "Create visual assets for email newsletters.",
            "Assist with branding and identity projects.",
            "Collaborate with the marketing team."
        ],
        requirements: [
            "Proficiency in Adobe Creative Suite or similar tools.",
            "Strong portfolio of graphic design work.",
            "Creativity and eye for aesthetics.",
            "Ability to meet deadlines."
        ],
        tags: ["Design", "Remote", "Graphics", "Creative"],
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b79931bfd95?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 12,
        title: "Social Media Manager",
        department: "Marketing",
        location: "Remote",
        type: "Internship",
        description: "Manage our social presence, engage with the community, and grow our following across platforms.",
        responsibilities: [
            "Create and schedule engaging social media content.",
            "Monitor trends and join relevant conversations.",
            "Engage with followers and respond to comments.",
            "Track social media analytics."
        ],
        requirements: [
            "Deep understanding of social media platforms (Instagram, Twitter, TikTok, LinkedIn).",
            "Content creation skills (photo/video).",
            "Creativity and trend awareness.",
            "Excellent communication skills."
        ],
        tags: ["Marketing", "Remote", "Social Media", "Community"],
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 13,
        title: "Administrator",
        department: "Admin",
        location: "On-site",
        type: "Internship",
        description: "Keep the office and general administrative tasks running smoothly. Support the team with daily operations.",
        responsibilities: [
            "Manage office supplies (if applicable) and digital documentation.",
            "Schedule meetings and coordinate calendars.",
            "Assist with HR and recruitment logistics.",
            "Handle general inquiries."
        ],
        requirements: [
            "Organizational and administrative skills.",
            "Proficiency with office software (Google Workspace, MS Office).",
            "Reliability and discretion.",
            "Good communication skills."
        ],
        tags: ["Admin", "On-site", "Administration"],
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 14,
        title: "Video Editor",
        department: "Media",
        location: "Remote",
        type: "Internship",
        description: "Edit compelling video content for social media, ads, and destination showcases.",
        responsibilities: [
            "Edit raw footage into engaging videos.",
            "Add effects, transitions, and music.",
            "Create short-form content for TikTok/Reels.",
            "Collaborate with content creators."
        ],
        requirements: [
            "Proficiency in video editing software (Premiere Pro, Final Cut, etc.).",
            "Storytelling skills through video.",
            "Attention to detail and timing.",
            "Portfolio of video work."
        ],
        tags: ["Media", "Remote", "Video", "Editing"],
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 15,
        title: "Operator",
        department: "Operations",
        location: "On-site",
        type: "Internship",
        description: "Assist with on-the-ground execution of tours, events, and activities. Ensure guest safety and enjoyment.",
        responsibilities: [
            "Assist tour guides or event managers.",
            "Ensure equipment is ready and safe.",
            "Interact with guests and answer questions.",
            "Handle logistical tasks during operations."
        ],
        requirements: [
            "Physical stamina (if applicable).",
            "Customer service orientation.",
            "Reliability and punctuality.",
            "Team player mindset."
        ],
        tags: ["Operations", "On-site", "Field Work"],
        imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=2070&auto=format&fit=crop"
    }
];

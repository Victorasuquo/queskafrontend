import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MapPin, Briefcase, Search, Filter, X, ArrowRight, Clock, Users, Globe, Building } from "lucide-react";
import { toast } from "sonner";

interface JobRole {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string; // e.g., Internship, Full-time
    description: string;
    responsibilities: string[];
    requirements: string[];
    tags: string[];
}

const Careers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);

    // Mock Data for Roles (Intenship focus as per request)
    const jobRoles: JobRole[] = [
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
            tags: ["Engineering", "Remote", "Frontend", "React"]
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
            tags: ["Engineering", "Remote", "Full-Stack", "API"]
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
            tags: ["Product", "Remote", "Management"]
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
            tags: ["Design", "Remote", "UI/UX", "Creative"]
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
            tags: ["Marketing", "Remote", "Growth", "Social Media"]
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
            tags: ["Business", "Hybrid", "Sales", "Partnerships"]
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
            tags: ["Support", "Remote", "Customer Success"]
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
            tags: ["Marketing", "Remote", "Content", "SEO", "Writing"]
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
            tags: ["Sales", "Remote", "B2B"]
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
            tags: ["Operations", "On-site", "Logistics"]
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
            tags: ["Design", "Remote", "Graphics", "Creative"]
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
            tags: ["Marketing", "Remote", "Social Media", "Community"]
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
            tags: ["Admin", "On-site", "Administration"]
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
            tags: ["Media", "Remote", "Video", "Editing"]
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
            tags: ["Operations", "On-site", "Field Work"]
        }
    ];

    const departments = ["all", ...Array.from(new Set(jobRoles.map(job => job.department)))];
    const types = ["all", ...Array.from(new Set(jobRoles.map(job => job.type)))];

    const filteredJobs = jobRoles.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesDept = departmentFilter === "all" || job.department === departmentFilter;
        const matchesType = typeFilter === "all" || job.type === typeFilter;
        
        return matchesSearch && matchesDept && matchesType;
    });

    const handleApply = (role: JobRole) => {
        window.location.href = `mailto:careers@queska.com?subject=Application for ${role.title} Role&body=Hi Team,%0D%0A%0D%0AI am interested in applying for the ${role.title} (${role.type}) position.%0D%0A%0D%0APlease find my attached CV/Resume.%0D%0A%0D%0AThanks,`;
        toast.success("Opening email client to apply...");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="container px-4 text-center">
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">We are hiring!</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Join the <span className="text-primary">Queska</span> Mission
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Help us revolutionize travel experiences in Africa. We are looking for passionate individuals to build the future of exploration with us.
                    </p>
                    
                    {/* Search Component */}
                    <div className="max-w-3xl mx-auto bg-card border rounded-full p-2 shadow-lg flex items-center md:flex-row flex-col gap-2">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search by role or keyword (e.g. Remote, Design)..." 
                                className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="rounded-full px-8 w-full md:w-auto">Search Jobs</Button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 flex-1">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="w-full lg:w-64 space-y-6 shrink-0">
                            <div className="sticky top-24">
                                <div className="flex items-center gap-2 font-semibold mb-4">
                                    <Filter className="w-4 h-4" /> Filters
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Department</label>
                                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Departments" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem key={dept} value={dept}>
                                                        {dept === "all" ? "All Departments" : dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Type</label>
                                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Types" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {types.map((t) => (
                                                    <SelectItem key={t} value={t}>
                                                        {t === "all" ? "All Types" : t}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(departmentFilter !== "all" || typeFilter !== "all" || searchQuery) && (
                                        <Button 
                                            variant="outline" 
                                            className="w-full text-muted-foreground"
                                            onClick={() => {
                                                setDepartmentFilter("all");
                                                setTypeFilter("all");
                                                setSearchQuery("");
                                            }}
                                        >
                                            <X className="w-4 h-4 mr-2" /> Clear Filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Job Grid */}
                        <div className="flex-1">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Open Positions</h2>
                                <span className="text-muted-foreground text-sm">{filteredJobs.length} roles found</span>
                            </div>

                            {filteredJobs.length === 0 ? (
                                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium">No roles found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredJobs.map((job) => (
                                        <Card key={job.id} className="group hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                                            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-start justify-between md:justify-start gap-4">
                                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                                                        {job.tags.includes("Remote") && (
                                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Remote</Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {job.department}</span>
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {job.tags.slice(0, 4).map(tag => (
                                                            <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground">{tag}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="shrink-0">
                                                    <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground md:w-auto w-full">
                                                        View Role <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Details Modal */}
            <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedJob && (
                        <>
                            <DialogHeader>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge variant="outline">{selectedJob.department}</Badge>
                                    <Badge>{selectedJob.type}</Badge>
                                </div>
                                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                                <DialogDescription className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedJob.location}</span>
                                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Queska Inc.</span>
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6 my-4">
                                <div>
                                    <h4 className="font-semibold mb-2">About the Role</h4>
                                    <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {selectedJob.responsibilities.map((req, i) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Requirements</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {selectedJob.requirements.map((req, i) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t">
                                <Button className="flex-1" onClick={() => handleApply(selectedJob)}>
                                    Apply Now
                                </Button>
                                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Careers;

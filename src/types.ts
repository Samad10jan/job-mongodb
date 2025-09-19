import { Company, Opening, Role, SavedJobs, User, UserDetails } from "../generated/prisma";

export type UwC = {
    id: string;
    email: string;
    password: string;
    role: Role | null;
} & { company: Company, SavedJobs: SavedJobs[], details: UserDetails } | null

export type ReviewWithUserAndCompany = {
    id: string
    content: string
    user_id: string
    company_id: string
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        email: string
        role: string | null
        avatar: string | null
        company: { id: string; title: string; description: string; ownerId: string } | null
        details: {
            id: string
            avatar: string | null
            userId: string
            firstName: string
            lastName: string
            address: string | null
            education: string | null
            skills: string[]
            linkedin: string | null
            github: string | null
            createdAt: Date
            updatedAt: Date
        } | null
    }
}

export type OpeningWithCompany = Opening & { company?: Company & { owner: User } };
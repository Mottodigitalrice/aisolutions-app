import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (synced with Clerk)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Inbound requests (from the intake form)
  inboundRequests: defineTable({
    businessName: v.string(),
    businessType: v.string(),
    currentWebsite: v.optional(v.string()),
    instagram: v.optional(v.string()),
    referenceSites: v.optional(v.string()),
    description: v.optional(v.string()),
    contactName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    status: v.string(), // NEW, IN_PROGRESS, DEMO_SENT, CONVERTED, DECLINED
    demoUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  // Outbound leads (from the crawler pipeline)
  leads: defineTable({
    businessName: v.string(),
    businessNameEn: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.string(),
    mapsUrl: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    category: v.optional(v.string()),
    ward: v.optional(v.string()),
    instagram: v.optional(v.string()),
    websiteScore: v.optional(v.number()),
    websiteGrade: v.optional(v.string()),
    contactFormUrl: v.optional(v.string()),
    hasOptOut: v.optional(v.boolean()),
    publicEmail: v.optional(v.string()),
    status: v.string(), // CRAWLED, EVALUATED, QUALIFIED, SITE_BUILT, OUTREACH_SENT, RESPONDED, CONVERTED, REJECTED
    demoUrl: v.optional(v.string()),
    demoSlug: v.optional(v.string()),
    outreachSentAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_ward", ["ward"])
    .index("by_score", ["websiteScore"])
    .index("by_slug", ["demoSlug"]),
});

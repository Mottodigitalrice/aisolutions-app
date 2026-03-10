import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create a single lead
export const create = mutation({
  args: {
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
    demoUrl: v.optional(v.string()),
    demoSlug: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      status: "CRAWLED",
    });
  },
});

// Create leads in batch (for importing crawler results)
export const createBatch = mutation({
  args: {
    leads: v.array(
      v.object({
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
        demoUrl: v.optional(v.string()),
        demoSlug: v.optional(v.string()),
        notes: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const lead of args.leads) {
      const id = await ctx.db.insert("leads", {
        ...lead,
        status: "CRAWLED",
      });
      ids.push(id);
    }
    return ids;
  },
});

// List leads with optional filters
export const list = query({
  args: {
    status: v.optional(v.string()),
    ward: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("leads")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    if (args.ward) {
      return await ctx.db
        .query("leads")
        .withIndex("by_ward", (q) => q.eq("ward", args.ward!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("leads").order("desc").collect();
  },
});

// Update lead status
export const updateStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string(),
    demoUrl: v.optional(v.string()),
    demoSlug: v.optional(v.string()),
    outreachSentAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

// Get lead by demo slug (for demo site pages)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_slug", (q) => q.eq("demoSlug", args.slug))
      .unique();
  },
});

// Get qualified leads (score <= 50, no opt-out)
export const getQualified = query({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("leads").collect();
    return allLeads.filter(
      (lead) =>
        lead.websiteScore !== undefined &&
        lead.websiteScore <= 50 &&
        !lead.hasOptOut
    );
  },
});

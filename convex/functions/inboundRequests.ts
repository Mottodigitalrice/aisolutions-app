import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create a new inbound request (called from the intake form API route)
export const create = mutation({
  args: {
    businessName: v.string(),
    businessType: v.string(),
    currentWebsite: v.optional(v.string()),
    instagram: v.optional(v.string()),
    referenceSites: v.optional(v.string()),
    description: v.optional(v.string()),
    contactName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inboundRequests", {
      ...args,
      status: "NEW",
    });
  },
});

// List all inbound requests (for admin dashboard, requires auth)
export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("inboundRequests")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("inboundRequests")
      .order("desc")
      .collect();
  },
});

// Update the status of an inbound request
export const updateStatus = mutation({
  args: {
    id: v.id("inboundRequests"),
    status: v.string(),
    demoUrl: v.optional(v.string()),
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

// Get inbound request by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inboundRequests")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

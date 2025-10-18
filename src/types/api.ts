import { z } from 'zod';
import { Build } from './parts';

export const QuoteRequestSchema = z.object({
  build: z.object({
    cpu: z.any().optional(),
    mb: z.any().optional(),
    ram: z.any().optional(),
    gpu: z.any().optional(),
    storage: z.array(z.any()).optional(),
    psu: z.any().optional(),
    case: z.any().optional(),
    cooler: z.any().optional(),
    profile: z.string().optional(),
    notes: z.string().optional(),
  }),
  priceTotal: z.number(),
  compat: z.object({
    ok: z.boolean(),
    errors: z.array(z.string()),
    warnings: z.array(z.string()),
    tips: z.array(z.string()),
  }),
  userNotes: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

export interface QuoteResponse {
  ok: boolean;
  leadId: string;
  message: string;
}

export interface PartsQueryParams {
  category: string;
  socket?: string;
  ramGen?: string;
  budgetMax?: number;
  page?: number;
  limit?: number;
  orderBy?: 'recommended' | 'price_asc' | 'price_desc' | 'perf';
}

export interface PartsResponse {
  items: any[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface Preset {
  id: string;
  name: string;
  profile: string;
  build: Build;
  priceTotal: number;
  description: string;
}


import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../lib/supabase.js";

const router = Router();

function generateEnvolRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "ENV";
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

const createBookingSchema = z.object({
  passengerEmail: z.string().email(),
  passengerName: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().length(3).default("USD"),
  airlineReference: z.string().optional(),
  duffelOrderId: z.string().optional(),
  frakoOrderId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * POST /api/v1/envol/bookings
 * Créer une réservation de vol
 * Zéro compte requis - email suffit
 */
router.post("/bookings", async (req: Request, res: Response) => {
  const parseResult = createBookingSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const {
    passengerEmail,
    passengerName,
    amount,
    currency,
    airlineReference,
    duffelOrderId,
    frakoOrderId,
    metadata,
  } = parseResult.data;

  const envolRef = generateEnvolRef();

  try {
    const { data, error } = await supabase
      .from("envol_bookings")
      .insert({
        envol_reference: envolRef,
        airline_reference: airlineReference ?? null,
        duffel_order_id: duffelOrderId ?? null,
        passenger_email: passengerEmail,
        passenger_name: passengerName,
        amount,
        currency,
        frako_order_id: frakoOrderId ?? null,
        status: "pending",
        metadata: metadata ?? {},
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      ...data,
      message:
        "Réservation créée. Conservez votre référence Envol pour récupérer votre billet.",
    });
  } catch (err) {
    console.error("Envol booking error:", err);
    return res.status(500).json({ error: "Erreur lors de la réservation" });
  }
});

/**
 * GET /api/v1/envol/bookings/:ref
 * Récupérer une réservation par référence Envol + email (sécurité)
 */
router.get("/bookings/:ref", async (req: Request, res: Response) => {
  const { ref } = req.params;
  const email = req.query.email as string | undefined;

  if (!ref) {
    return res.status(400).json({ error: "Référence requise" });
  }

  let query = supabase
    .from("envol_bookings")
    .select("*")
    .eq("envol_reference", ref.toUpperCase());

  if (email) {
    query = query.eq("passenger_email", email);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return res.status(404).json({
      error: "Réservation non trouvée",
      hint: "Vérifiez la référence et l'email.",
    });
  }

  // Si pas d'email fourni, retourner infos limitées (confirmation existence)
  if (!email) {
    return res.json({
      found: true,
      envolReference: data.envol_reference,
      message: "Pour afficher les détails, fournissez l'email utilisé lors de la réservation.",
      queryParam: "?email=votre@email.com",
    });
  }

  return res.json(data);
});

/**
 * GET /api/v1/envol/flights/search
 * Recherche de vols (stub - intégration Duffel à venir)
 */
router.get("/flights/search", async (_req: Request, res: Response) => {
  const duffelKey = process.env.DUFFEL_API_KEY;
  if (!duffelKey) {
    return res.status(503).json({
      error: "Service vols non configuré",
      message: "L'intégration Duffel n'est pas encore activée.",
    });
  }

  // TODO: Intégration Duffel API
  // GET /air/offers avec origin, destination, dates
  return res.json({
    message: "Endpoint de recherche de vols - intégration Duffel à implémenter",
    docs: "https://duffel.com/docs/api",
  });
});

export default router;

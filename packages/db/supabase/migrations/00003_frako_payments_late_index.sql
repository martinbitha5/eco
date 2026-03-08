-- Index pour le job process-late-payments (requête sur status + due_date)
CREATE INDEX IF NOT EXISTS idx_frako_payments_status_due
  ON public.frako_payments(status, due_date)
  WHERE status = 'pending';

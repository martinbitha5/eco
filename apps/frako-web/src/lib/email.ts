import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export interface ConfirmationEmailData {
  to: string;
  firstName: string;
  merchantId: string;
  apiKey: string;
}

export async function sendMerchantConfirmationEmail(
  data: ConfirmationEmailData
): Promise<void> {
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM ?? "noreply@frako.com";

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue chez Frako</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#3855f3;padding:32px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="display:inline-table;">
                <tr>
                  <td style="background:white;width:40px;height:40px;border-radius:50%;text-align:center;vertical-align:middle;">
                    <span style="color:#3855f3;font-weight:900;font-size:20px;">F</span>
                  </td>
                  <td style="color:white;font-size:22px;font-weight:700;padding-left:10px;">frako</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;">
                Bienvenue, ${data.firstName}&nbsp;👋
              </h1>
              <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                Votre demande d'intégration marchand a bien été reçue. Notre équipe l'examine et vous contactera dans les <strong>24 à 48 heures</strong> ouvrables.
              </p>

              <!-- Credentials box -->
              <div style="background:#f8faff;border:1px solid #dce4fd;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">
                  Vos identifiants (conservez-les en lieu sûr)
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:12px;">
                      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;">Merchant ID</p>
                      <code style="display:block;background:#1e293b;color:#6ee7b7;padding:10px 14px;border-radius:8px;font-size:13px;font-family:monospace;">
                        ${data.merchantId}
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;">API Key (test)</p>
                      <code style="display:block;background:#1e293b;color:#fbbf24;padding:10px 14px;border-radius:8px;font-size:13px;font-family:monospace;word-break:break-all;">
                        ${data.apiKey}
                      </code>
                      <p style="margin:8px 0 0;font-size:12px;color:#f59e0b;">
                        ⚠️ Cette clé n'est affichée qu'une seule fois. Copiez-la maintenant.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Steps -->
              <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#111827;">Prochaines étapes</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  ["1", "Validation de votre compte par notre équipe (24–48h)"],
                  ["2", "Installez le SDK : <code style='background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px;'>npm install @frako/sdk</code>"],
                  ["3", "Connectez-vous à votre dashboard pour gérer vos transactions"],
                ].map(([n, text]) => `
                <tr>
                  <td style="padding-bottom:12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;height:28px;background:#3855f3;border-radius:50%;text-align:center;vertical-align:middle;color:white;font-size:13px;font-weight:700;">${n}</td>
                        <td style="padding-left:12px;font-size:14px;color:#374151;">${text}</td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#3855f3;border-radius:8px;padding:12px 28px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://frako.com"}/login"
                       style="color:white;text-decoration:none;font-weight:600;font-size:15px;">
                      Accéder à mon dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © 2024 Frako · Tous droits réservés<br />
                <a href="#" style="color:#9ca3af;">Politique de confidentialité</a>
                &nbsp;·&nbsp;
                <a href="#" style="color:#9ca3af;">Conditions d'utilisation</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  await transporter.sendMail({
    from: `"Frako for Business" <${from}>`,
    to: data.to,
    subject: "Bienvenue chez Frako — Confirmation de votre demande",
    html,
    text: `Bonjour ${data.firstName},\n\nVotre demande d'intégration marchand a bien été reçue.\n\nMerchant ID: ${data.merchantId}\nAPI Key: ${data.apiKey}\n\nConservez ces identifiants en lieu sûr. L'API Key ne sera plus affichée.\n\nNotre équipe vous contactera dans les 24-48h.\n\nL'équipe Frako`,
  });
}

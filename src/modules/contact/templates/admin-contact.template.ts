import { CreateContactDto } from "../dto/create-contact.dto";

export function adminContactTemplate(dto: CreateContactDto): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <tr>
            <td style="background-color:#1E1E1E;padding:32px 40px;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">New Contact Message</h1>
              <p style="color:#aaaaaa;margin:6px 0 0;font-size:13px;">Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;margin-bottom:24px;">

                <tr style="background-color:#f9f9f9;">
                  <td colspan="2" style="padding:14px 20px;font-size:13px;font-weight:700;color:#1E1E1E;text-transform:uppercase;letter-spacing:0.5px;">Contact Information</td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;width:35%;border-top:1px solid #e8e8e8;">Full Name</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.fullName}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Email</td>
                  <td style="padding:12px 20px;font-size:14px;border-top:1px solid #e8e8e8;">
                    <a href="mailto:${dto.email}" style="color:#1E1E1E;font-weight:500;text-decoration:none;">${dto.email}</a>
                  </td>
                </tr>
                ${dto.phone ? `
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Phone</td>
                  <td style="padding:12px 20px;font-size:14px;border-top:1px solid #e8e8e8;">
                    <a href="tel:${dto.phone}" style="color:#1E1E1E;font-weight:500;text-decoration:none;">${dto.phone}</a>
                  </td>
                </tr>
                ` : ''}

                <tr style="background-color:#f9f9f9;">
                  <td colspan="2" style="padding:14px 20px;font-size:13px;font-weight:700;color:#1E1E1E;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8e8e8;">Message</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:12px 20px;font-size:14px;color:#555555;border-top:1px solid #e8e8e8;">${dto.message}</td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#1E1E1E;padding:28px 40px;text-align:center;">
              <p style="color:#aaaaaa;font-size:12px;margin:0;">HB Transportation — Internal Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
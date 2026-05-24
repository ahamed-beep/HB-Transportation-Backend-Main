import { CreateQuoteDto } from '../dto/create-quote.dto';

export function userQuoteTemplate(dto: CreateQuoteDto): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Quote Request Received</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <tr>
            <td style="background-color:#1E1E1E;padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:0.5px;">HB Transportation</h1>
              <p style="color:#aaaaaa;margin:8px 0 0;font-size:13px;">Reliable Freight. Delivered On Time.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 40px 24px;">
              <h2 style="color:#1E1E1E;margin:0 0 12px;font-size:20px;">We've Received Your Quote Request</h2>
              <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Hi <strong>${dto.fullName}</strong>, thank you for reaching out to HB Transportation. Our team will review your request and get back to you within a few hours with the best available rate.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;margin-bottom:24px;">
                <tr style="background-color:#f9f9f9;">
                  <td colspan="2" style="padding:14px 20px;font-size:13px;font-weight:700;color:#1E1E1E;text-transform:uppercase;letter-spacing:0.5px;">Shipping Details</td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;width:45%;border-top:1px solid #e8e8e8;">Pickup Location</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.pickup}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Delivery Location</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.delivery}</td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Pickup Date</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.pickupDate}</td>
                </tr>

                <tr style="background-color:#f9f9f9;">
                  <td colspan="2" style="padding:14px 20px;font-size:13px;font-weight:700;color:#1E1E1E;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8e8e8;">Freight Details</td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Freight Type</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.freightType}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Weight / Load Size</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.weight}</td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:14px;color:#888888;border-top:1px solid #e8e8e8;">Temperature</td>
                  <td style="padding:12px 20px;font-size:14px;color:#1E1E1E;font-weight:500;border-top:1px solid #e8e8e8;">${dto.temperature}</td>
                </tr>

                ${dto.notes ? `
                <tr style="background-color:#f9f9f9;">
                  <td colspan="2" style="padding:14px 20px;font-size:13px;font-weight:700;color:#1E1E1E;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8e8e8;">Additional Notes</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:12px 20px;font-size:14px;color:#555555;border-top:1px solid #e8e8e8;">${dto.notes}</td>
                </tr>
                ` : ''}
              </table>

              <p style="color:#555555;font-size:14px;line-height:1.7;margin:0;">
                If you have any urgent inquiries, feel free to call us at <a href="tel:+15306732116" style="color:#1E1E1E;font-weight:600;text-decoration:none;">+1 (530) 673-2116</a> or reply to this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#1E1E1E;padding:28px 40px;text-align:center;">
              <p style="color:#aaaaaa;font-size:12px;margin:0;line-height:1.8;">
                © ${new Date().getFullYear()} HB Transportation. All rights reserved.<br/>
                <a href="mailto:info@hbtinc.org" style="color:#aaaaaa;text-decoration:none;">info@hbtinc.org</a> &nbsp;|&nbsp;
                <a href="tel:+15306732116" style="color:#aaaaaa;text-decoration:none;">+1 (530) 673-2116</a>
              </p>
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
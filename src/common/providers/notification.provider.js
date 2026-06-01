import { sendEmail } from "../../utils/sendMail.js";
import { readFile } from "node:fs/promises";

const bookingConfirmationTemplateUrl = new URL(
  "./templates/booking-confirmation.html",
  import.meta.url
);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderTemplate = (template, values) =>
  Object.entries(values).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template
  );

export const sendBookingConfirmation = async ({
  guestEmail,
  guestName,
  hotelName,
  roomName,
  guests,
  checkInDate,
  checkOutDate,
  subtotal,
  taxes,
  totalPrice,
  paymentId,
}) => {
  const formatCurrency = (amount) => `Rs. ${Number(amount || 0).toFixed(2)}`;
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  const formattedCheckIn = formatDate(checkInDate);
  const formattedCheckOut = formatDate(checkOutDate);
  const formattedTotal = Number(totalPrice).toFixed(2);
  const template = await readFile(bookingConfirmationTemplateUrl, "utf8");
  const paymentDetails = paymentId
    ? `<p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Payment ID: ${escapeHtml(
        paymentId
      )}</p>`
    : "";
  const html = renderTemplate(template, {
    guestName: escapeHtml(guestName),
    hotelName: escapeHtml(hotelName),
    roomName: escapeHtml(roomName),
    checkInDate: escapeHtml(formattedCheckIn),
    checkOutDate: escapeHtml(formattedCheckOut),
    guests: escapeHtml(guests),
    subtotal: escapeHtml(formatCurrency(subtotal)),
    taxes: escapeHtml(formatCurrency(taxes)),
    totalPrice: escapeHtml(`Rs. ${formattedTotal}`),
    paymentDetails,
  });

  await sendEmail({
    to: guestEmail,
    subject: "Your TripEase booking is confirmed",
    html,
  });
};

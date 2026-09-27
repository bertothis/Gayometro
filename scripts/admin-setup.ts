/*
  Genera tutto cio' che serve per il login admin (livello gate + livello
  vero: email, password, TOTP). Non tocca .env.local: stampa le righe da
  incollare a mano, cosi' non rischi di sovrascrivere altre variabili.

  Uso: npm run admin:setup
*/
import { createInterface } from "node:readline/promises";
import { randomBytes } from "node:crypto";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";
import { Secret } from "otpauth";
import QRCode from "qrcode";

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const email = (await rl.question("Email amministratore: ")).trim();
  const password = await rl.question(
    "Nuova password (visibile mentre digiti, siamo in locale): "
  );
  rl.close();

  if (!email || password.length < 8) {
    console.error(
      "\nServono un'email e una password di almeno 8 caratteri. Rilancia lo script."
    );
    process.exitCode = 1;
    return;
  }

  const hashPassword = Buffer.from(await bcrypt.hash(password, 12)).toString(
    "base64"
  );
  const segretoTotp = new Secret({ size: 20 }).base32;
  const gateSecret = randomBytes(24).toString("hex");
  const sessionSecret = randomBytes(32).toString("hex");

  const uriTotp = `otpauth://totp/Gayometro:${encodeURIComponent(
    email
  )}?secret=${segretoTotp}&issuer=Gayometro&algorithm=SHA1&digits=6&period=30`;

  console.log("\nAggiungi queste righe a .env.local (e alle env di Vercel al deploy):\n");
  console.log(`ADMIN_EMAIL=${email}`);
  console.log(`ADMIN_PASSWORD_HASH=${hashPassword}`);
  console.log(`ADMIN_TOTP_SECRET=${segretoTotp}`);
  console.log(`ADMIN_GATE_SECRET=${gateSecret}`);
  console.log(`ADMIN_SESSION_SECRET=${sessionSecret}`);

  console.log(
    "\nScansiona questo QR con Google Authenticator, Authy, 1Password o simili:\n"
  );
  console.log(await QRCode.toString(uriTotp, { type: "terminal", small: true }));
  console.log(
    `Se non riesci a scansionarlo, aggiungi manualmente questo URI: ${uriTotp}\n`
  );
  console.log(
    `Per entrare la prima volta: https://tuo-dominio/admin?entra=${gateSecret}\n`
  );
}

main().catch((err) => {
  console.error("Errore imprevisto:", err);
  process.exitCode = 1;
});

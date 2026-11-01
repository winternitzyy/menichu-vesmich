# Menichu Vesmichu website

The public site runs as a free static site on **GitHub Pages**. It doesn't need Manus, a server or a database.

| Was (on Manus) | Now (on GitHub Pages) |
| --- | --- |
| Sessions stored in a database, edited in `/admin` | Sessions listed in [`client/src/data/sessions.ts`](client/src/data/sessions.ts). Edit them on github.com and the site redeploys. |
| Bookings and feedback saved to the database and emailed | Bookings and feedback emailed to you by [Web3Forms](https://web3forms.com) (free) |
| Donations through a Stripe Checkout server | Donations through a Stripe **Payment Link** (no server) |
| Photos stored in Manus storage | Photos stored in [`client/public/images/`](client/public/images/) |
| Admin panel (`/admin`) | Removed. Bookings arrive by email, and you edit sessions in the file above. |

The old server code (`server/`, `drizzle/`) is still in the repo but isn't used by the GitHub Pages site.

## One-time setup

1. **Make the repository public.** GitHub Pages is free only for public repositories (a private repo needs a paid GitHub plan). Go to Settings → General → Danger Zone → Change visibility. The code has no passwords or API keys in it.
2. **Turn on Pages.** Go to Settings → Pages → Build and deployment → Source and choose **GitHub Actions**.
3. **Photos: already done.** All 30 photos and logos were copied from Manus into `client/public/images/`. If you add new images on Manus before switching, run Actions → **Import images from Manus** again to fetch them.
4. **Set up email for bookings and feedback.** Get a free access key at <https://web3forms.com> using the email address that should receive submissions. Then add it under Settings → Secrets and variables → Actions → **Variables** → New repository variable:
   - `VITE_WEB3FORMS_ACCESS_KEY` = your key
5. **Optional: online donations.** In Stripe, go to Payment Links → New and pick "Customers choose what to pay". Set the confirmation page to redirect to `<your site>/donate/thank-you`. Then add this variable:
   - `VITE_STRIPE_DONATION_LINK` = the `https://buy.stripe.com/...` link
6. **Optional: a different contact email.** The default is `menichu@khwestcliff.org`. To change it, add this variable:
   - `VITE_CONTACT_EMAIL`

   After you add or change a variable, go to Actions → **Deploy to GitHub Pages** → Run workflow.

The site will be at `https://winternitzyy.github.io/menichu-vesmich/`.

### Keeping your own domain (menichu.khwestcliff.org)

1. Go to Settings → Pages → Custom domain, enter `menichu.khwestcliff.org`, and save.
2. At your DNS provider, replace the record that points to Manus with a **CNAME** record: `menichu` → `winternitzyy.github.io`.
3. Once the certificate is issued, tick **Enforce HTTPS**.

The site adjusts to the domain on its own, with no code changes.

The photos are already copied into the repo, so moving the domain away from Manus is safe.

## Everyday edits

- **Add or change a session:** edit `client/src/data/sessions.ts` on github.com (pencil icon) and commit. Sessions dated after today show under Coming Events and in the booking form. Sessions dated today or earlier show under Past Events.
- **Change text or images:** edit the files under `client/src/pages/` and `client/public/images/`.

Every commit to `main` redeploys the site within a couple of minutes.

## Local development

```bash
pnpm install
pnpm run build:static        # builds the static site into dist/static
npx vite preview --outDir dist/static
```

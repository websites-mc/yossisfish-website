# yossisfish.com

Static website for **Yossi's Fish** (Yossis Fish Market), 5324 13th Ave, Brooklyn, NY 11219.

## Pages
| URL | Purpose |
|---|---|
| `/` | Home |
| `/sms/` | Text message program: opt-in form (2 unchecked checkboxes), keyword JOIN, program disclosures |
| `/contact/` | Contact Us |
| `/privacy-policy/` | Privacy Policy (with SMS section) |
| `/terms-of-service/` | Terms of Service (with SMS program terms) |

## Deploy (GitHub Pages)
1. Create a repo and upload the contents of this folder to the root (not inside a subfolder).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Custom domain is already set via the `CNAME` file (`yossisfish.com`). At Namecheap, add:
   - A records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME record `www` → `<your-github-username>.github.io`
4. Once DNS resolves, tick **Enforce HTTPS**.

## Forms
Forms validate in the browser and show a success message. To actually receive submissions,
set `FORM_ENDPOINT` at the top of `assets/main.js` (e.g. a Formspree URL).

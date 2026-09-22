# Assam Rifles Public School (ARPS) - Dedicated Media & Files Directory

This dedicated folder (`/public/media/`) is the central repository for all images, documents, banners, and digital assets on the ARPS Tripura website.

When the website is built (`npm run build`), all contents inside this folder are automatically copied to `dist/media/` and packaged into `dist-ready-to-upload.zip`.

---

## Folder Hierarchy & Purposes

| Directory | Purpose | Supported Formats | Recommended Resolution / Specs |
|---|---|---|---|
| `public/media/branding/` | Official ARPS emblems, school crest, logos, favicon | `.png`, `.jpg`, `.svg`, `.webp` | High-res PNG with transparent background |
| `public/media/slides/` | Homepage hero slider banners & announcement graphics | `.jpg`, `.webp`, `.png` | 1920x1080px (16:9), compressed < 400KB |
| `public/media/photos/campus/` | School building, gates, playground, gardens, library | `.jpg`, `.webp`, `.png` | Landscape (1200x800px) |
| `public/media/photos/events/` | Annual sports, science exhibitions, cultural functions | `.jpg`, `.webp`, `.png` | 1200x800px |
| `public/media/photos/sports/` | Football, volleyball, athletics, drill competitions | `.jpg`, `.webp`, `.png` | 1200x800px |
| `public/media/photos/laboratories/` | Physics, Chemistry, Biology, Computer Labs | `.jpg`, `.webp`, `.png` | 1200x800px |
| `public/media/photos/ncc/` | NCC Army wing cadets, camps, drill parades | `.jpg`, `.webp`, `.png` | 1200x800px |
| `public/media/photos/ceremonial/` | Independence Day, Republic Day, Investiture ceremony | `.jpg`, `.webp`, `.png` | 1200x800px |
| `public/media/faculty/` | Principal, headmaster, teachers, and staff portraits | `.jpg`, `.webp`, `.png` | 400x500px (4:5) or 1:1 square |
| `public/media/documents/` | CBSE mandatory disclosures, fee structures, notices, prospectus, TC certificates | `.pdf`, `.docx`, `.xlsx` | Optimized PDF format (< 5MB) |

---

## How URLs Work in the Browser

Any file placed inside `public/media/...` is served directly at `/media/...`:

- File path: `public/media/branding/arps-logo.png`  
  Web URL: `https://test.arpstripura.in/media/branding/arps-logo.png` (or relative path: `/media/branding/arps-logo.png`)

- File path: `public/media/documents/cbse-mandatory-disclosure.pdf`  
  Web URL: `/media/documents/cbse-mandatory-disclosure.pdf`

- File path: `public/media/slides/annual-sports-banner.jpg`  
  Web URL: `/media/slides/annual-sports-banner.jpg`

---

## Deploying to Plesk Windows Server

When uploading files directly to your live server:
1. Log in to **Plesk File Manager**.
2. Go to **`httpdocs/`**.
3. Create or open the **`media`** folder (`httpdocs/media/`).
4. Upload your images or PDFs into their respective subfolders (`photos/`, `documents/`, `slides/`, etc.).
5. The files are instantly accessible at `https://test.arpstripura.in/media/<subfolder>/<filename>`.

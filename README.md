# CleanConnect
**Tagline:** Report Waste, Build Cleaner Communities  
**Theme:** Tech for Social Good / Environmental Awareness

CleanConnect is a responsive web prototype that lets community members document waste hotspots with a title, location, description, and optional photo. It is designed to make local waste concerns visible and encourage community-led action.

## Features
- Responsive landing page and community report board
- Form validation for report title, location and description
- Optional image upload via Cloudinary unsigned upload preset
- Demo reports saved in browser localStorage
- Basic file type and size checks
- Privacy reminder not to upload faces, personal information or sensitive locations

## Tech stack
- HTML5, CSS3, Vanilla JavaScript
- Cloudinary Image Upload API (requires setup)
- Browser localStorage for demo-only report persistence

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Enable Cloudinary uploads
1. Create/sign in to a Cloudinary account.
2. Find your **Cloud name** in the Cloudinary dashboard.
3. Open **Settings → Upload** and create an **unsigned upload preset**. Use a restrictive folder/settings if available.
4. Open `app.js` and replace:
   - `YOUR_CLOUD_NAME`
   - `YOUR_UNSIGNED_UPLOAD_PRESET`
5. Refresh the page and test with a small JPG/PNG/WebP image.

**Security:** Never expose a Cloudinary API secret in frontend code. Unsigned presets can be abused if shared publicly; configure allowed formats, size limits and folder restrictions. For a production app, use a backend, authentication, moderation and a database.

## Limitations (be transparent in the demo)
- Reports are saved only in the current browser; they are not shared between different visitors or devices.
- Cloudinary uploads work only after configuring a cloud name and unsigned preset.
- The prototype does not contact municipal authorities, verify locations, or guarantee clean-up.
- The prototype is not a production reporting or emergency service.

## Suggested next steps
- Add a backend and database for shared reports
- Add report moderation and duplicate detection
- Add municipal/NGO contact workflow and status tracking
- Add accessibility and multilingual support

## Hackathon documentation
See `NOTION_PROJECT_DOC.md` for a copy-ready Notion documentation draft.

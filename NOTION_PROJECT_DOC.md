# CleanConnect — Report Waste, Build Cleaner Communities

## 1. Project overview
CleanConnect is a community-driven environmental awareness web prototype. It helps people document visible waste hotspots by submitting a short report with a location, description, and optional photo. The goal is to make local issues easier to communicate and encourage responsible community action.

**Theme:** Tech for Social Good  
**Problem area:** Waste visibility and community environmental awareness  
**Current status:** MVP prototype  
**Team:** [Add all team members]  
**Project repository:** [Add GitHub URL]  
**Live demo:** [Add deployed URL]

## 2. Problem statement
Waste hotspots in public spaces can go unreported or be difficult for community members to communicate clearly. People may notice litter near a market, bus stop, park, or roadside but lack a simple shared place to document the issue. CleanConnect explores a lightweight way to capture the issue and its location.

## 3. Proposed solution
A responsive website where users can submit a waste report containing:
- A short report title
- Area/location text
- A brief description
- An optional photo

Submitted reports appear on a community board in the same browser in this MVP. The concept can later be extended to a shared database and verified local clean-up workflows.

## 4. Target users
- Residents and students
- Community volunteers
- Environmental clubs and NGOs
- Local groups organizing clean-up activities

## 5. Social impact
- Encourages people to notice and document local waste concerns
- Supports environmental awareness and community participation
- Creates a foundation for future NGO/volunteer coordination

**Impact limitation:** This prototype does not directly notify authorities or guarantee waste removal. Impact would need to be measured through real users, verified reports, and resolved hotspots.

## 6. Core user journey
1. User opens CleanConnect.
2. User selects “Report a waste hotspot.”
3. User enters a title, area/location, and description.
4. User optionally selects a photo.
5. If Cloudinary is configured, the image is uploaded and its secure URL is attached to the report.
6. The report appears on the community board.

## 7. Technology stack and decisions
- **HTML:** semantic page structure and forms.
- **CSS:** responsive layout and visual design.
- **Vanilla JavaScript:** form handling, validation, rendering and upload request.
- **Cloudinary:** cloud-hosted image upload and delivery for report photos.
- **localStorage:** quick demo persistence without needing a backend.

### Why these choices?
The MVP uses a small stack so it can be built and tested quickly. Cloudinary is relevant because photos provide context for a waste report and should be delivered as hosted media. localStorage makes the demo usable without backend setup, but it is not a shared database.

## 8. Cloudinary implementation
The app sends a selected image to Cloudinary's image upload endpoint using an unsigned upload preset. On success, the app stores the returned `secure_url` with the report and renders the hosted image in the community board.

**Configuration required before claiming this is live:** Set the Cloudinary cloud name and unsigned upload preset in `app.js`, then test a real upload. Never expose an API secret in client-side code.

## 9. Data and privacy considerations
- The form accepts JPG, PNG and WebP images up to 8 MB.
- Users are reminded not to upload faces, personal information or sensitive locations.
- A real deployment should add moderation, abuse prevention, consent guidance, secure storage and reporting controls.
- The current prototype stores reports locally in one browser only.

## 10. Testing checklist
- [ ] Page opens on desktop and mobile.
- [ ] Empty required fields are rejected by browser validation.
- [ ] A report without a photo can be published.
- [ ] A valid photo is uploaded after Cloudinary setup.
- [ ] Report details render correctly.
- [ ] Refreshing the same browser preserves demo reports.
- [ ] Invalid file types and images over 8 MB are rejected.
- [ ] GitHub and live demo links are tested.

## 11. Current limitations
- No shared database or multi-user synchronization
- No authentication or moderation dashboard
- No automatic municipal notifications
- Cloudinary upload requires a configured unsigned preset
- No verified geolocation or clean-up status

## 12. Future improvements
- Backend API and shared database
- Map-based location selection and duplicate report detection
- NGO/municipal partner workflows
- Report status and clean-up verification
- Multilingual interface and accessibility improvements

## 13. Build journey / decision log
Add dated notes while building:
- **Problem selection:** Chose local waste visibility as an environmental social-good problem.
- **MVP scope:** Focused on report submission and a community board to keep the prototype achievable.
- **Media decision:** Selected Cloudinary for optional hosted report photos.
- **Storage decision:** Used localStorage for a quick prototype; documented that a backend is needed for shared data.
- **Testing:** Record the tests you actually completed and any issues you found.

## 14. Demo script (about 60 seconds)
“CleanConnect is a Tech for Social Good prototype focused on community waste awareness. Users can submit a waste hotspot with a title, location, and description, plus an optional image. Cloudinary hosts uploaded images, while this first prototype stores report records locally in the browser. The MVP demonstrates the report flow and a path toward a shared community platform. The next step is a backend, moderation, and coordination with local environmental groups. The project aims to make community waste concerns easier to document and act on.”

## 15. Credits
Built for the Hacktober HackDays online round. Add team member names and any third-party assets or resources actually used.

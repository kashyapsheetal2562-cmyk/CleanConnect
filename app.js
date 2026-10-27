/*
  CleanConnect demo MVP
  Cloudinary setup:
  1. Create a Cloudinary account and open Settings > Upload.
  2. Create an UNSIGNED upload preset for this demo.
  3. Replace CLOUD_NAME and UPLOAD_PRESET below.
  4. Never put an API secret in browser code.
*/
const CLOUD_NAME = "cnsnqa6p";
const UPLOAD_PRESET = "cleanconnect_upload";
const STORAGE_KEY = "cleanconnect_reports_v1";

const form = document.getElementById("reportForm");
const photoInput = document.getElementById("photo");
const photoLabel = document.getElementById("photoLabel");
const uploadStatus = document.getElementById("uploadStatus");
const reportList = document.getElementById("reportList");
const emptyState = document.getElementById("emptyState");

let selectedPhoto = null;

photoInput.addEventListener("change", () => {
  selectedPhoto = photoInput.files && photoInput.files[0] ? photoInput.files[0] : null;
  if (!selectedPhoto) {
    photoLabel.textContent = "Choose a JPG, PNG or WebP image, up to 8 MB.";
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(selectedPhoto.type) || selectedPhoto.size > 8 * 1024 * 1024) {
    alert("Please choose a JPG, PNG or WebP image smaller than 8 MB.");
    photoInput.value = "";
    selectedPhoto = null;
    photoLabel.textContent = "Choose a JPG, PNG or WebP image, up to 8 MB.";
    return;
  }
  photoLabel.textContent = selectedPhoto.name;
});

async function uploadToCloudinary(file) {
  if (!file) return "";
  if (CLOUD_NAME === "YOUR_CLOUD_NAME" || UPLOAD_PRESET === "YOUR_UNSIGNED_UPLOAD_PRESET") {
    throw new Error("Cloudinary is not configured yet. Add your cloud name and unsigned upload preset in app.js, or submit a report without a photo for the demo.");
  }
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST", body: data
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Photo upload failed.");
  return result.secure_url;
}

function readReports() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderReports() {
  const reports = readReports();
  emptyState.style.display = reports.length ? "none" : "block";
  reportList.innerHTML = reports.map(report => `
    <article class="report-card">
      ${report.photo ? `<img src="${escapeHTML(report.photo)}" alt="Photo attached to waste report" loading="lazy">` : `<div class="report-placeholder" aria-label="No photo provided">♻</div>`}
      <div class="report-body">
        <div class="report-meta">Community report · ${escapeHTML(report.date)}</div>
        <h3>${escapeHTML(report.title)}</h3>
        <p>${escapeHTML(report.description)}</p>
        <div class="report-location">⌖ ${escapeHTML(report.location)}</div>
      </div>
    </article>`).join("");
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const title = document.getElementById("title").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!title || !location || !description) return;
  submitButton.disabled = true;
  submitButton.textContent = selectedPhoto ? "Uploading photo..." : "Publishing report...";
  uploadStatus.textContent = "";
  try {
    const photo = selectedPhoto ? await uploadToCloudinary(selectedPhoto) : "";
    const reports = readReports();
    reports.unshift({ id: Date.now(), title, location, description, photo, date: new Date().toLocaleDateString() });
    saveReports(reports.slice(0, 30));
    form.reset();
    selectedPhoto = null;
    photoLabel.textContent = "Choose a JPG, PNG or WebP image, up to 8 MB.";
    uploadStatus.textContent = "Report published on this browser's community board.";
    renderReports();
    document.getElementById("reports").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    uploadStatus.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Publish community report <span>↗</span>';
  }
});
document.getElementById("clearDemo").addEventListener("click", () => {
  if (confirm("Clear all CleanConnect demo reports saved in this browser?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderReports();
  }
});
renderReports();

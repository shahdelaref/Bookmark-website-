// عناصر الإدخال
let siteNameInput = document.getElementById('siteName');
let siteUrlInput = document.getElementById('siteUrl');
let submitBtn = document.getElementById('submitBtn');
let tableBody = document.getElementById('tableBody');
let msg = document.getElementById('msg');

// مصفوفة لحفظ المواقع
let sites = [];

// تحميل المواقع من localStorage إذا وجدت
if (localStorage.getItem('sites')) {
  sites = JSON.parse(localStorage.getItem('sites'));
  displaySites();
}

// التحقق من صحة البيانات
function validateSite(name, url) {
  let nameValid = name.length >= 3;
  let urlValid = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(url);
  return nameValid && urlValid;
}

// إضافة موقع جديد
submitBtn.onclick = function () {
  let name = siteNameInput.value.trim();
  let url = siteUrlInput.value.trim();

  if (!validateSite(name, url)) {
    msg.textContent = 'Invalid site name or URL!';
    return;
  }
  msg.textContent = '';

  let site = { name, url };
  sites.push(site);
  localStorage.setItem('sites', JSON.stringify(sites));
  displaySites();
  clearForm();
};

// عرض المواقع في الجدول
function displaySites() {
  let html = '';
  for (let i = 0; i < sites.length; i++) {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" target="_blank"><button>Visit</button></a></td>
        <td><button onclick="deleteSite(${i})">Delete</button></td>
      </tr>
    `;
  }
  tableBody.innerHTML = html;
}

// حذف موقع
window.deleteSite = function(index) {
  sites.splice(index, 1);
  localStorage.setItem('sites', JSON.stringify(sites));
  displaySites();
};

// مسح الحقول
function clearForm() {
  siteNameInput.value = '';
  siteUrlInput.value = '';
} 
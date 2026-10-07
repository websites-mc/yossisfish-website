/* Yossi's Fish — site scripts */
// Optional: set to a form backend URL (e.g. "https://formspree.io/f/xxxxxx") to receive submissions.
var FORM_ENDPOINT = "";

(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Highlight today's hours
  var today = new Date().getDay();
  document.querySelectorAll('.hours tr[data-day="' + today + '"]').forEach(function (tr) {
    tr.classList.add("today");
  });

  function digits(v) { return (v || "").replace(/\D/g, ""); }
  function validPhone(v) {
    var d = digits(v);
    return d.length === 10 || (d.length === 11 && d.charAt(0) === "1");
  }
  function show(box, ok, text) {
    box.className = "form-msg " + (ok ? "ok" : "err");
    box.textContent = text;
  }

  function submit(form, box, okText) {
    var btn = form.querySelector('button[type="submit"]');
    if (!FORM_ENDPOINT) {
      show(box, true, okText);
      form.reset();
      return;
    }
    btn.disabled = true;
    fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("bad");
        show(box, true, okText);
        form.reset();
      })
      .catch(function () {
        show(box, false, "Something went wrong. Please call us at (718) 851-9860.");
      })
      .finally(function () { btn.disabled = false; });
  }

  // SMS sign-up form
  document.querySelectorAll('form[data-form="sms"]').forEach(function (form) {
    var box = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = form.querySelector('[name="first_name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value;
      var boxes = form.querySelectorAll('input[type="checkbox"]:checked');
      if (!first) return show(box, false, "Please enter your first name.");
      if (!validPhone(phone)) return show(box, false, "Please enter a valid 10-digit US mobile number.");
      if (!boxes.length) return show(box, false, "Please check at least one box to choose which texts you want.");
      submit(form, box, "Thanks! You're signed up. You'll get a confirmation text shortly. Reply STOP anytime to opt out.");
    });
  });

  // Contact form
  document.querySelectorAll('form[data-form="contact"]').forEach(function (form) {
    var box = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var msg = form.querySelector('[name="message"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value;
      var boxes = form.querySelectorAll('input[type="checkbox"]:checked');
      if (!name) return show(box, false, "Please enter your name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show(box, false, "Please enter a valid email address.");
      if (!msg) return show(box, false, "Please enter a message.");
      if (boxes.length && !validPhone(phone)) return show(box, false, "To sign up for texts, please enter a valid 10-digit US mobile number.");
      if (phone && !validPhone(phone)) return show(box, false, "Please check your phone number.");
      submit(form, box, boxes.length
        ? "Thanks! We got your message and you're signed up for texts. Reply STOP anytime to opt out."
        : "Thanks! We got your message and will get back to you soon.");
    });
  });
})();

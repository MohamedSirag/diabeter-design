# Diaboo App — UI Design Master Index
> App branded as **Diaboo** · Flutter (Android + iOS) · CGM-driven diabetes self-management  
> Internal project folder: `diabeter` · Bundle: `com.pyranext.diaboo`

**Figma v1 (8 screens, wrong colors):** https://www.figma.com/design/5YwHLypPzn9jCJZrIp6KvD — _to be replaced_  
**Figma v2 (complete, accurate):** _all 20 JS files written — dark rows 3–13, light rows 14–27_  
**Local server:** http://localhost:3500  
**Design folder:** `C:/Users/Mohamed/diabeter-design/`  
**Logo source:** `assets/images/diaboo.png` — teal droplet with sine wave on dark navy  
**Last updated:** 2026-05-23

---

## Exact Design System (from `lib/theme/diaboo_theme.dart`)

### Light Theme
| Token | Hex | Usage |
|---|---|---|
| appBackground | `#F3F6FB` | Scaffold bg |
| surface | `#FFFFFF` | Cards, nav bar |
| surfaceStrong | `#F8FAFC` | Input fills, secondary cards |
| card | `#F8FAFC` | Card bg |
| border | `rgba(15,23,42,0.12)` | Dividers |
| primaryText | `#0F172A` | Headings, values |
| secondaryText | `#334155` | Body text |
| tertiaryText | `#5F6F86` | Labels, timestamps |
| primary | `#2563EB` | Buttons, active nav, accents |
| secondary | `#0EA5E9` | Gradients, highlights |
| success | `#16A34A` | In-range glucose, confirmations |
| warning | `#D97706` | High glucose, caution |
| danger | `#DC2626` | Hypo, critical, delete |

### Dark Theme
| Token | Hex | Usage |
|---|---|---|
| appBackground | `#0A0E17` | Scaffold bg |
| surface | `#0F172A` | Cards, nav bar |
| surfaceStrong | `#1E293B` | Input fills |
| card | `rgba(15,23,42,0.75)` | Card bg with blur |
| border | `rgba(148,163,184,0.2)` | Dividers |
| primaryText | `#FFFFFF` | Headings |
| secondaryText | `#CBD5E1` | Body text |
| tertiaryText | `#94A3B8` | Labels |
| primary | `#3B82F6` | Buttons, active |
| secondary | `#38BDF8` | Highlights |
| success | `#22C55E` | In-range |
| warning | `#F59E0B` | High |
| danger | `#EF4444` | Low/critical |

### Typography & Shape
| Token | Value |
|---|---|
| Font | **Montserrat** (Google Fonts) |
| Card radius | **20px** |
| Input radius | **14px** |
| Button radius | **14px** |

### Logo Recreation (SVG inline)
Dark navy circle bg → teal droplet shape (`#22D3EE`) → dark sine wave inside → green glow at bottom-right

---

## Real App Navigation (from `lib/presentation/screens/dashboard.dart`)

```
Bottom Tab Bar (5 tabs):
  🩸 Live      — dashboard.dart → CGM live glucose + overlay/bubble control
  📓 Logbook   — logbook_screen.dart → meal/insulin/exercise/note/ketone/low/high
  📷 Camera    — camera_screen.dart → AI carb counting (Gemini)
  📰 News      — news_screen.dart → diabetes news feed
  👤 Profile   — profile_screen.dart → full settings surface
```

**No center FAB.** Camera tab IS the add/log entry point for AI. Manual log is from Live tab actions.

---

## Real Startup Flow (from `lib/main.dart`)

```
App Launch
  └─► AgreementScreen         (one-time, gates everything)
        └─► AuthScreen         (login / register)
              └─► HealthOnboardingScreen  (first-time after register)
                    └─► SensorSelectionScreen   (CGM/meter picker)
                          └─► DashboardScreen   (main app)
                                └─► ForceUpdateGate overlay (non-dismissible if outdated)
```

---

## Real Screen File Map

| Screen | Dart File | Status |
|---|---|---|
| Agreement / Terms | `presentation/screens/agreement_screen.dart` | ✅ |
| Auth (login + register tabs) | `presentation/screens/auth_screen.dart` | ✅ |
| Login | `presentation/screens/login_screen.dart` | ✅ |
| Health Onboarding | `presentation/screens/health_onboarding_screen.dart` | ✅ |
| Sensor Selection | `presentation/screens/sensor_selection_screen.dart` | ✅ |
| Dashboard / Live tab | `presentation/screens/dashboard.dart` | ✅ partial (wrong colors) |
| Logbook | `presentation/screens/logbook_screen.dart` | ✅ partial |
| Camera / AI carb | `presentation/screens/camera_screen.dart` | 🔲 |
| News feed | `presentation/screens/news_screen.dart` | 🔲 |
| Profile (root) | `presentation/screens/profile_screen.dart` | ✅ partial |
| Profile → Account | `presentation/screens/profile/_profile_account.dart` | 🔲 |
| Profile → Alarms | `presentation/screens/profile/_profile_alarms.dart` | 🔲 |
| Profile → Basal | `presentation/screens/profile/_profile_basal.dart` | 🔲 |
| Profile → Bolus helper | `presentation/screens/profile/_profile_bolus.dart` | 🔲 |
| Profile → Display | `presentation/screens/profile/_profile_display.dart` | 🔲 |
| Profile → Export | `presentation/screens/profile/_profile_export.dart` | 🔲 |
| Profile → Health integrations | `presentation/screens/profile/_profile_health.dart` | 🔲 |
| Profile → Sensor/CGM | `presentation/screens/profile/_profile_sensor.dart` | 🔲 |
| Reports | `presentation/screens/reports_screen.dart` | ✅ partial |
| Medications | `presentation/screens/medications_screen.dart` | ✅ partial |
| Caregiver share | `presentation/screens/caregiver_share_screen.dart` | 🔲 |
| Doctor view (patient) | `presentation/screens/doctor_view_screen.dart` | 🔲 |
| Doctor dashboard | `presentation/screens/doctor/doctor_dashboard_screen.dart` | 🔲 |
| Admin dashboard | `presentation/screens/admin/admin_dashboard_screen.dart` | 🔲 |
| Overlay / Floating bubble | `presentation/screens/overlay_widget.dart` | 🔲 |
| Sick day mode | `presentation/screens/sick_day_screen.dart` | 🔲 |
| Food library | `presentation/screens/food_library_screen.dart` | 🔲 |
| Notification inbox | `presentation/screens/notification_inbox_screen.dart` | 🔲 |
| Alert history | `presentation/screens/alert_history_screen.dart` | 🔲 |

---

## Full Screen Inventory (70 screens + dialogs)

### SECTION A — Onboarding & Auth (14 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| A-01 | Splash | `screens-onboarding.html` | `main.dart` splash | ✅ Figma row 1, col 0 |
| A-02 | Onboarding slide 1 — Track Your Glucose | `screens-onboarding.html` | new | ✅ Figma row 1, col 1 |
| A-03 | Onboarding slide 2 — Log Everything | `screens-onboarding.html` | new | ✅ Figma row 1, col 2 |
| A-04 | Onboarding slide 3 — Smart AI Insights | `screens-onboarding.html` | new | ✅ Figma row 1, col 3 |
| A-05 | Onboarding slide 4 — Stay Safe with Alerts | `screens-onboarding.html` | new | ✅ Figma row 1, col 4 |
| A-06 | Agreement / Terms & Privacy | `screens-auth.html` | `agreement_screen.dart` | ✅ Figma row 2, col 0 |
| A-07 | Auth root — Login tab | `screens-auth.html` | `auth_screen.dart` | ✅ Figma row 2, col 1 |
| A-08 | Auth root — Register tab | `screens-auth.html` | `auth_screen.dart` | ✅ Figma row 2, col 2 |
| A-09 | Forgot Password | `screens-auth.html` | `login_screen.dart` | ✅ Figma row 2, col 3 |
| A-10 | OTP Verification (6-digit) | `screens-auth.html` | `login_screen.dart` | ✅ Figma row 2, col 4 |
| A-11 | Health Onboarding — Diabetes type | `screens-auth.html` | `health_onboarding_screen.dart` | ✅ Figma row 2, col 5 |
| A-12 | Health Onboarding — Treatment type | `screens-auth.html` | `health_onboarding_screen.dart` | ✅ Figma row 2, col 6 |
| A-13 | Health Onboarding — Set glucose targets | `screens-auth.html` | `health_onboarding_screen.dart` | ✅ Figma row 2, col 7 |
| A-14 | Sensor Selection (Libre/Dexcom/Nightscout/Manual) | `screens-auth.html` | `sensor_selection_screen.dart` | ✅ Figma row 2, col 8 |

---

### SECTION B — Live / Dashboard Tab (5 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| B-01 | Live — Normal (118 mg/dL, in range) | — | `dashboard.dart` | 📦 Ready · `B-live-screens.js` |
| B-02 | Live — Hypo alert (58 mg/dL, pulsing red) | — | `dashboard.dart` | 📦 Ready |
| B-03 | Live — Hyper alert (285 mg/dL, amber) | — | `dashboard.dart` | 📦 Ready |
| B-04 | Live — Rapid drop (↓↓ falling fast) | — | `dashboard.dart` | 📦 Ready |
| B-05 | Live — No CGM data / sensor offline | — | `dashboard.dart` | 📦 Ready |

---

### SECTION C — Logbook Tab (8 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| C-01 | Logbook — All entries list | — | `logbook_screen.dart` | 📦 Ready · `C-logbook-screens.js` |
| C-02 | Logbook — Add Meal entry sheet | — | `logbook_screen.dart` | 📦 Ready |
| C-03 | Logbook — Add Insulin entry sheet | — | `logbook_screen.dart` | 📦 Ready |
| C-04 | Logbook — Add Exercise entry sheet | — | `logbook_screen.dart` | 📦 Ready |
| C-05 | Logbook — Add Note | — | `logbook_screen.dart` | 📦 Ready |
| C-06 | Logbook — Add Ketone | — | `logbook_screen.dart` | 📦 Ready |
| C-07 | Logbook — Filtered view (type chip active) | — | `logbook_screen.dart` | 📦 Ready |
| C-08 | Logbook — Entry detail / edit view | — | `logbook_screen.dart` | 📦 Ready |

---

### SECTION D — Camera / AI Tab (4 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| D-01 | Camera — Viewfinder / scan food | — | `camera_screen.dart` | 📦 Ready · `D-camera-screens.js` |
| D-02 | Camera — AI analyzing (loading) | — | `camera_screen.dart` | 📦 Ready |
| D-03 | Camera — AI result (meal breakdown, macros) | — | `camera_screen.dart` | 📦 Ready |
| D-04 | Camera — AI follow-up Q&A chat | — | `camera_screen.dart` | 📦 Ready |

---

### SECTION E — News Tab (2 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| E-01 | News — Feed list | — | `news_screen.dart` | 📦 Ready · `E-news-screens.js` |
| E-02 | News — Article detail | — | `news_screen.dart` | 📦 Ready |

---

### SECTION F — Reports Tab (4 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| F-01 | Reports — 7 day summary | — | `reports_screen.dart` | 📦 Ready · `F-reports-screens.js` |
| F-02 | Reports — 30 day summary | — | `reports_screen.dart` | 📦 Ready |
| F-03 | Reports — 90 day / A1c history | — | `reports_screen.dart` | 📦 Ready |
| F-04 | Reports — Doctor logbook view | — | `reports_screen.dart` | 📦 Ready |

---

### SECTION G — Profile Tab (12 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| G-01 | Profile root (scroll, all sections) | — | `profile_screen.dart` | 📦 Ready · `G-profile-screens.js` |
| G-02 | Profile → Account settings | — | `_profile_account.dart` | 📦 Ready |
| G-03 | Profile → Alarm settings | — | `_profile_alarms.dart` | 📦 Ready |
| G-04 | Profile → Basal insulin log & reminder | — | `_profile_basal.dart` | 📦 Ready |
| G-05 | Profile → Bolus helper config | — | `_profile_bolus.dart` | 📦 Ready |
| G-06 | Profile → Display / theme / units | — | `_profile_display.dart` | 📦 Ready |
| G-07 | Profile → Export data | — | `_profile_export.dart` | 📦 Ready |
| G-08 | Profile → Health integrations | — | `_profile_health.dart` | 📦 Ready |
| G-09 | Profile → Sensor / CGM settings | — | `_profile_sensor.dart` | 📦 Ready |
| G-10 | Medications list | — | `medications_screen.dart` | 📦 Ready |
| G-11 | Caregiver share screen | — | `caregiver_share_screen.dart` | 📦 Ready |
| G-12 | Doctor view (patient side) | — | `doctor_view_screen.dart` | 📦 Ready |

---

### SECTION H — Special / Role Screens (5 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| H-01 | Doctor dashboard (patient list) | — | `doctor/doctor_dashboard_screen.dart` | 📦 Ready · `H-doctor-admin-screens.js` |
| H-02 | Doctor view (patient data) | — | `doctor_view_screen.dart` | 📦 Ready |
| H-03 | Admin dashboard | — | `admin/admin_dashboard_screen.dart` | 📦 Ready |
| H-04 | Sick day mode | — | `sick_day_screen.dart` | 📦 Ready |
| H-05 | Food library | — | `food_library_screen.dart` | 📦 Ready |

---

### SECTION I — Notification & Alert Screens (3 screens)

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| I-01 | Notification inbox | — | `notification_inbox_screen.dart` | 📦 Ready · `I-notifications-screens.js` |
| I-02 | Alert history (diagnostic) | — | `alert_history_screen.dart` | 📦 Ready |
| I-03 | Force update gate (non-dismissible overlay) | — | `widgets/force_update_gate.dart` | 📦 Ready |

---

### SECTION J — Floating Overlay Bubble (3 states)

> The overlay bubble runs in a **separate Flutter engine** via `flutter_overlay_window`

| # | Screen | HTML File | Source File | Status |
|---|---|---|---|---|
| J-01 | Floating bubble — compact (just glucose value) | `screens-bubble.html` | `overlay_widget.dart` | 📦 Ready · `J-overlay-bubble-screens.js` |
| J-02 | Floating bubble — expanded popup (quick log, trend) | `screens-bubble.html` | `overlay_widget.dart` | 📦 Ready |
| J-03 | Quick log from bubble (sheet over other apps) | `screens-bubble.html` | `overlay_widget.dart` | 📦 Ready |

---

### SECTION K — Android Home Widgets (2 widgets)

| # | Widget | HTML File | Source | Status |
|---|---|---|---|---|
| K-01 | Small home widget (glucose value + arrow) | `screens-widgets.html` | `GlucoseWidgetProvider` | 📦 Ready · `K-widgets-screens.js` |
| K-02 | Graph home widget (mini sparkline + value) | `screens-widgets.html` | `GraphWidgetProvider` | 📦 Ready |

---

### SECTION L — In-App Coach Mark Bubbles (10 overlays)

> Phone frame with dimmed bg + spotlight highlight + arrow pointer tooltip

| # | Bubble | HTML File | Target Screen | Bubble Text |
|---|---|---|---|---|
| L-01 | FAB / log action hint | `screens-bubbles.html` | Live tab | "Tap here to log a reading, meal or insulin" |
| L-02 | Glucose reading hint | `screens-bubbles.html` | Live tab | "Your live glucose — tap for full history" |
| L-03 | Trend arrow hint | `screens-bubbles.html` | Live tab | "Arrow shows direction and speed of change" |
| L-04 | Camera tab hint | `screens-bubbles.html` | Camera tab | "Point at your food — AI counts the carbs" |
| L-05 | Logbook filter hint | `screens-bubbles.html` | Logbook | "Filter by type or search your history" |
| L-06 | Color coding hint | `screens-bubbles.html` | Logbook | "Green = in range · Amber = high · Red = low" |
| L-07 | TIR donut hint | `screens-bubbles.html` | Reports | "Time in Range — aim for 70%+ in green" |
| L-08 | Alarm threshold hint | `screens-bubbles.html` | Profile → Alarms | "Drag to set your personal alert levels" |
| L-09 | Bolus helper hint | `screens-bubbles.html` | Profile → Bolus | "Enter your ICR and ISF to get dose suggestions" |
| L-10 | Floating bubble hint | `screens-bubbles.html` | Live tab | "Enable the bubble to see glucose on top of any app" |

---

### SECTION M — Dialogs & Overlays (14 dialogs)

| # | Dialog | HTML File | Trigger | Status |
|---|---|---|---|---|
| M-01 | Hypo emergency alert (full-screen red) | `screens-dialogs.html` | glucose < 70 | 📦 Ready · `M-dialogs-screens.js` |
| M-02 | Hyper warning (bottom sheet amber) | `screens-dialogs.html` | glucose > 250 | 📦 Ready |
| M-03 | Rapid drop alert | `screens-dialogs.html` | ↓↓ trend | 📦 Ready |
| M-04 | Delete log entry confirmation | `screens-dialogs.html` | swipe/long press | 📦 Ready |
| M-05 | Entry saved success toast | `screens-dialogs.html` | after save | 📦 Ready |
| M-06 | Achievement unlocked | `screens-dialogs.html` | milestone | 📦 Ready |
| M-07 | Medication reminder notification overlay | `screens-dialogs.html` | scheduled | 📦 Ready |
| M-08 | Basal insulin reminder | `screens-dialogs.html` | scheduled | 📦 Ready |
| M-09 | Post-meal follow-up prompt | `screens-dialogs.html` | 2h after meal | 📦 Ready |
| M-10 | Symptom prompt (3rd episode) | `screens-dialogs.html` | alert history | 📦 Ready |
| M-11 | Sensor offline / stale data banner | `screens-dialogs.html` | CGM disconnected | 📦 Ready |
| M-12 | No internet / offline banner | `screens-dialogs.html` | network lost | 📦 Ready |
| M-13 | Notification permission request | `screens-dialogs.html` | first launch | 📦 Ready |
| M-14 | Log out confirmation | `screens-dialogs.html` | profile button | 📦 Ready |

---

## Progress Summary

| Section | Dark JS | Light JS | Screens | Status |
|---|---|---|---|---|
| A — Onboarding & Auth | `A-onboarding.js` / `A-auth.js` (pre-built) | `A-onboarding-light.js` / `A-auth-light.js` | 14 | ✅ Both themes ready |
| B — Live / Dashboard | `B-live-screens.js` | `B-live-screens-light.js` | 5 | ✅ Both themes ready |
| C — Logbook | `C-logbook-screens.js` | `C-logbook-screens-light.js` | 8 | ✅ Both themes ready |
| D — Camera / AI | `D-camera-screens.js` | `D-camera-screens-light.js` | 4 | ✅ Both themes ready |
| E — News | `E-news-screens.js` | `E-news-screens-light.js` | 2 | ✅ Both themes ready |
| F — Reports | `F-reports-screens.js` | `F-reports-screens-light.js` | 4 | ✅ Both themes ready |
| G — Profile | `G-profile-screens.js` | `G-profile-screens-light.js` | 12 | ✅ Both themes ready |
| H — Special / Role screens | `H-doctor-admin-screens.js` | `H-doctor-admin-screens-light.js` | 5 | ✅ Both themes ready |
| I — Notifications & Alerts | `I-notifications-screens.js` | `I-notifications-screens-light.js` | 3 | ✅ Both themes ready |
| J — Floating Bubble | `J-overlay-bubble-screens.js` | `J-overlay-bubble-screens-light.js` | 3 | ✅ Both themes ready |
| K — Home Widgets | `K-widgets-screens.js` | `K-widgets-screens-light.js` | 2 | ✅ Both themes ready |
| L — Coach Mark Bubbles | `L-coachmarks-screens.js` | `L-coachmarks-screens-light.js` | 10 | ✅ Both themes ready |
| M — Dialogs & Overlays | `M-dialogs-screens.js` | `M-dialogs-screens-light.js` | 14 | ✅ Both themes ready |
| **TOTAL** | **13 dark files** | **13 light files** | **86** | ✅ All 20 files complete |

**Canvas row layout:**
- Rows 3–13: Dark theme (A-dark row 3, B row 4 … M row 13)
- Rows 14–27: Light theme (A-onboarding-light row 14, A-auth-light row 15, B-light row 16 … M-light row 27)

_(v1 Figma had 8 screens but with wrong font/colors/navigation — all redone in v2)_

---

## Build Order

| Priority | HTML File | Sections | Count |
|---|---|---|---|
| 1 | `screens-onboarding.html` | A-01 to A-05 | 5 |
| 2 | `screens-auth.html` | A-06 to A-14 | 9 |
| 3 | `screens-live.html` | B-01 to B-05 | 5 |
| 4 | `screens-logbook.html` | C-01 to C-08 | 8 |
| 5 | `screens-camera.html` | D-01 to D-04 | 4 |
| 6 | `screens-news.html` | E-01 to E-02 | 2 |
| 7 | `screens-reports.html` | F-01 to F-04 | 4 |
| 8 | `screens-profile.html` | G-01 to G-12 | 12 |
| 9 | `screens-special.html` | H-01 to H-05 | 5 |
| 10 | `screens-notifications.html` | I-01 to I-03 | 3 |
| 11 | `screens-bubble.html` | J-01 to J-03 + K-01 to K-02 | 5 |
| 12 | `screens-bubbles.html` | L-01 to L-10 | 10 |
| 13 | `screens-dialogs.html` | M-01 to M-14 | 14 |

---

## Figma Capture Log

| Date | Figma File | Capture ID | Status | Notes |
|---|---|---|---|---|
| 2026-05-23 | v1 — 5YwHLypPzn9jCJZrIp6KvD | 6195240a | ✅ Done | 8 screens, wrong font/colors |
| 2026-05-23 | v2 — TBD | b31d0bc6 | ⏳ Ready to open | Will replace v1 |

---

## Corrections vs v1

| What was wrong | What it should be |
|---|---|
| Font: Inter | Font: **Montserrat** |
| Card radius: 16px | Card radius: **20px** |
| Primary color: `#1A6FE8` | Primary: **`#2563EB`** light / **`#3B82F6`** dark |
| Tab bar: Home/Logbook/Add/Reports/Profile | Tab bar: **Live / Logbook / Camera / News / Profile** |
| No camera tab | **Camera tab = AI carb counting** |
| App name: "Diabeter" | App name: **Diaboo** |
| Logo: 💉 emoji | Logo: **real teal droplet SVG** |
| Light only | **Dark mode primary** (matches app default) |
| Missing: floating bubble | **Add overlay bubble screens** |
| Missing: news feed | **Add news tab** |
| Missing: doctor/admin/caregiver | **Add all role screens** |
| Missing: camera/AI flow | **Add full camera flow** |

# Menichu Vesmich — Project TODO

## Phase 1: Foundation
- [x] Design system tokens (teal/gold/cream CSS variables in index.css)
- [x] Database schema: sessions table, bookings table
- [x] DB push migration

## Phase 2: Server Layer
- [x] DB helpers: sessions CRUD, bookings insert/list
- [x] tRPC routers: sessions (public list, admin CRUD), bookings (submit, admin list)
- [x] Seed script: all 34 sessions (Dec 2025 – Jul 2026)
- [x] notifyOwner on new booking submission

## Phase 3: Public Site
- [x] Top navigation component (teal/gold/cream)
- [x] Home page: hero, stats strip (33/20/200/18+), highlights cards, charts
- [x] Coming Events page: sessions grouped by month, type badges, Book button
- [x] Past Events page: completed sessions reverse-chronological, summary strip
- [x] Booking form: firstName, lastName, email, phone, session, stage, crèche, consent
- [x] Booking confirmation message + notifyOwner trigger

## Phase 4: Admin Panel
- [x] Role-gated admin route (admin/owner only)
- [x] Sidebar DashboardLayout for admin
- [x] Admin sessions list with edit/delete
- [x] Admin add new session form
- [x] Admin bookings viewer (all submissions)

## Phase 5: Quality
- [x] Vitest tests: booking submission, session CRUD, auth guard (8 tests passing)
- [ ] Responsive design check (mobile/tablet/desktop)
- [ ] Accessibility: contrast, focus rings, aria labels

## Phase 6: Delivery
- [ ] Save checkpoint
- [ ] Deliver permanent URL to user

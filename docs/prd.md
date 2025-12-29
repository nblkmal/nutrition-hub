---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments: ['docs/analysis/product-brief-bmadproject-2025-12-09.md', 'docs/analysis/brainstorming-session-2025-12-23.md']
workflowType: 'prd'
lastStep: 11
project_name: 'bmadproject'
user_name: 'Nabilakmal'
date: '2025-12-23'
status: 'complete'
completedAt: '2025-12-23T04:50:00Z'
---

# Product Requirements Document - bmadproject

**Author:** Nabilakmal
**Date:** 2025-12-23

---

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**bmadproject** is a zero-cost, full-stack nutrition analytics platform designed to solve the fundamental information gap that prevents active individuals from achieving their fitness goals. The product provides immediate, actionable nutrition insights through an intelligent search-first experience: users search for foods, explore detailed nutritional breakdowns, and discover related categories through smart autocategorization and advanced analytics.

**Core Vision:** Make nutrition accessible and actionable without complexity, subscriptions, or recurring costs. The platform combines algorithmic intelligence with radical cost-efficiency, demonstrating modern full-stack engineering while delivering genuine user value.

**Primary User Journey:** Search → Food Details → Explore Related Categories. Users enter with a specific food query ("chicken breast"), receive comprehensive nutritional information with visual clarity, and are guided to discover related foods and categories through intelligent recommendations and category overlap analysis.

**Technical Philosophy:** Built as a portfolio showcase piece with three intertwined value propositions:
- **Zero-Cost Sustainability:** Serverless architecture with smart API caching enables $0/month dormant costs
- **Algorithmic Intelligence:** Autocategorization engine and category overlap analysis demonstrate data science thinking
- **Modern Full-Stack Craft:** Nuxt v4 + Nuxt UI showcase cutting-edge JAMstack skills with professional polish

The product targets gym practitioners and fitness beginners who need concrete "what to eat" answers without the complexity of food logging or the expense of subscription-based nutrition databases.

---

### What Makes This Special

**Portfolio-First Differentiation:**

Unlike typical nutrition apps that focus solely on data display or tracking, bmadproject is architected specifically to showcase advanced full-stack capabilities:

1. **Intelligent Autocategorization System:**
   - Flexible JSON-based rule engine automatically classifies foods into nutrition categories
   - Demonstrates algorithmic thinking, database design, and batch processing skills
   - Evaluates multi-dimensional criteria with 0-100 match scoring

2. **Advanced Analytics Engine:**
   - Category overlap analysis using Jaccard similarity clustering
   - Versatile foods leaderboard with multi-dimensional scoring (protein-to-calorie ratios, category coverage)
   - "Bridge foods" discovery reveals connections between disparate nutrition categories

3. **Radical Cost Efficiency:**
   - Smart caching strategy: Call CalorieNinjas API once, cache forever in SQLite
   - Serverless architecture (Vercel/Cloudflare) = $0 when app is dormant
   - Zero subscription dependencies makes this genuinely sustainable as a portfolio project

4. **Modern Full-Stack Architecture:**
   - Nuxt v4 + Nuxt UI (official ecosystem components with dark mode)
   - SQLite with Vercel Blob/Cloudflare R2 for portable, file-based database
   - Social sharing with image generation for viral potential
   - Professional polish: loading states, animations, accessibility built-in

**User Experience Differentiation:**

- **Search-First Design:** Instant autocomplete from SQLite, lazy-load API misses gracefully
- **Visual Nutrition Clarity:** Circular progress bars, animated displays, contextual explanations
- **Zero Commitment Required:** Users get value immediately without registration or ongoing tracking
- **Mobile-Optimized:** Responsive design with Tailwind CSS and Nuxt UI components

---

## Project Classification

**Technical Type:** `web_app`

**Domain:** `general` (wellness/fitness)

**Complexity:** `medium`

**Classification Signals Detected:**
- "website, webapp, browser, SPA" → Modern web application with SPA capabilities
- "Nuxt v4, serverless, API integration" → Full-stack with backend services
- No regulatory/compliance concerns (unlike healthcare/fintech domains)
- Medium complexity from algorithmic features (autocategorization, analytics, advanced SQL)

**Implications:**

- **Required Sections:** Browser compatibility matrix, responsive design strategy, performance targets, SEO considerations, accessibility level (WCAG)
- **Skip Sections:** Native features, CLI commands, mobile store compliance
- **Key Focus:** Progressive enhancement, mobile-first design, fast search performance, visual accessibility
- **Portfolio Emphasis:** All three value propositions (zero-cost, algorithmic intelligence, modern stack) woven together into a cohesive narrative

---

## Success Criteria

### User Success

**Primary Success Metrics:**

1. **Instant Clarity Achievement:**
   - Users find specific nutrition information within 3 seconds of search entry
   - Search autocomplete provides relevant suggestions before they finish typing
   - "Aha!" moment: Seeing foods intelligently categorized with visual nutrition breakdown

2. **Discovery Through Connection:**
   - Users explore an average of 3+ related foods per session through category navigation
   - "Bridge foods" discovery connects disparate nutrition goals (e.g., high protein AND low carb)
   - Users return to explore new categories after finding initial answers

3. **Emotional Success State:**
   - Users leave feeling **empowered** rather than overwhelmed
   - "Finally, clear answers" - confusion transformed to clarity
   - Nutrition feels achievable, not like a complex math problem

**User Success Signal:**
> "I searched for chicken breast, saw exactly what I needed, then discovered 5 other high-protein foods I hadn't considered. This makes meal planning feel doable."

---

### Business Success

**Portfolio Career Success:**

1. **Technical Demonstration:**
   - Recruiters recognize sophisticated full-stack architecture within 2 minutes of demo
   - GitHub repository shows thoughtful engineering (autocategorization, advanced SQL, serverless)
   - Can confidently explain the zero-cost sustainability architecture in interviews

2. **Portfolio Differentiation:**
   - Demonstrates three distinct skill areas: full-stack craft, algorithmic thinking, cost-efficient architecture
   - Social sharing generation provides viral-worthy demo moment
   - Real users + real analytics = credible portfolio piece

**User Adoption Success:**

1. **Credibility Thresholds:**
   - **3 months:** 50 monthly active users, 500+ searches/month
   - **6 months:** 200 monthly active users, 2,000+ searches/month
   - **12 months:** 1,000 monthly active users, 10,000+ searches/month

2. **Engagement Metrics:**
   - Average 3+ foods explored per session (discovery through categories)
   - 25% of users share foods to social media (viral potential)
   - 40% return within 7 days (sticky value proposition)

**Business Success Signal:**
> "Recruiters are impressed by the autocategorization engine, and I have real user metrics to prove the product delivers value."

---

### Technical Success

**Infrastructure Success:**

1. **Zero-Cost Sustainability:**
   - $0/month operational costs when app is dormant
   - Serverless architecture scales without baseline server expenses
   - No subscription dependencies for any component

2. **API Caching Strategy:**
   - 95%+ cache hit rate (most searches hit SQLite, not CalorieNinjas API)
   - 10,000 unique foods cached within first 6 months
   - Graceful degradation when API quota exhausted

3. **Performance Targets:**
   - Search autocomplete responds under 200ms (p95)
   - Food detail pages load under 500ms (p95)
   - Category analytics queries complete under 1 second (p95)

4. **Reliability & Uptime:**
   - 99.5% uptime target (Vercel/Cloudflare serverless SLA)
   - Zero data loss (SQLite file backup strategy)
   - Social sharing image generation succeeds 90%+ of the time

**Technical Success Signal:**
> "The app costs $0 this month, handled 3,000 searches with only 150 API calls, and every page loaded instantly. The architecture works."

---

### Measurable Outcomes

**User Behavior Metrics:**
- Average session length: 2-5 minutes (quick value, not endless scrolling)
- Foods per session: 3+ (discovery through related categories)
- Social shares: 25% of sessions include at least one share action
- Return rate: 40% within 7 days, 60% within 30 days

**Portfolio Impact Metrics:**
- GitHub stars/contributors: Demonstrates community interest
- Interview mentions: Able to reference this project in 80%+ of technical interviews
- Recruiter engagement: Portfolio inquiries increase after launch

**Technical Health Metrics:**
- API cache hit rate: 95%+ (efficiency of caching strategy)
- Error rate: <0.1% (reliability of search and categorization)
- Cost per 1,000 searches: <$0.10 (serverless economics)

---

## Product Scope

### MVP - Minimum Viable Product

**Must Work to Prove Value:**

1. **Core Search Experience:**
   - Food search with instant autocomplete from SQLite
   - API fallback (CalorieNinjas) for missing foods with immediate caching
   - Basic nutrition display with visual clarity

2. **Food Details & Discovery:**
   - Comprehensive nutrition breakdown for each food
   - Basic category display showing related foods
   - Mobile-responsive design using Nuxt UI components

3. **Foundational Infrastructure:**
   - SQLite database with foods and categories tables
   - Serverless deployment (Vercel or Cloudflare)
   - Dark mode support built-in

**MVP Success Criteria:**
- Users can search and find nutrition facts instantly
- Related foods discovery provides value beyond simple lookup
- Portfolio demonstrates full-stack skills (Nuxt + SQLite + serverless)

**MVP Timeline:** 3-4 weeks

---

### Growth Features (Post-MVP)

**Competitive & Interesting Features:**

1. **Intelligent Autocategorization Engine:**
   - JSON-based rule system for flexible category definitions
   - Automatic food categorization with match scoring (0-100)
   - Batch categorization API endpoint for efficiency
   - Demonstrates algorithmic thinking and database design

2. **Advanced Analytics & Discovery:**
   - Versatile foods leaderboard with multi-dimensional scoring
   - Category overlap analysis using Jaccard similarity
   - "Bridge foods" discovery between nutrition categories
   - Sophisticated SQL aggregations and clustering

3. **Social & Viral Features:**
   - Social sharing integration (Twitter/X, LinkedIn, copy link)
   - Image generation for shareable nutrition cards (html2canvas)
   - Animated nutrition displays with polished UI
   - Loading states and error handling throughout

**Growth Success Criteria:**
- Portfolio showcases data science and advanced engineering skills
- Social sharing drives organic user acquisition
- Advanced features differentiate from basic nutrition apps

**Growth Timeline:** 4-6 weeks after MVP

---

### Vision (Future)

**Dream Version - Complete Product:**

1. **User Accounts & Personalization:**
   - User registration and authentication (passwordless or OAuth)
   - Saved meal plans and favorite foods
   - Personalized recommendations based on search history
   - Weekly nutrition summaries via email

2. **Smart Meal Planning:**
   - Meal type recommendations (post-workout, keto-friendly, high-protein)
   - Daily meal plan generator based on goals and preferences
   - Automated shopping list generation from meal plans
   - Nutrient tracking without tedious logging

3. **Enhanced Analytics:**
   - Personal nutrition dashboard and trends
   - Goal progress tracking (muscle building, weight loss)
   - Comparison analytics across similar foods
   - Export meal plans and nutrition data

4. **Community Features:**
   - User-submitted foods and recipes
   - Category voting and refinement
   - Social meal plan sharing
   - Expert nutritionist contributions

**Vision Success Criteria:**
- Competes feature-complete with commercial nutrition apps
- Sustainable business model (optional premium tier or B2B licensing)
- Large active user community and content ecosystem

**Vision Timeline:** 6-12 months after Growth

## User Journeys

### Journey 1: Alex Chen - The Confused Beginner

**Character Profile:**
- **Name:** Alex Chen, 24, Software Engineer
- **Situation:** Joined a gym 3 months ago, excited at first, now frustrated with nutrition confusion
- **Goal:** Wants to build muscle but has NO IDEA what to eat
- **Obstacle:** Googling "high protein foods" gives abstract lists without context. Downloaded MyFitnessPal but quit after 20 minutes - too complex for where he's at right now

**Opening Scene:**
It's 10pm on a Tuesday. Alex just got home from the gym, exhausted. He knows he should eat something with protein, but he's standing in front of his fridge staring at... nothing helpful. He pulls out his phone and searches "what should I eat after workout muscle building" and gets 47 different articles with contradictory advice. He feels like giving up.

**Discovery:**
On Reddit, someone mentions "this simple nutrition search tool that just tells you what foods are good." Skeptical but desperate, Alex gives it a try.

**The Journey:**
Alex lands on the site, sees a clean search bar. Types "chicken breast" because he knows that's probably good. Instantly, he sees:
- Clear nutrition facts with visual bars (protein: HIGH!)
- Related foods section: "Other high-protein lean meats" - turkey, fish, lean beef
- He can SEE what 100g looks like, not just "31g protein"

The breakthrough: He clicks the "High Protein" category and discovers 15 foods he never considered. For the first time, he feels like he can actually do this. No logging, no math, just "here's what to eat."

**Resolution:**
Three weeks later, Alex has tried 8 new high-protein foods. He's not confused anymore - he knows exactly what to buy at the grocery store. His gym buddy notices he's looking more defined. Alex shares the tuna steak nutrition card to Instagram because he's proud of finally figuring this out.

**Journey Requirements Revealed:**
- Instant search with intelligent autocomplete from SQLite
- Visual nutrition clarity (circular progress bars, visual indicators, not just numbers)
- Category-based discovery ("show me more like this")
- Mobile-responsive design (standing in front of fridge use case)
- Social sharing capability (Twitter/X, LinkedIn, image generation)

---

### Journey 2: Sarah Mitchell - The Optimizing Gym-Goer

**Character Profile:**
- **Name:** Sarah Mitchell, 31, Marketing Manager
- **Situation:** Gym 5 days/week for 2 years, hit a plateau 3 months ago
- **Goal:** Cut to 15% body fat while maintaining muscle mass
- **Obstacle:** Knows nutrition basics but needs PRECISION. "High protein" isn't enough - she needs high protein AND low fat AND moderate carb

**Opening Scene:**
Sarah is meal prepping on Sunday. She has her macros: 150g protein, 180g carbs, 50g fat. She's been eating chicken breast and rice for 6 weeks. She's bored. She's also not sure if there are better options - foods that hit her macros more efficiently.

**The Journey:**
She opens the app and searches "salmon." Sees the nutrition, but then notices something interesting: "This food appears in 4 categories: High Protein, Healthy Fats, Low Carb, Post-Workout."

She clicks "Versatile Foods" leaderboard and discovers:
- **Egg whites** score #1 for protein-to-calorie ratio
- **Greek yogurt** appears in 5 categories (a "bridge food")
- She realizes she can replace some chicken with yogurt for variety

The breakthrough: She finds "cottage cheese" - a food she never considered - that's high protein, moderate carb, low fat. Perfect for her cutting phase. She shares it to her fitness group chat.

**Resolution:**
Sarah's meal prep now includes 8 different foods instead of 3. She breaks her plateau after 6 weeks. She tells her personal trainer about this tool, and he starts using it with other clients.

**Journey Requirements Revealed:**
- Multi-dimensional category display (foods can belong to multiple categories)
- Versatile foods leaderboard with multi-dimensional scoring
- Category overlap analysis ("bridge foods" that connect categories)
- Advanced search filters (high protein + low fat combinations)
- Detailed nutrition comparison between foods
- Social sharing to fitness communities

---

### Journey 3: Marcus Johnson - The Portfolio Visitor (Recruiter)

**Character Profile:**
- **Name:** Marcus Johnson, 29, Technical Recruiter at major tech company
- **Situation:** Reviewing 50+ portfolios for a full-stack engineer position
- **Goal:** Find candidates who can ship real products with thoughtful architecture
- **Obstacle:** Most portfolios are toy projects or incomplete tutorials

**Opening Scene:**
Marcus opens your portfolio link. He's tired, has seen 20 portfolios today, most are "todo apps" and "weather widgets." He's skeptical.

**The Journey:**
Marcus lands on your GitHub README. Within 30 seconds, he sees:
- "Zero-cost nutrition analytics platform" - interesting, not another todo app
- "Autocategorization engine with JSON rule system" - demonstrates algorithmic thinking
- "Serverless architecture, $0/month dormant costs" - shows cost-conscious engineering
- "Nuxt v4 + Nuxt UI + SQLite" - modern stack

He clicks the live demo. Searches "avocado." Instant response. Sees categories: "Healthy Fats," "Low Carb," "High Fiber." Then he notices the "Share" button, generates an image - smooth animation.

He clicks "Versatile Foods Leaderboard" and sees circular progress bars, animated loading states, dark mode toggle. He's impressed - this feels polished.

**Resolution:**
Marcus schedules an interview. During the technical screen, he asks about the autocategorization algorithm. You explain the JSON rule engine and match scoring system. Marcus makes a note: "This one ships."

**Journey Requirements Revealed:**
- Professional, polished UI with loading states and animations
- Dark mode support (modern UX expectation)
- Clear value proposition in README and landing page
- Social sharing image generation (wow factor for demo)
- Advanced analytics features visible in interactive demo
- Responsive design that works across devices

---

### Journey 4: Nabilakmal - System Administrator

**Character Profile:**
- **Name:** Nabilakmal, Portfolio Project Owner
- **Situation:** Building this project to showcase full-stack skills while maintaining zero operating costs
- **Goal:** Manage the system, monitor performance, ensure $0/month costs, demonstrate capabilities
- **Obstacle:** Need visibility into API usage, cache effectiveness, user behavior without paid monitoring tools

**Opening Scene:**
It's the first of the month. You check your Vercel dashboard - $0.00 in costs. Good. But you want to know: how's the caching strategy working?

**The Journey:**
You open the admin analytics dashboard:
- **API Cache Hit Rate:** 96% (excellent - only 4% of searches hit CalorieNinjas)
- **Total Searches:** 2,341 this month
- **Unique Foods Cached:** 1,847
- **API Calls Used:** 93 out of 10,000 quota

You notice searches for "plant-based protein" are trending. You check if those foods are cached - they are.

You also see a slow query on the "Versatile Foods" leaderboard. You check the SQL - it's the Jaccard similarity calculation. You add an index and the query speeds up.

**Resolution:**
The system hums along at $0/month. You have real metrics to show recruiters: "2,000+ searches, 96% cache efficiency, zero infrastructure costs." You export an analytics PDF for your portfolio presentation.

**Journey Requirements Revealed:**
- Admin analytics dashboard with key metrics
- API usage monitoring and quota tracking
- Cache performance metrics (hit rate, miss analysis)
- Search analytics (trending foods, popular categories)
- System health monitoring (slow queries, error rates)
- Data export functionality (PDF reports for portfolio)

---

### Journey 5: Social Media Visitor - Viral Discovery

**Character Profile:**
- **Name:** Any fitness enthusiast on social media
- **Situation:** Scrolling through Instagram/X, sees a beautifully designed nutrition card shared by someone
- **Goal:** Wants to find that food's nutrition information
- **Obstacle:** Needs to navigate from social media to the app

**Opening Scene:**
A fitness influencer shares a nutrition card for "lean beef" showing 26g protein per 100g with a beautiful visual design. Their follower sees it and thinks "finally, I need more protein in my diet."

**The Journey:**
The follower clicks the link in the bio/ swipe up, lands directly on the lean beef food detail page. They see:
- Full nutrition breakdown
- Related high-protein foods
- "Explore High Protein Category" button

They discover 3 other foods they didn't know about. They share one themselves.

**Resolution:**
Viral loop continues. Each share brings new users who discover value immediately.

**Journey Requirements Revealed:**
- Direct deep-linking to food detail pages
- Beautiful, shareable nutrition card design
- Clear call-to-action from shared content to explore more
- Social metadata (open graph tags) for rich previews
- Conversion from social visitor to engaged user

---

### Journey Requirements Summary

**Core Capabilities Revealed Across All Journeys:**

1. **Search & Discovery:**
   - Instant search autocomplete from SQLite
   - API fallback with immediate caching
   - Mobile-responsive search interface

2. **Food Details & Display:**
   - Visual nutrition breakdown (circular progress bars)
   - Multi-dimensional category display
   - Related foods recommendations by category

3. **Advanced Analytics (Growth Features):**
   - Autocategorization engine with JSON rules
   - Versatile foods leaderboard
   - Category overlap analysis
   - "Bridge foods" discovery

4. **Social & Viral Features:**
   - Social sharing (Twitter/X, LinkedIn, copy link)
   - Image generation for shareable cards
   - Deep-linking support

5. **Admin & Monitoring:**
   - Analytics dashboard
   - API usage monitoring
   - Cache performance tracking
   - System health metrics

6. **UI/UX Polish:**
   - Dark mode support
   - Loading states and animations
   - Error handling and graceful degradation
   - Professional Nuxt UI components throughout

## Web Application Specific Requirements

### Web Application Overview

**bmadproject** is a modern Nuxt v4 web application combining SPA-style interactivity with SSR-powered SEO discoverability. The application uses a hybrid architecture: client-side navigation for instant search experiences paired with server-side rendering for content pages to maximize organic search visibility and social sharing optimization.

**Core Technical Philosophy:** 
- **SEO-First Content Pages:** Food detail pages server-rendered for Google indexing and rich social media previews
- **SPA-Style Interactive Features:** Search, leaderboards, and analytics use client-side rendering for instant feedback
- **Progressive Enhancement:** Core functionality works without JavaScript, enhanced experiences with JS enabled
- **Evergreen Browser Support:** Target modern browsers with polyfills for reasonable fallbacks

---

### Technical Architecture Considerations

**Hybrid Rendering Strategy:**

1. **Server-Side Rendered (SSR) Pages:**
   - Food detail pages (`/foods/[slug]`) - Core SEO landing pages
   - Category browse pages (`/categories/[slug]`) - SEO-optimized category content
   - Homepage (`/`) - SSR for initial load, then SPA navigation
   - Purpose: Google crawlability + Open Graph rich previews for social sharing

2. **Client-Side Rendered (CSR) Features:**
   - Search autocomplete and results
   - Versatile foods leaderboard
   - Category analytics and overlap visualization
   - Admin dashboard
   - Purpose: Instant feedback, no page reloads, app-like experience

3. **SPA Navigation:**
   - `<NuxtLink>` for internal navigation (no full page reload)
   - Vue Router for client-side routing after initial SSR page load
   - Seamless transition between SSR entry points and CSR interactions

**Caching Strategy:**
- Static page generation for high-traffic food pages (ISR - Incremental Static Regeneration)
- CDN caching for static assets (images, CSS, JS)
- API response caching at edge (Vercel Edge Config or Cloudflare Workers KV)

---

### Browser Compatibility Matrix

**Primary Support (Fully Tested):**
- Chrome/Edge: Last 2 versions (current + previous)
- Firefox: Last 2 versions
- Safari: Last 2 versions (macOS + iOS)
- Samsung Internet: Last 2 versions

**Secondary Support (Best Effort):**
- Opera: Last 2 versions (Chromium-based, likely works)
- Older browser versions: May work with polyfills, not tested

**Unsupported:**
- Internet Explorer (any version) - No polyfills, graceful degradation message shown
- Android browser < Chrome 80 - Redirect to modern browser download page

**Progressive Enhancement Approach:**
- Core content displays without JavaScript
- Enhanced interactions (search, analytics) require JavaScript
- Modern CSS features with @supports fallbacks
- Service Worker for offline support (optional, Growth phase)

---

### Responsive Design Strategy

**Mobile-First Development:**
- Design base: 320px mobile viewport
- Breakpoints: 
  - Small: < 640px (mobile)
  - Medium: 640px - 1024px (tablet)
  - Large: > 1024px (desktop)
  - XLarge: > 1280px (wide desktop)

**Layout Adaptation:**
- **Mobile:** Single column, stacked navigation, bottom sheet modals
- **Tablet:** Two-column layouts for food details, side navigation
- **Desktop:** Multi-column dashboards, persistent sidebar navigation

**Touch Optimization:**
- Minimum touch target size: 44x44px (WCAG 2.1 AAA)
- Swipe gestures for category navigation
- Pull-to-refresh on search results
- Haptic feedback where supported (mobile)

**Component Responsiveness:**
- Nuxt UI components handle most responsive behavior automatically
- Tailwind CSS `responsive:` prefixes for custom responsive utilities
- CSS Grid/Flexbox for adaptive layouts

---

### Performance Targets

**Core User Experience Metrics:**

| Metric Type | Target | Measurement |
|-------------|--------|-------------|
| Search Autocomplete | < 200ms (p95) | SQLite query time |
| Food Detail Load | < 500ms (p95) | SSR render + data fetch |
| Category Analytics | < 1000ms (p95) | Complex SQL query time |
| Initial Page Load | < 2s (p95) | Homepage LCP (Largest Contentful Paint) |
| Time to Interactive | < 3s (p95) | TTI metric |

**Core Web Vitals (Google Search Ranking Factors):**

- **LCP (Largest Contentful Paint):** < 2.5s
  - Measure: Time to render largest image/text element
  - Optimization: Image optimization, CDN delivery, SSR

- **FID (First Input Delay):** < 100ms
  - Measure: Time from first user interaction to browser response
  - Optimization: Minimize JavaScript bundle, code splitting

- **CLS (Cumulative Layout Shift):** < 0.1
  - Measure: Visual stability during page load
  - Optimization: Reserve space for images, avoid inserting content above existing content

**Performance Budget:**
- JavaScript bundle: < 200KB (gzipped) per route
- CSS bundle: < 50KB (gzipped) total
- Initial page payload: < 500KB (total resources)
- Image optimization: WebP format, lazy loading, responsive images

---

### SEO Strategy

**Organic Search Optimization:**

1. **Keyword Targeting:**
   - Primary: "[food name] nutrition" (e.g., "chicken breast nutrition")
   - Secondary: "high [nutrient] foods" (e.g., "high protein foods")
   - Long-tail: "foods for [goal]" (e.g., "foods for muscle building")

2. **On-Page SEO:**
   - Unique `<title>` tags: "Chicken Breast Nutrition Facts - [Site Name]"
   - Meta descriptions: "Discover chicken breast nutrition: 31g protein per 100g, 165 calories. Explore high-protein foods..."
   - Semantic HTML: Proper heading hierarchy (H1 → H2 → H3)
   - Structured data: Schema.org NutritionInformation markup
   - Internal linking: Related foods, category pages

3. **Technical SEO:**
   - XML sitemap: `/sitemap.xml` (auto-generated by Nuxt)
   - Robots.txt: Allow all crawlers, disallow admin routes
   - Canonical URLs: Prevent duplicate content issues
   - Open Graph tags: Enable rich link previews
   - Twitter Card tags: Enhanced Twitter sharing

4. **Content Strategy:**
   - Each food page: 300+ words of unique content (nutrition breakdown, related foods, category context)
   - Category pages: Curated food lists with category descriptions
   - Blog/content section (optional, Vision phase): Nutrition education articles

**Social Sharing Optimization:**

1. **Open Graph Tags (Facebook/LinkedIn/General):**
   ```html
   <meta property="og:title" content="Chicken Breast: 31g Protein per 100g">
   <meta property="og:description" content="High-protein lean meat for muscle building">
   <meta property="og:image" content="https://yoursite.com/images/chicken-breast-share.png">
   <meta property="og:url" content="https://yoursite.com/foods/chicken-breast">
   <meta property="og:type" content="website">
   ```

2. **Twitter Card Tags:**
   ```html
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="Chicken Breast Nutrition Facts">
   <meta name="twitter:description" content="31g protein, 165 calories per 100g">
   <meta name="twitter:image" content="https://yoursite.com/images/chicken-breast-share.png">
   ```

3. **Share Image Generation:**
   - html2canvas generates shareable nutrition cards on-the-fly
   - Cached images served from CDN (Vercel Blob / Cloudflare R2)
   - Aspect ratio: 1200x630px (recommended by Open Graph)

---

### Accessibility Level (WCAG 2.1 AA Compliance)

**WCAG 2.1 AA Requirements:**

**Perceivable:**
- **Text Alternatives:** All images have alt text (nutrition icons, category badges)
- **Captions/Alternatives:** Share images have text fallback (nutrition data in page content)
- **Adaptable:** Content preserves meaning when linearized (screen reader order)
- **Distinguishable:** Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- **Text Resize:** Text readable up to 200% zoom without horizontal scrolling

**Operable:**
- **Keyboard Accessible:** All functionality accessible via keyboard (Tab, Enter, Escape, Arrow keys)
- **No Keyboard Traps:** Clear focus indicators, logical tab order
- **Timing Adjustable:** No time limits (no auto-logout or session timeouts)
- **Seizure Safety:** No flashing content (>3 flashes per second)
- **Navigable:** Skip links ("Skip to main content"), breadcrumb navigation
- **Input Assistance:** Error identification, labels, instructions (search forms)

**Understandable:**
- **Readable:** Language of page declared (`<html lang="en">`)
- **Predictable:** Consistent navigation (search always top-right, categories always in sidebar)
- **Input Assistance:** Search suggestions, error messages, form validation

**Robust:**
- **Compatible:** Works with assistive technologies (screen readers, voice control)
- **ARIA Attributes:** Proper ARIA labels, roles, and states throughout
- **Semantic HTML:** Use proper elements (`<nav>`, `<main>`, `<article>`, `<button>`)

**Accessibility Testing:**
- Automated testing: axe-core, Lighthouse accessibility audits
- Manual testing: Keyboard-only navigation, screen reader testing (NVDA/VoiceOver)
- User testing: Include users with disabilities in beta testing (optional, Vision phase)

**Nuxt UI Accessibility:**
- Nuxt UI components are WCAG 2.1 AA compliant out-of-the-box
- Custom components must meet same standards
- Regular accessibility audits in development workflow

---

### Implementation Considerations

**Technical Stack Implications:**

1. **Nuxt v4 Configuration:**
   - Enable SSR for content pages (`ssr: true`)
   - Configure route rules for ISR on high-traffic pages
   - Set up `<NuxtLink>` for SPA navigation
   - Implement proper error handling and loading states

2. **Performance Monitoring:**
   - Lighthouse CI in deployment pipeline
   - Core Web Vitals tracking (Google Search Console)
   - Real User Monitoring (RUM) - optional, Growth phase
   - Performance budget enforcement in build process

3. **SEO Monitoring:**
   - Google Search Console for crawl errors and search analytics
   - Google Analytics for organic traffic tracking
   - Position tracking for target keywords (optional)
   - Backlink monitoring (optional)

4. **Accessibility Testing Integration:**
   - axe-core integration in CI/CD pipeline
   - Lighthouse accessibility scores in deployment checks
   - Manual accessibility testing before major releases

**Development Priorities:**
1. **MVP:** Core SEO (SSR food pages, meta tags) + basic accessibility (keyboard nav, ARIA labels)
2. **Growth:** Advanced SEO (schema markup, content optimization) + full WCAG 2.1 AA compliance
3. **Vision:** SEO content strategy (blog, guides) + accessibility user testing

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** **Platform MVP with Portfolio-First Feature Completeness**

**Philosophy:**
Rather than a minimal problem-solving MVP, we're building a **comprehensive platform MVP** that demonstrates full-stack engineering sophistication from day one. This approach prioritizes portfolio impact and technical showcase over lean startup speed-to-market principles.

**Strategic Rationale:**
- **Primary Goal:** Portfolio showcase demonstrating three value propositions (zero-cost architecture, algorithmic intelligence, modern full-stack craft)
- **Secondary Goal:** Deliver genuine user value to fitness beginners and gym practitioners
- **Tertiary Goal:** Validate technical architecture and gather real user metrics

**Resource Requirements:**
- **Team Size:** Solo developer (Nabilakmal)
- **Skills Required:** Full-stack JavaScript (Nuxt/Vue), SQL/database design, API integration, serverless deployment, UI/UX design
- **Timeline:** 6-7 weeks for full-featured MVP

---

### MVP Feature Set (Phase 1) - Full-Featured Launch

**Core User Journeys Supported:**
1. ✅ **Alex Chen (Confused Beginner)** - Instant search clarity, category discovery
2. ✅ **Sarah Mitchell (Optimizing Gym-Goer)** - Advanced analytics, versatile foods, category overlap
3. ✅ **Marcus Johnson (Recruiter)** - Portfolio wow factors (autocategorization, leaderboard, sharing)
4. ✅ **Nabilakmal (System Admin)** - Analytics dashboard, cost monitoring
5. ✅ **Social Media Visitor** - Viral sharing with rich link previews

**Must-Have Capabilities (All Included in MVP):**

**1. Search & Discovery (Weeks 1-2):**
- Instant search autocomplete from SQLite (<200ms)
- API fallback (CalorieNinjas) with immediate caching
- Mobile-responsive search interface
- Search result ranking by relevance

**2. Food Details & Display (Weeks 2-3):**
- Comprehensive nutrition breakdown per 100g serving
- Visual nutrition indicators (circular progress bars for protein, carbs, fat)
- Multi-dimensional category display (foods appear in multiple categories)
- Related foods recommendations by category
- SEO-optimized food detail pages (SSR)

**3. Intelligent Autocategorization Engine (Weeks 3-4):**
- JSON-based rule system for flexible category definitions
- Automatic food categorization with match scoring (0-100)
- Categories: High Protein, Low Carb, Healthy Fats, High Fiber, Post-Workout, Keto-Friendly, etc.
- Batch categorization API endpoint for efficiency
- Manual override capabilities for edge cases

**4. Advanced Analytics & Discovery (Weeks 4-5):**
- **Versatile Foods Leaderboard:** Multi-dimensional scoring (protein-to-calorie ratio, category coverage)
- **Category Overlap Analysis:** Jaccard similarity clustering between categories
- **"Bridge Foods" Discovery:** Foods that connect disparate nutrition categories
- Sophisticated SQL aggregations and clustering algorithms

**5. Social & Viral Features (Week 5):**
- Social sharing integration (Twitter/X, LinkedIn, copy link)
- Image generation for shareable nutrition cards (html2canvas)
- Open Graph and Twitter Card meta tags
- Deep-linking support for shared URLs
- Beautiful, shareable nutrition card design

**6. Admin & Monitoring (Weeks 5-6):**
- Admin analytics dashboard with key metrics
- API usage monitoring and quota tracking (10K/month limit)
- Cache performance metrics (hit rate, miss analysis)
- Search analytics (trending foods, popular categories)
- System health monitoring (slow queries, error rates)

**7. UI/UX Polish (Weeks 6-7):**
- Dark mode support (built-in with Nuxt UI)
- Loading states and skeleton screens
- Error handling and graceful degradation
- Full WCAG 2.1 AA accessibility compliance
- Professional Nuxt UI components throughout
- Smooth animations and transitions

**8. Technical Infrastructure (Ongoing):**
- SQLite database with foods, categories, and food_categories junction tables
- Serverless deployment (Vercel or Cloudflare Pages)
- File-based SQLite with Vercel Blob or Cloudflare R2 storage
- Zero-cost sustainability architecture ($0/month when dormant)

**MVP Success Criteria:**
- ✅ All 5 user journeys fully supported
- ✅ Portfolio demonstrates three value propositions clearly
- ✅ Real users can find value immediately
- ✅ Recruiters see sophisticated full-stack engineering
- ✅ System operates at $0/month cost basis
- ✅ Full WCAG 2.1 AA compliance achieved

---

### Post-MVP Features

**Phase 2 (Growth - Optional, 4-6 weeks after MVP):**

**Enhanced Analytics:**
- Personal nutrition dashboard for users
- Goal progress tracking (muscle building, weight loss)
- Comparison analytics across similar foods
- Export meal plans and nutrition data (PDF, CSV)

**Advanced Search:**
- Nutrient search filters ("high protein AND low fat")
- Meal type search (post-workout, breakfast, dinner)
- Saved search queries for quick access

**Community Features:**
- User-submitted foods and recipes
- Category voting and refinement
- User-generated content moderation

**Phase 3 (Expansion - Future Vision, 6-12 months):**

**User Accounts & Personalization:**
- User registration and authentication (passwordless or OAuth)
- Saved meal plans and favorite foods
- Personalized recommendations based on search history
- Weekly nutrition summaries via email

**Smart Meal Planning:**
- Meal type recommendations engine
- Daily meal plan generator based on goals and preferences
- Automated shopping list generation from meal plans
- Nutrient tracking without tedious logging

**Platform Expansion:**
- B2B licensing for nutritionists and gyms
- API for third-party integrations
- Mobile apps (iOS/Android) using React Native or similar
- Premium subscription tier for advanced features (optional business model)

---

### Risk Mitigation Strategy

**Technical Risks:**

**Risk 1: Autocategorization Accuracy**
- **Mitigation:** Start with manually curated common foods (100-200 items)
- **Fallback:** Allow manual category overrides by admin
- **Validation:** User feedback mechanism on category accuracy
- **Contingency:** Simplify to 5 core categories if algorithmic approach proves too complex

**Risk 2: SQL Query Performance for Analytics**
- **Mitigation:** Database indexing on frequently queried columns
- **Fallback:** Pre-compute analytics views (materialized views)
- **Monitoring:** Slow query logging and optimization
- **Contingency:** Simplify analytics if queries exceed 1-second target

**Risk 3: Social Sharing Image Generation Failures**
- **Mitigation:** Pre-generate share images for common foods
- **Fallback:** Use static share card template if html2canvas fails
- **Monitoring:** Error tracking on image generation success rate
- **Contingency:** Remove image generation if failure rate >10%

**Market Risks:**

**Risk 1: Low User Adoption**
- **Mitigation:** SEO strategy for organic search traffic
- **Validation:** Share in fitness communities (Reddit, Discord, Twitter)
- **Contingency:** Focus on portfolio value if user adoption is low

**Risk 2: Competitors with Similar Features**
- **Mitigation:** Portfolio-first positioning (different goal than commercial nutrition apps)
- **Differentiation:** Algorithmic analytics not commonly found in free nutrition tools
- **Contingency:** Pivot to emphasize unique advanced analytics capabilities

**Resource Risks:**

**Risk 1: Timeline Overrun (6-7 weeks exceeds available time)**
- **Mitigation:** Feature prioritization with "must-have" vs. "nice-to-have"
- **Fallback:** Defer Phase 2 features to post-MVP
- **Contingency:** Launch with 5-6 core categories instead of 10+

**Risk 2: Solo Developer Burnout**
- **Mitigation:** Sustainable development pace (40 hours/week max)
- **Support:** Leverage AI tools (ChatGPT, Copilot) for code generation
- **Contingency:** Extend timeline to 8-9 weeks if needed, prioritize health

**Risk 3: API Quota Exhaustion (CalorieNinjas 10K/month limit)**
- **Mitigation:** Aggressive caching strategy (target 95%+ cache hit rate)
- **Fallback:** Manual data entry for popular missing foods
- **Monitoring:** Daily API usage alerts
- **Contingency:** Switch to alternative free API or data source

---

### Development Timeline & Milestones

**Week 1-2: Foundation**
- Project setup (Nuxt v4, Nuxt UI, SQLite)
- Database schema design and implementation
- Seed initial food data (100-200 common foods)
- Basic search functionality with SQLite

**Week 3-4: Core Features**
- API integration (CalorieNinjas) with caching
- Food detail pages with visual nutrition display
- Basic category system and related foods
- Mobile-responsive design

**Week 4-5: Advanced Analytics**
- Autocategorization engine (JSON rule system)
- Versatile foods leaderboard
- Category overlap analysis
- Admin analytics dashboard

**Week 5-6: Polish & Integration**
- Social sharing with image generation
- Dark mode support
- Accessibility compliance (WCAG 2.1 AA)
- Error handling and loading states

**Week 6-7: Launch Preparation**
- SEO optimization (meta tags, sitemap, structured data)
- Performance optimization (bundle size, image optimization)
- Testing (cross-browser, accessibility, performance)
- Deployment (Vercel/Cloudflare)
- Portfolio README and demo preparation

**Week 7+: Launch & Iterate**
- Public launch announcement
- Monitor analytics and user feedback
- Bug fixes and minor improvements
- Gather insights for Phase 2 planning

## Functional Requirements

### Food Discovery & Search

**FR1:** Users can search for foods by name and receive instant autocomplete suggestions
**FR2:** Users can submit search queries and receive relevant food results ranked by match relevance
**FR3:** The system can query local SQLite database for foods and return results
**FR4:** The system can fetch nutrition data from external API (CalorieNinjas) when food is not in local database
**FR5:** The system can cache externally fetched nutrition data in local database for future queries
**FR6:** Users can view search results on mobile, tablet, and desktop devices
**FR7:** Users can navigate to food detail pages from search results

---

### Nutrition Information Display

**FR8:** Users can view comprehensive nutrition information for individual foods including calories, protein, carbohydrates, fat, fiber, and sugar
**FR9:** Users can view nutrition data displayed visually with progress indicators for key macronutrients
**FR10:** Users can view serving size information standardized to 100g portions
**FR11:** Users can view related foods that belong to the same nutrition category as the current food
**FR12:** The system can serve food detail pages that are discoverable by search engines (SEO-optimized)
**FR13:** The system can provide unique URLs for each food that support deep-linking from shared content

---

### Categorization & Analytics

**FR14:** The system can automatically assign foods to nutrition categories based on JSON-defined rules
**FR15:** The system can evaluate foods against category criteria and assign match scores (0-100)
**FR16:** Users can view all nutrition categories that a specific food belongs to
**FR17:** Users can browse foods by nutrition category
**FR18:** Users can view a leaderboard of foods ranked by versatility across multiple categories
**FR19:** Users can view category overlap analysis showing relationships between nutrition categories
**FR20:** Users can discover "bridge foods" that connect disparate nutrition categories
**FR21:** Administrators can define and modify category rules using JSON configuration
**FR22:** Administrators can manually override automatic categorization for specific foods
**FR23:** The system can batch categorize multiple foods in a single operation

---

### Social Sharing & Virality

**FR24:** Users can share food nutrition information to social media platforms (Twitter/X, LinkedIn)
**FR25:** Users can copy shareable links to food nutrition information
**FR26:** The system can generate visual nutrition cards for sharing on social media
**FR27:** The system can provide rich link previews when content is shared on social media platforms (Open Graph tags)
**FR28:** The system can provide enhanced previews when content is shared on Twitter (Twitter Card tags)

---

### System Administration

**FR29:** Administrators can view analytics dashboard showing system metrics and usage statistics
**FR30:** Administrators can monitor API usage and track remaining API quota
**FR31:** Administrators can view cache performance metrics including hit rate and miss analysis
**FR32:** Administrators can view search analytics including trending foods and popular categories
**FR33:** Administrators can monitor system health including slow queries and error rates
**FR34:** The system can send alerts when API quota approaches monthly limit
**FR35:** The system can export analytics data for portfolio documentation purposes

---

### User Experience & Accessibility

**FR36:** Users can access all functionality using keyboard-only navigation
**FR37:** Users can perceive all content with screen readers and other assistive technologies
**FR38:** Users can view content with sufficient color contrast (WCAG 2.1 AA standard)
**FR39:** Users can resize text up to 200% without horizontal scrolling
**FR40:** Users can access content on mobile, tablet, and desktop devices with responsive layouts
**FR41:** Users can switch between light and dark visual themes
**FR42:** Users can view loading states and skeleton screens while content is being fetched
**FR43:** Users can receive clear error messages when functionality fails or is unavailable
**FR44:** Users can navigate using consistent navigation patterns across all pages

---

### Content Management

**FR45:** Administrators can add new foods to the database manually
**FR46:** Administrators can edit nutrition information for existing foods
**FR47:** Administrators can manage nutrition categories including create, read, update, and delete operations
**FR48:** The system can generate XML sitemap for search engine crawlers
**FR49:** The system can provide robots.txt file for search engine crawler guidance
**FR50:** The system can include structured data markup (Schema.org) for food nutrition information

## Non-Functional Requirements

### Performance

**User-Facing Response Times:**
- **NFR-PERF-001:** Search autocomplete completes within 200ms (95th percentile) for cached results
- **NFR-PERF-002:** Food detail pages load within 500ms (95th percentile) from server-side render
- **NFR-PERF-003:** Category analytics queries complete within 1000ms (95th percentile)
- **NFR-PERF-004:** Initial homepage load completes within 2 seconds (95th percentile) on 4G mobile connections

**Core Web Vitals (Google Search Ranking):**
- **NFR-PERF-005:** Largest Contentful Paint (LCP) < 2.5 seconds for 95% of page loads
- **NFR-PERF-006:** First Input Delay (FID) < 100 milliseconds for 95% of user interactions
- **NFR-PERF-007:** Cumulative Layout Shift (CLS) < 0.1 for 95% of page sessions

**Resource Efficiency:**
- **NFR-PERF-008:** JavaScript bundle size < 200KB (gzipped) per route
- **NFR-PERF-009:** CSS bundle size < 50KB (gzipped) total
- **NFR-PERF-010:** Initial page payload < 500KB total resources (images, JS, CSS combined)

---

### Security

**Data Protection:**
- **NFR-SEC-001:** All data transmission uses HTTPS/TLS 1.3 or higher
- **NFR-SEC-002:** API keys and credentials stored as environment variables, never committed to version control
- **NFR-SEC-003:** SQLite database file permissions restrict access to application processes only

**API Security:**
- **NFR-SEC-004:** CalorieNinjas API calls include appropriate API key authentication
- **NFR-SEC-005:** Rate limiting implemented to prevent API quota exhaustion (target: max 10,000 calls/month)
- **NFR-SEC-006:** Graceful degradation when API quota exhausted (serve cached data only)

**Input Validation:**
- **NFR-SEC-007:** All user search inputs sanitized to prevent SQL injection attempts
- **NFR-SEC-008:** URL parameters validated and sanitized to prevent XSS attacks

---

### Scalability

**User Growth:**
- **NFR-SCALE-001:** System supports growth from 50 to 1,000 monthly active users with <10% performance degradation
- **NFR-SCALE-002:** System supports 10,000 searches/month to 100,000 searches/month with linear cost scaling (serverless economics)

**Data Growth:**
- **NFR-SCALE-003:** SQLite database efficiently handles up to 50,000 unique food items with query performance within NFR-PERF targets
- **NFR-SCALE-004:** Cache strategy maintains 95%+ hit rate as database grows to 10,000 foods

**Infrastructure Scaling:**
- **NFR-SCALE-005:** Serverless architecture automatically scales to handle traffic spikes without manual intervention
- **NFR-SCALE-006:** System maintains $0/month cost basis during periods of zero usage (dormant mode)

---

### Accessibility

**WCAG 2.1 AA Compliance:**
- **NFR-A11Y-001:** All functionality operable via keyboard-only navigation (Tab, Enter, Escape, Arrow keys)
- **NFR-A11Y-002:** All images have appropriate alt text or are marked decorative
- **NFR-A11Y-003:** Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt+ or 14pt+ bold)
- **NFR-A11Y-004:** All interactive elements have visible focus indicators
- **NFR-A11Y-005:** Content readable up to 200% text zoom without horizontal scrolling
- **NFR-A11Y-006:** Form inputs include associated labels and error messages
- **NFR-A11Y-007:** Skip navigation links provided to bypass repetitive content
- **NFR-A11Y-008:** Semantic HTML elements used appropriately (`<nav>`, `<main>`, `<article>`, etc.)
- **NFR-A11Y-009:** ARIA attributes implemented correctly for custom interactive components
- **NFR-A11Y-010:** Content compatible with screen readers (NVDA, VoiceOver, TalkBack)

**Responsive Design:**
- **NFR-A11Y-011:** Touch target size ≥ 44x44 pixels for all interactive elements (WCAG AAA)
- **NFR-A11Y-012:** Content reflows properly for viewport widths from 320px to 2560px
- **NFR-A11Y-013:** Orientation (portrait/landscape) does not disable functionality

---

### Integration

**External API Integration:**
- **NFR-INT-001:** CalorieNinjas API integration implements retry logic for transient failures (max 3 retries with exponential backoff)
- **NFR-INT-002:** API response data cached immediately in SQLite before serving to users
- **NFR-INT-003:** System functions correctly when CalorieNinjas API is unavailable (serve cached data only)

**CDN Integration:**
- **NFR-INT-004:** Static assets (CSS, JS, images) served via CDN (Vercel Edge Network or Cloudflare CDN)
- **NFR-INT-005:** SQLite database file stored and served from object storage (Vercel Blob or Cloudflare R2)

**Deployment Integration:**
- **NFR-INT-006:** Git push to main branch triggers automated deployment (Vercel or Cloudflare Pages)
- **NFR-INT-007:** Deployment completes within 5 minutes from code push

---

### Reliability

**Availability:**
- **NFR-REL-001:** System uptime target 99.5% (approximately 3.65 hours downtime per month acceptable for portfolio project)
- **NFR-REL-002:** Automatic error monitoring and logging implemented (Vercel Analytics or Cloudflare Web Analytics)

**Data Integrity:**
- **NFR-REL-003:** SQLite database backed up daily to separate storage location
- **NFR-REL-004:** Zero data loss requirement for nutrition data (static data, no user transactions)

**Error Handling:**
- **NFR-REL-005:** User-facing error messages displayed when functionality unavailable
- **NFR-REL-006:** Graceful degradation implemented for non-critical features (e.g., share image generation fails → use static template)

# MotionSites / Design Rocket AI Website Builder System Prompt

- **Source:** `https://github.com/vikod3/design-rocket-motion/blob/main/supabase/functions/chat/index.ts`
- **Model Used by Platform:** `google/gemini-3-pro-preview`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VIDEO_URLS = [
  // Original videos
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/964cb3eddff1a67e3772aac9a7aceea2/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/257c7359efd4b4aaebcc03aa8fc78a36/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/6571025a2e02041c8b85dbd43210fa3a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/5b3f2b79ac00e4589f42a884450b1248/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/592747c6820f3774a1ce343ef4782769/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/e923e67d71fed3e0853ec57f0348451e/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/408ad52e3f15bc8f01ae69d194a8cf3a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/12a9780eeb1ea015801a5f55cf2e9d3d/manifest/video.m3u8",
  // New videos added
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/e1815b91f86074c66329cab8ce246fb0/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/7814b44924e645c082789565fbacc657/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/65ce2caee8687f1d74faaf3c7e8222a2/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/153d3f6888189d617d827c9b5cfdd9b3/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/a125ec7c2189919037f0968a8ec5d440/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/f589fa70f824278f817cf1ee2dd53445/manifest/video.m3u8",
];

const DESIGN_SYSTEM_PROMPT = `You are an expert web developer that generates complete, production-ready HTML websites. You create beautiful, modern websites following Apple's Human Interface Guidelines combined with a dark, sophisticated aesthetic.

## CRITICAL: FOLLOW USER INSTRUCTIONS EXACTLY

1. **READ THE USER'S REQUEST CAREFULLY** - If they ask for specific pages, sections, or functionality, BUILD EXACTLY WHAT THEY ASK FOR.
2. **If user asks to "add a page" or "create new page"** - Add a new page to the website with proper navigation.
3. **If user asks to "edit" or "change" something** - Modify only what they request, keep everything else.
4. **If user describes specific content** - Use their content, don't replace it with generic text.
5. **ALWAYS maintain context from previous messages** - Build upon existing work, don't start over.

## MULTI-PAGE WEBSITE STRUCTURE (REQUIRED FOR MULTI-PAGE SITES)

When creating multi-page websites, use this client-side routing pattern:

\`\`\`html
<!-- Page containers - each page is a section that can be shown/hidden -->
<main id="app">
  <section id="page-home" class="page active"><!-- Home content --></section>
  <section id="page-about" class="page"><!-- About content --></section>
  <section id="page-services" class="page"><!-- Services content --></section>
  <section id="page-contact" class="page"><!-- Contact content --></section>
</main>

<style>
  .page { display: none; }
  .page.active { display: block; }
</style>

<script>
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.querySelector('nav a[data-page="' + pageId + '"]')?.classList.add('active');
  window.scrollTo(0, 0);
}

// Handle navigation clicks
document.querySelectorAll('nav a[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});
</script>
\`\`\`

### Navigation Pattern:
\`\`\`html
<nav>
  <a href="#" data-page="home" class="active">Home</a>
  <a href="#" data-page="about">About</a>
  <a href="#" data-page="services">Services</a>
  <a href="#" data-page="contact">Contact</a>
</nav>
\`\`\`

## DESIGN CONSISTENCY RULES

You MUST maintain absolute consistency across the ENTIRE website:
- Use the EXACT SAME font stack everywhere
- Use the EXACT SAME color palette throughout
- Use the EXACT SAME spacing scale (8pt grid) for ALL elements
- Use the EXACT SAME border-radius values consistently
- Use the EXACT SAME transition/animation timing everywhere
- Use the EXACT SAME button styles, card styles, and component patterns

## HLS VIDEO BACKGROUNDS (USE EXTENSIVELY)

Include HLS video backgrounds in MULTIPLE sections throughout the site. Use these video URLs:
${VIDEO_URLS.map((url, i) => `- Video ${i + 1}: ${url}`).join('\n')}

### HLS Video Implementation
Include the HLS.js script: <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

For each video element:
<video id="video-[unique-id]" autoplay muted loop playsinline class="video-bg"></video>
<script>
(function() {
  var video = document.getElementById('video-[unique-id]');
  var videoSrc = '[HLS_URL_HERE]';
  if (Hls.isSupported()) {
    var hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
  }
})();
</script>

### Video Styling:
.video-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
.video-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)); z-index: 1; }
.video-section { position: relative; overflow: hidden; }
.video-content { position: relative; z-index: 2; }

## DESIGN LANGUAGE (APPLE HIG INSPIRED)

### Typography
- Font stack: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif
- Display/Hero titles: Light weight (300-400), 48px-80px, letter-spacing -0.02em
- Body text: Regular weight (400), 17px base, line-height 1.47

### Color Palette (Apple Dark Mode)
- Background: #000000 to #111111
- Elevated surfaces: #1a1a1a to #2a2a2a
- Primary text: #ffffff
- Secondary text: #a1a1a1
- Accent: #f97316 (warm orange)
- Borders: rgba(255,255,255,0.08)

### Visual Effects
- Backdrop blur: backdrop-filter: blur(20px) saturate(180%)
- Border radius: 16px (cards), 12px (buttons)
- Transitions: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)

## OUTPUT FORMAT
- Generate ONLY valid HTML - no markdown code blocks, no explanations
- Include all CSS in a <style> tag
- Include the HLS.js library and initialization scripts
- Use semantic HTML5
- Make it fully responsive
- Include hover states and smooth transitions
- For multi-page sites, include the routing script and all page sections`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");
    console.log("Using model: google/gemini-3-pro-preview (Latest Gemini 3.0)");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-preview",
        messages: [
          { role: "system", content: DESIGN_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

```

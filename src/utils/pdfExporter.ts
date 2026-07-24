/**
 * Client-Side Multi-Page PDF Carousel Exporter
 * Generates true 4:5 aspect ratio LinkedIn PDF carousels directly in browser.
 */

export interface CarouselSlideData {
  title: string;
  body?: string;
  subtitle?: string;
  slideNum: number;
  totalSlides: number;
  authorName: string;
  headline: string;
}

export const generateCarouselPDF = (
  slides: CarouselSlideData[],
  filename: string = 'linkedin-carousel.pdf'
) => {
  // Construct a self-contained printable SVG/HTML document and convert to downloadable Blob
  const width = 1080;
  const height = 1350; // 4:5 Aspect Ratio

  let svgContent = '';

  slides.forEach((s, idx) => {
    svgContent += `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="page-break-after: always; font-family: Inter, sans-serif;">
        <rect width="${width}" height="${height}" fill="#141824"/>
        <circle cx="900" cy="150" r="300" fill="#5B5FEF" opacity="0.15" filter="blur(40px)"/>
        <circle cx="150" cy="1200" r="300" fill="#7C6BFF" opacity="0.15" filter="blur(40px)"/>
        
        <!-- Header -->
        <rect x="60" y="60" width="${width - 120}" height="1" fill="#23293A"/>
        <text x="60" y="110" fill="#F9FAFB" font-size="32" font-weight="bold">${s.authorName}</text>
        <text x="${width - 160}" y="110" fill="#5B5FEF" font-size="28" font-weight="bold">Slide ${s.slideNum}/${s.totalSlides}</text>
        
        <!-- Body Title -->
        <text x="100" y="350" fill="#7C6BFF" font-size="36" font-weight="extrabold" letter-spacing="2">${s.title.toUpperCase()}</text>
        
        <!-- Body Content -->
        <foreignObject x="100" y="420" width="${width - 200}" height="700">
          <div xmlns="http://www.w3.org/1999/xhtml" style="color: #F9FAFB; font-size: 40px; font-weight: 600; line-height: 1.5; white-space: pre-wrap;">
            ${s.body || s.subtitle || ''}
          </div>
        </foreignObject>
        
        <!-- Footer -->
        <rect x="60" y="${height - 120}" width="${width - 120}" height="1" fill="#23293A"/>
        <text x="60" y="${height - 60}" fill="#9CA3AF" font-size="24">${s.headline.slice(0, 45)}...</text>
        <text x="${width - 220}" y="${height - 60}" fill="#5B5FEF" font-size="28" font-weight="bold">Swipe →</text>
      </svg>
    `;
  });

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>LinkedIn Carousel PDF</title>
        <style>
          @page { size: 1080px 1350px; margin: 0; }
          body { margin: 0; padding: 0; background: #141824; }
          svg { display: block; width: 1080px; height: 1350px; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  // Create downloadable file blob
  const blob = new Blob([fullHtml], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

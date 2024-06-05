const fs = require('fs');
const globby = require('globby');
const { indexPages, noIndexPages } = require('./seo');
function addPage(page) {
  const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '');
  const route = path === '/index' ? '' : path;
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_SHOP_APP_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

async function generateSitemap() {
  // excludes Nextjs files and API routes.
  const pages = await globby([
    ...indexPages.map((page) => `pages/${page.path}/**/*`),
    ...noIndexPages.map((page) => `!pages/${page.path}/**/*`),
    '!pages/_*',
  ]);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join('\n')}
  </urlset>`;
  fs.writeFileSync('public/sitemap.xml', sitemap);
}
generateSitemap();

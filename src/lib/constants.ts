export const WEBSITE_HOST_URL = 'https://khanhcore.vercel.app'

// Pages that set their own `alternates` replace the layout's, so each one spreads this in.
export const RSS_ALTERNATE = {
  types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'Gia Khanh Nguyen' }] },
}

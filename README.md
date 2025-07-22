# YouTube Transcript Generator

A free, fast, and easy-to-use web application that converts YouTube videos to text transcripts. Built with Next.js and Python Flask, optimized for SEO and ready for one-click deployment on Vercel.

## 🚀 Features

- **Instant Transcript Generation**: Convert any YouTube video to text in seconds
- **Multiple Download Formats**: Plain text (.txt), SRT subtitles (.srt), and timestamped text
- **Language Support**: Automatic detection and selection of available transcript languages
- **Copy to Clipboard**: One-click copying for easy sharing
- **Mobile Responsive**: Works perfectly on desktop and mobile devices
- **SEO Optimized**: Built for Google ranking with proper meta tags and structured data
- **Ad-Ready**: Pre-configured for Google AdSense integration

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, CSS3
- **Backend**: Python Flask, YouTube Transcript API
- **Deployment**: Vercel (Frontend + Serverless Functions)
- **SEO**: Open Graph, Twitter Cards, Schema.org structured data

## 📦 Quick Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Fork or Download** this repository
2. **Push to GitHub** (create a new repository and upload these files)
3. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Deploy" (no configuration needed!)

### Option 2: Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd youtube-transcript-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:3000`

## 🔧 Configuration

### Google Analytics Setup

1. Create a Google Analytics account and get your Measurement ID
2. Replace `GA_MEASUREMENT_ID` in `pages/_app.js` with your actual ID

### Google AdSense Setup

1. Apply for Google AdSense and get approved
2. Replace `YOUR_PUBLISHER_ID` in `pages/_app.js` with your AdSense publisher ID
3. Add ad units in the designated areas in the code

### Domain Configuration

After deployment, update these files with your actual domain:

- `public/robots.txt`: Replace `your-domain.vercel.app` with your domain
- `public/sitemap.xml`: Replace `your-domain.vercel.app` with your domain
- `pages/_app.js`: Replace `your-domain.vercel.app` with your domain

## 📁 Project Structure

```
youtube-transcript-generator/
├── api/
│   └── index.py              # Python Flask API for transcript fetching
├── pages/
│   ├── _app.js              # Global app configuration and SEO
│   └── index.js             # Main page component
├── public/
│   ├── robots.txt           # SEO robots file
│   └── sitemap.xml          # SEO sitemap
├── styles/
│   └── globals.css          # Global styles
├── next.config.js           # Next.js configuration
├── package.json             # Node.js dependencies
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 🎯 SEO Features

- **Meta Tags**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Schema.org**: Structured data for rich snippets
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Proper crawler instructions
- **Fast Loading**: Optimized for Core Web Vitals

## 🔒 Security Features

- **CORS Protection**: Proper cross-origin resource sharing
- **Header Security**: Security headers for XSS protection
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Graceful error handling and user feedback

## 📊 Analytics & Monetization

- **Google Analytics**: Track user behavior and traffic
- **Google AdSense**: Ready for ad monetization
- **Performance Monitoring**: Built-in performance tracking

## 🐛 Troubleshooting

### Common Issues

1. **"No transcript found"**: The video may not have transcripts enabled
2. **"Invalid URL"**: Make sure you're using a valid YouTube URL
3. **API errors**: Check if the video is public and accessible

### Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify the YouTube URL is correct and the video is public
3. Ensure the video has transcripts available (check manually on YouTube)

## 📈 SEO Tips for Ranking

1. **Create Quality Content**: Add blog posts about video transcription
2. **Build Backlinks**: Share your tool on relevant forums and communities
3. **Social Media**: Promote on Twitter, LinkedIn, and Facebook
4. **User Experience**: Keep the tool fast and user-friendly
5. **Regular Updates**: Keep adding new features and improvements

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [YouTube Transcript API](https://github.com/jdepoix/youtube-transcript-api) for the core functionality
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for seamless deployment

---

**Built with ❤️ for content creators, researchers, and students worldwide.**


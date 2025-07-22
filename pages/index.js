import { useState } from 'react';
import Head from 'next/head';

export default function HomePage() {
    // State variables to manage the UI and data
    const [videoUrl, setVideoUrl] = useState('');
    const [transcriptData, setTranscriptData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [downloadFormat, setDownloadFormat] = useState('txt');

    // Extracts YouTube video ID from various URL formats
    const getYouTubeVideoId = (url) => {
        let videoId = null;
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v');
            }
        } catch (e) {
            return null;
        }
        return videoId;
    };

    // Main function to fetch the transcript
    const handleFetchTranscript = async (e) => {
        e.preventDefault();
        setError('');
        setTranscriptData(null);
        setCopySuccess('');
        setSelectedLanguage('');

        const videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) {
            setError("Could not extract Video ID from the URL. Please enter a valid YouTube URL.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/transcript?video_id=${videoId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }
            
            setTranscriptData(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch transcript in a specific language
    const handleLanguageChange = async (languageCode) => {
        if (!transcriptData || !languageCode) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch(`/api/transcript/${languageCode}?video_id=${transcriptData.video_id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch transcript in selected language.');
            }
            
            setTranscriptData(prev => ({
                ...prev,
                transcript: data.transcript
            }));
            setSelectedLanguage(languageCode);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Formats the transcript text for copying or downloading
    const formatTranscriptText = (format = 'plain') => {
        if (!transcriptData) return '';
        
        if (format === 'srt') {
            return transcriptData.transcript.map((line, index) => {
                const startTime = formatTime(line.start);
                const endTime = formatTime(line.start + line.duration);
                return `${index + 1}\n${startTime} --> ${endTime}\n${line.text}\n`;
            }).join('\n');
        }
        
        if (format === 'timestamped') {
            return transcriptData.transcript.map(line => {
                const timestamp = formatTime(line.start);
                return `[${timestamp}] ${line.text}`;
            }).join('\n');
        }
        
        // Default plain text format
        return transcriptData.transcript.map(line => line.text).join(' ');
    };

    // Helper function to format time for SRT files
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const milliseconds = Math.floor((seconds % 1) * 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
    };

    // Handles the copy to clipboard action
    const handleCopy = () => {
        const textToCopy = formatTranscriptText('plain');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess('Copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 3000);
        }, () => {
            setError('Failed to copy text. Please try selecting and copying manually.');
        });
    };

    // Handles the download action with different formats
    const handleDownload = () => {
        let textToDownload = '';
        let filename = '';
        let mimeType = 'text/plain';

        switch (downloadFormat) {
            case 'srt':
                textToDownload = formatTranscriptText('srt');
                filename = `${transcriptData.video_id}_transcript.srt`;
                mimeType = 'application/x-subrip';
                break;
            case 'timestamped':
                textToDownload = formatTranscriptText('timestamped');
                filename = `${transcriptData.video_id}_transcript_timestamped.txt`;
                break;
            default:
                textToDownload = formatTranscriptText('plain');
                filename = `${transcriptData.video_id}_transcript.txt`;
        }

        const blob = new Blob([textToDownload], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container">
            <Head>
                <title>Free YouTube Transcript Generator - Convert Video to Text</title>
                <meta name="description" content="Free YouTube transcript generator. Convert any YouTube video to text instantly. Download transcripts as TXT or SRT files. Perfect for content creators, students, and researchers." />
                <meta name="keywords" content="youtube transcript, video to text, youtube subtitles, download youtube transcript, free transcript generator, video transcription" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="header">
                <h1>YouTube Transcript Generator</h1>
                <p className="subtitle">
                    Convert any YouTube video into text instantly. Free, fast, and easy to use.
                    Perfect for content creators, researchers, and students.
                </p>
            </header>

            <main>
                <form onSubmit={handleFetchTranscript} className="input-form">
                    <div className="input-group">
                        <input 
                            type="url" 
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Paste YouTube video URL here (e.g., https://www.youtube.com/watch?v=...)" 
                            required
                            aria-label="YouTube Video URL"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !videoUrl.trim()}>
                            {isLoading ? 'Fetching...' : 'Get Transcript'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {transcriptData && (
                    <div className="transcript-container">
                        <div className="controls">
                            <div className="controls-left">
                                <h3>Transcript Ready</h3>
                                <p className="video-info">Video ID: {transcriptData.video_id}</p>
                            </div>
                            
                            <div className="controls-right">
                                {transcriptData.available_languages && transcriptData.available_languages.length > 1 && (
                                    <div className="language-selector">
                                        <label htmlFor="language-select">Language:</label>
                                        <select 
                                            id="language-select"
                                            value={selectedLanguage}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            disabled={isLoading}
                                        >
                                            <option value="">Default</option>
                                            {transcriptData.available_languages.map((lang) => (
                                                <option key={lang.language_code} value={lang.language_code}>
                                                    {lang.language} {lang.is_generated ? '(Auto)' : '(Manual)'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                
                                <div className="download-controls">
                                    <label htmlFor="format-select">Format:</label>
                                    <select 
                                        id="format-select"
                                        value={downloadFormat}
                                        onChange={(e) => setDownloadFormat(e.target.value)}
                                    >
                                        <option value="txt">Plain Text (.txt)</option>
                                        <option value="srt">Subtitles (.srt)</option>
                                        <option value="timestamped">With Timestamps (.txt)</option>
                                    </select>
                                </div>
                                
                                <div className="button-group">
                                    <button onClick={handleCopy} className="copy-btn">
                                        📋 Copy Text
                                    </button>
                                    <button onClick={handleDownload} className="download-btn">
                                        💾 Download
                                    </button>
                                </div>
                            </div>
                        </div>

                        {copySuccess && <div className="copy-success">{copySuccess}</div>}
                        
                        <div className="transcript-text">
                            {transcriptData.transcript.map((line, index) => (
                                <span key={index} className="transcript-line">
                                    {line.text}{' '}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {!transcriptData && !isLoading && (
                    <div className="info-section">
                        <h2>How to Use</h2>
                        <ol>
                            <li>Copy any YouTube video URL</li>
                            <li>Paste it in the input field above</li>
                            <li>Click "Get Transcript" to generate the text</li>
                            <li>Choose your preferred language and format</li>
                            <li>Copy the text or download as a file</li>
                        </ol>
                        
                        <h3>Supported Formats</h3>
                        <ul>
                            <li><strong>Plain Text:</strong> Clean text without timestamps</li>
                            <li><strong>SRT Subtitles:</strong> Standard subtitle format with timing</li>
                            <li><strong>Timestamped Text:</strong> Text with readable timestamps</li>
                        </ul>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>
                    Built for content creators, researchers, and students. 
                    This tool respects YouTube's terms of service and only accesses publicly available transcripts.
                </p>
                <div className="ad-placeholder">
                    {/* Google AdSense unit will go here */}
                    <p>📢 Advertisement space - Add your Google AdSense code here</p>
                </div>
            </footer>
        </div>
    );
}


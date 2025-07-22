from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/transcript', methods=['GET'])
def get_transcript():
    """
    Main API endpoint to fetch a YouTube transcript.
    Takes a 'video_id' query parameter.
    """
    video_id = request.args.get('video_id')

    if not video_id:
        return jsonify({"error": "The 'video_id' query parameter is required."}), 400

    try:
        # Fetch the transcript using the library
        # Try to get English transcript first, then fallback to any available
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        
        # Try to find English transcript first
        try:
            transcript = transcript_list.find_transcript(['en', 'en-US', 'en-GB']).fetch()
        except NoTranscriptFound:
            # If no English transcript, get the first available one
            transcript = transcript_list[0].fetch()

        # Get available languages for user selection
        available_languages = []
        for t in transcript_list:
            available_languages.append({
                "language": t.language,
                "language_code": t.language_code,
                "is_generated": t.is_generated
            })

        return jsonify({
            "video_id": video_id,
            "transcript": transcript,
            "available_languages": available_languages
        })

    except TranscriptsDisabled:
        return jsonify({"error": "Transcripts are disabled for this video."}), 404
    except NoTranscriptFound:
        return jsonify({"error": "No transcript found for this video."}), 404
    except Exception as e:
        # Catch any other potential errors (e.g., invalid video ID)
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/transcript/<language_code>', methods=['GET'])
def get_transcript_by_language(language_code):
    """
    Get transcript in a specific language.
    Takes a 'video_id' query parameter and language_code in the URL.
    """
    video_id = request.args.get('video_id')

    if not video_id:
        return jsonify({"error": "The 'video_id' query parameter is required."}), 400

    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        transcript = transcript_list.find_transcript([language_code]).fetch()

        return jsonify({
            "video_id": video_id,
            "language_code": language_code,
            "transcript": transcript
        })

    except TranscriptsDisabled:
        return jsonify({"error": "Transcripts are disabled for this video."}), 404
    except NoTranscriptFound:
        return jsonify({"error": f"No transcript found in language '{language_code}' for this video."}), 404
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "ok", "message": "YouTube Transcript API is running"})

# For local development
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


export default interface IVideo {
  id: number;
  user_id: number;
  yt_link: string | null;
  status: string | null;
  title: string | null;
  length: number | null;
  views: number | null;
  thumbnail_url: string | null;
  description: string | null;
  keywords: string | null;
  rating: Float32List | null;
  author: string | null;
  channel_url: string | null;
  transcript: string | null;
  prompt_response: string | null;
  created_at: string;
}

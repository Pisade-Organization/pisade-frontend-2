import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { tutorId: string } }
) {
  try {
    const { tutorId } = await params;

    // Read the JSON file directly from the file system
    const filePath = path.join(process.cwd(), 'public', 'mockup_data', 'tutors.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const tutor = data.tutors.find((tutor: any) => tutor.id === tutorId);
    
    if (!tutor) {
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 });
    }

    // Use reviews from the JSON data if available, otherwise use empty array
    const reviews = tutor.reviews || [];
    const summary = {
      avgRating: tutor.avgRating,
      totalReviews: reviews.length
    };

    const tutorDetailData = {
      ...tutor,
      // Fix the video thumbnail URL if it's just "image"
      videoThumbnailUrl: tutor.videoThumbnailUrl === "image" 
        ? "https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA="
        : tutor.videoThumbnailUrl,
      reviews,
      summary
    };

    return NextResponse.json(tutorDetailData);
  } catch (error) {
    console.error('Error fetching tutor data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

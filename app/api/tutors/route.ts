import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    // Read the JSON file directly from the file system
    const filePath = path.join(process.cwd(), 'public', 'mockup_data', 'tutors.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const allTutors = data.tutors;
    const total = allTutors.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const tutors = allTutors.slice(startIndex, endIndex);
    const hasMore = endIndex < total;
    
    return NextResponse.json({
      tutors,
      total,
      page,
      limit,
      hasMore
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json({
      tutors: [],
      total: 0,
      page: 1,
      limit: 6,
      hasMore: false
    }, { status: 500 });
  }
}

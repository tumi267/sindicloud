import { NextResponse } from "next/server";
import firebase from '../../db/firebase/db';

export async function POST(request) {
    const requestData = await request.json();
    const response = await fetch(requestData.url);
    const blob = await response.blob();
    const nextResponse = new NextResponse(blob, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="blobData.txt"'
        }
    });

    return nextResponse;
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";


const authOptions = {
  providers: [], 
};

export async function PATCH(request) {
  try {
    
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized - Please login" }, 
        { status: 401 }
      );
    }

    
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { message: "Invalid request body" }, 
        { status: 400 }
      );
    }

    const { name, image } = body;

   
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters" }, 
        { status: 400 }
      );
    }

    
    const client = await clientPromise;
    const db = client.db("sunshop"); 
    const users = db.collection("users");

    //  update data
    const updateData = {
      name: name.trim(),
      updatedAt: new Date(),
    };

    if (image && image.trim()) {
      updateData.image = image.trim();
    }

    // Update user
    const result = await users.updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" }, 
        { status: 404 }
      );
    }

   
    return NextResponse.json(
      { 
        message: "Profile updated successfully", 
        success: true 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    
    return NextResponse.json(
      { 
        message: "Server error", 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}
"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/prisma";

/**
 * Get all appointments for the authenticated patient
 */
export async function getPatientAppointments() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        supabaseUserId: authUser.id,
        role: "PATIENT",
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("Patient not found");
    }

    const appointments = await db.appointment.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { appointments };
  } catch (error) {
    console.error("Failed to get patient appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}

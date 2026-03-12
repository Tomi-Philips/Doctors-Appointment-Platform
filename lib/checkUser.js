import { createClient } from "./supabase/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        supabaseUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            // Only get transactions from current month
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Supabase stores user metadata in user_metadata
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "User";
    const imageUrl = user.user_metadata?.avatar_url || "";

    const newUser = await db.user.create({
      data: {
        supabaseUserId: user.id,
        name,
        imageUrl,
        email: user.email,
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "FREE",
            amount: 0,
          },
        },
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

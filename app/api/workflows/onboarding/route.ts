import { sendEmail } from "@/lib/actions/mailer.actions";
import { prisma } from "@/lib/database/prisma";
import { serve } from "@upstash/workflow/nextjs";

type InitialData = {
  email: string;
  name: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  //send welcome email
  await context.run("new-signup", async () => {
    await sendEmail(
      { subject: "Welcome to booker", body: `Welcome ${name}` },
      email
    );
  });

  //sleep for 3 days
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  //enter loop check status and act then sleep
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(
          {
            subject: "Are you still there ?",
            body: `Hey ${name} , we miss you!`,
          },
          email
        );
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(
          {
            subject: "Welcome Back",
            body: `Hey ${name} , Welcome Back`,
          },
          email
        );
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return "non-active";

  const now = new Date();
  const time_diffrence = now.getTime() - user.lastActivity.getTime();

  if (
    time_diffrence <= THIRTY_DAYS_IN_MS &&
    time_diffrence > THREE_DAYS_IN_MS
  ) {
    return "non-active";
  } else {
    return "active";
  }
};

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./db.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: profile.id,
            },
          },
          include: { user: true },
        });

        if (existingAccount) {
          return done(null, existingAccount.user);
        }

        const newUser = await db.user.create({
          data: {
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            image: profile.photos?.[0]?.value,
            accounts: {
              create: {
                type: "oauth",
                provider: "google",
                providerAccountId: profile.id,
                access_token: accessToken,
                refresh_token: refreshToken,
              },
            },
          },
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

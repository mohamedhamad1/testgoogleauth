const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const GOOGLE_CLIENT_ID = ''
const GOOGLE_CLIENT_SECRET = ''
const User = require('./User')
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://testgoogleauth.onrender.com/auth/google/callback",
},
    async(accessToken, refreshToken, profile, done) => {
        console.log('accToken:',accessToken, 'profile:',profile,'refreshToken',refreshToken);
        try {
            const user = await User.findOne({googleId: profile.id})
            if(!user){
                const newUser = new User({
                    name: profile.displayName,
                    googleId: profile.id
                })
                await newUser.save()
                return done(null,newUser);
            }
            done(null,user);
        } catch (error) {
            console.log(error);
        }
    }
));
passport.serializeUser((user,done)=>{
    done(null, user._id)
})

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null, user)
})

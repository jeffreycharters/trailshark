import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REFRESH_TOKEN, EMAIL_SOURCE_ADDRESS } from '$env/static/private';

const oAuth2 = google.auth.OAuth2;
const oAuth2Client = new oAuth2(EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });


export const getTransporter = async () => {
    const accessToken = await (await oAuth2Client.getAccessToken()).token?.toString();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: EMAIL_SOURCE_ADDRESS,
            clientId: EMAIL_CLIENT_ID,
            clientSecret: EMAIL_CLIENT_SECRET,
            refreshToken: EMAIL_REFRESH_TOKEN,
            accessToken,
            expires: 1484314697598,
        },
    });
    return transporter;
}
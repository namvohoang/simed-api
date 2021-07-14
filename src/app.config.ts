export const jwtSecret: string = process.env.JWT_SECRET;
export const tokenExpired: any = process.env.TOKEN_EXPIRED || 3600;
export const refreshTokenExpired = process.env.REFRESH_TOKEN_EXPIRED || '365d';
export const serverUrl = process.env.SERVER_URL;
export const apiVersion = process.env.API_VERSION || 'v1';

// Third party configurations
export const sendGridApiKey = process.env.SENDGRID_API_KEY;
export const sendGridSender =
	process.env.SENDGRID_SENDER || 'hoangnam.hcmut@gmail.com';
export const sendGridSenderName = process.env.SENDGRID_SENDER_NAME || 'Simed';

const REST_API_KEY = "7548692288977811b3f5662db1d5d3ad";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
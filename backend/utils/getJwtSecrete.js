
import dotenv from 'dotenv';

dotenv.config();

// jose expects a Uint8Array secret for HS256 signing and verification.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default JWT_SECRET;

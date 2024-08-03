// import AppErrorCode from "../constants/appErrorCode";
// import { UNAUTHORIZED } from "../constants/http";
// import appAssert from "../utils/appAssert";
// import { RequestHandler } from "express";
// import { verifyToken } from "../utils/jwt";
// import mongoose from "mongoose";


// // Define the payload type
// interface TokenPayload {
//     userId: string;
//     sessionId: string;
// }

// const authenticate: RequestHandler = (req, res, next) => {
//     const accessToken = req.cookies.accessToken as string | undefined;

//     appAssert(
//         accessToken,
//         UNAUTHORIZED,
//         "Not authorized",
//         AppErrorCode.InvalidAccessToken
//     );

//     const { error, payload } = verifyToken(accessToken) as { error: string | null; payload: TokenPayload | null };

//     appAssert(
//         payload,
//         UNAUTHORIZED,
//         error === "jwt expired" ? "Token expired" : "Invalid token",
//         AppErrorCode.InvalidAccessToken
//     );

//     req.userId = new mongoose.Types.ObjectId(payload.userId);
//     req.sessionId = new mongoose.Types.ObjectId(payload.sessionId);
//     next();
// };

// export default authenticate;

import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";

// Define the payload type
interface TokenPayload {
    userId: string;
    sessionId: string;
}

const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(
        accessToken,
        UNAUTHORIZED,
        "Not authorized",
        AppErrorCode.InvalidAccessToken
    );

    const result = verifyToken(accessToken);

    if ('error' in result) {
        appAssert(
            false,
            UNAUTHORIZED,
            result.error === "jwt expired" ? "Token expired" : "Invalid token",
            AppErrorCode.InvalidAccessToken
        );
    }

    const payload = result.payload as TokenPayload;

    req.userId = new mongoose.Types.ObjectId(payload.userId);
    req.sessionId = new mongoose.Types.ObjectId(payload.sessionId);
    next();
};

export default authenticate;
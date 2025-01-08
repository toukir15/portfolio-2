"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// Parser
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', express_1.default.json(), routes_1.default);
// Testing route
app.get('/', (req, res, next) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Welcome to the Toukir Portfolio API',
    });
});
// Global error handler
app.use(globalErrorHandler_1.default);
// Handle unmatched routes (404)
// app.use('*', notFound)
exports.default = app;

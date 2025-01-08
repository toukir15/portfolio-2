import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'


const app: Application = express()

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);


app.options('*', cors())

app.use(cookieParser())

// Parser
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', express.json(), routes)

// Testing route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to the Toukir Portfolio API',
  })
})

// Global error handler
app.use(globalErrorHandler)

// Handle unmatched routes (404)
// app.use('*', notFound)

export default app

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; id: string; email: string };
    }
  }
}
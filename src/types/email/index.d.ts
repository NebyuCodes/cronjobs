export {};

declare global {
  namespace Email {
    interface ISendEmail {
      message: string;
      to: string;
      subject: string;
    }
  }
}

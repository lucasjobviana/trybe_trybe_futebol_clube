class AppResponseError extends Error {
  public statusCode:number;

  private error400 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case 'All fields must be filled':
        return 400;
      default:
    }
  };

  private error401 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case 'Invalid email or password':
      case 'Token not found':
      case 'Token must be a valid token':
        return 401;
      default:
    }
  };

  private error404 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case 'Bad Request':
        return 404;
      default:
    }
  };

  private error422 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case '"default" is not allowed':
        return 422;
      default:
    }
  };

  public mapMsgToStatusCode = (errorMessage = ''):number | undefined =>
    this.error400(errorMessage) || this.error422(errorMessage) || this.error401(errorMessage)
    || this.error404(errorMessage);

  constructor(message:string, defaultStatusCode = 333) {
    super(message);
    this.statusCode = this.mapMsgToStatusCode(message) || defaultStatusCode;
  }
}

export default AppResponseError;

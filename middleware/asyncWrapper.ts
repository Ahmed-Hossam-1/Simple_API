// ((reason: any) => PromiseLike<never>) | null | undefined

export = (asycFn: (arg0: any, arg1: any, arg2: any) => any) => {
  return (req: any, res: any, next: any) => {
    asycFn(req, res, next).catch((err: any) => {
      next(err);
    });
  };
};
